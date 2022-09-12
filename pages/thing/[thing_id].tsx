import React, { useEffect, useState } from "react";
import { useWallet } from "../../services/providers/MintbaseWalletContext";
import { TbExternalLink } from "react-icons/tb";
import { FiLayers } from "react-icons/fi";
import { BsChevronLeft, BsHeart, BsArrowsAngleExpand } from "react-icons/bs";
import { CgArrowsExpandRight } from "react-icons/cg";
import { BiShareAlt } from "react-icons/bi";
import { AiOutlineCloseCircle, AiOutlineExpandAlt } from "react-icons/ai";
// import SimilarNft from "../../components/SimilarNft";
import Vector_back from "../../icons/Vector_back.svg";
import { gql } from "apollo-boost";
import { useLazyQuery } from "@apollo/client";
import Image from "next/image";
import { formatNearAmount, parseNearAmount } from "near-api-js/lib/utils/format";
import MakeOffer from "../../Modal/MakeOffer";
import PurchaseNft from "../../Modal/PurchaseNft";
import Near from "../../icons/near.svg";
import Link from "next/link";
import Arweave from "../../public/images/ARWEAVE.png";

import styles from "../../styles/Thing.module.scss";
import { GiCancel } from "react-icons/gi";

const FETCH_TOKENS = gql`
    query MyQuery($thing_id: String!) {
        thing(where: { id: { _eq: $thing_id } }) {
            id
            tokens(distinct_on: id, where: { list: { removedAt: { _is_null: true } } }) {
                id
                lists(order_by: { createdAt: desc }, limit: 1) {
                    price
                    autotransfer
                    offer {
                        price
                        from
                    }
                    createdAt
                    tokenKey
                    ownerId
                }
                txId
                minter
            }
            allTokens: tokens(distinct_on: id) {
                id
                # txId
                # minter
            }
            storeId
            store {
                name
                owner
            }
            metadata {
                animation_type
                animation_url
                media
                title
                description
                external_url
                category
                tags
                youtube_url
            }
        }
    }
`;

const thing_id = ({ thing_id }: { thing_id: string }) => {
    interface Thing {
        id: string;
        tokens: [Tokens?];
        allTokens: [id: string];
        storeId: string;
        store: {
            name: string;
            owner: string;
        };
        metadata: MetaData;
    }

    interface Tokens {
        id: string;
        lists: [List?];
        createdAt: string | number;
        tokenKey: string | number;
        ownerId: string;
        txId: string;
        minter: string;
    }

    interface List {
        price: number;
        autotransfer: boolean;
        offer: {
            price: number;
            from: string;
        };
        createdAt: string | number;
    }
    interface MetaData {
        animation_type: string;
        animation_url: string;
        media: string;
        title: string;
        description: string;
        external_url: string;
        category: string;
        tags: any;
        youtube_url: string;
    }

    const [things, setThing] = useState<Thing | null>(null);
    const [tokens, setTokens] = useState<[Tokens?]>([]);
    const [allTokens, setAllTokens] = useState<[id?: string]>([]);
    const { wallet, isConnected } = useWallet();
    const [hide, setHide] = useState<boolean>(false);
    const [enlarge, setEnlarge] = useState(false);

    const [getTokens, { loading: loadingTokensData, data: tokensData, fetchMore }] = useLazyQuery(FETCH_TOKENS, {
        variables: {
            thing_id: "",
        },
    });

    useEffect(() => {
        getTokens({
            variables: {
                thing_id,
            },
        });
    }, []);

    useEffect(() => {
        if (!tokensData) return;
        setThing(tokensData.thing[0]);

        const tokens = tokensData.thing[0].tokens.map((token: Tokens) => {
            return token;
        });
        const allTokens = tokensData.thing[0].allTokens.map((token: any) => {
            return token;
        });
        setTokens(tokens);
        setAllTokens(allTokens);
    }, [tokensData]);

    const toggleDiscription = () => {
        setHide(!hide);
    };

    const buy = (bid: number) => {
        const token_Id = things?.tokens[0]?.id!;

        if (things?.tokens[0]?.lists[0]?.autotransfer) {
            wallet?.makeOffer(token_Id, tokenPrice);
        } else {
            wallet?.makeOffer(token_Id, parseNearAmount(bid.toString())!.toString());
        }
    };
    // console.log(wallet);

    const tokenPriceNumber = Number(things?.tokens[0]?.lists[0]?.price);
    const price = things?.tokens[0]?.lists[0] && formatNearAmount(tokenPriceNumber.toLocaleString("fullwide", { useGrouping: false }), 2);
    const tokenPrice = tokenPriceNumber.toLocaleString("fullwide", {
        useGrouping: false,
    });

    let currentBid;
    if (things?.tokens[0]?.lists[0]?.offer == null) {
        currentBid = "0";
    } else {
        currentBid = formatNearAmount(Number(things?.tokens[0]?.lists[0]?.offer?.price).toLocaleString("fullwide", { useGrouping: false }), 5);
    }

    return (
        <div className={`container ${styles.container}`}>
            {enlarge && (
                <div className={styles.enlarged}>
                    <div className={styles["cancel-cont"]} onClick={() => setEnlarge(false)}>
                        <GiCancel color="white" size={30} />
                    </div>
                    {things && (
                        <div className={styles["image-cont"]}>
                            <Image src={things.metadata.media} layout="fill" objectFit="cover" />
                        </div>
                    )}
                </div>
            )}
            <Link href="/explore" passHref>
                <a className="hidden lg:inline-block cursor-pointer bg-black text-white rounded-full p-2 my-4">
                    <BsChevronLeft />
                </a>
            </Link>
            <div className="lg:flex gap-4 justify-between w-4/5 lg:w-full mx-auto">
                <div className="mx-auto w-full">
                    {things?.metadata.animation_type !== null &&
                    things?.metadata.animation_type !== "image/jpeg" &&
                    things?.metadata.animation_type !== "image/png" &&
                    things?.metadata.animation_type !== "image/gif" ? (
                        <div className="w-full mx-auto flex align-middle">
                            <video controls className="" poster={things?.metadata.media} controlsList="nodownload" muted>
                                <source src={things?.metadata.animation_url}></source>
                            </video>
                            <br />
                        </div>
                    ) : (
                        <div className=" w-full xl:w-4/5 mx-auto">
                            {things?.metadata.media && (
                                <div className="">
                                    <Image
                                        src={things?.metadata.media}
                                        objectFit="cover"
                                        className="w-4/5 lg:w-2/5 rounded-lg shadow-xl"
                                        width={600}
                                        height={600}
                                        // layout="fill"
                                        alt={"alt"}
                                    />
                                    <div className="flex gap-5 justify-end py-4">
                                        <div className="bg-primary p-2 rounded-full cursor-pointer" onClick={() => setEnlarge(true)}>
                                            <CgArrowsExpandRight color="white" />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
                <div className="w-full">
                    <div className="text-4xl font-bold mb-5">{things?.metadata.title}</div>

                    <div className="text-lg">
                        {things?.tokens[0]?.lists[0]?.createdAt! === undefined ? (
                            `Mint date is not available`
                        ) : (
                            <div className="flex gap-3">
                                {`Minted On: ` + new Date(things?.tokens[0]?.lists[0]?.createdAt!).toDateString()}{" "}
                                <TbExternalLink color="#AA5F2A" className="w-6 h-6" />
                            </div>
                        )}
                    </div>
                    {/* <div className="timer pb-4">ongoing : 16:32:24 hrs</div> */}
                    <div className="">
                        <div className="mt-10 border-b md:border-b-0 border-primary pb-4">
                            <div className="border-b border-primary mb-3 pb-3">
                                <span className="text-3xl font-bold">Description</span>
                            </div>

                            <p className={hide ? "" : "line-clamp-3"}>{things?.metadata.description}</p>
                            <span id="span" onClick={toggleDiscription} className="cursor-pointer text-blue-400 hover:underline">
                                {" "}
                                {!hide ? ".....see more" : "see less"}
                            </span>
                            {/* <span className="border-b border-yellow-600 py-2 w-full px-44"></span> */}
                        </div>
                    </div>

                    <div className="flex flex-col-reverse lg:flex-col">
                        <div className="flex flex-col-reverse items-center lg:flex-row mt-8 lg:gap-5 lg:justify-between">
                            {/* <div className={styles["history-cont"]}>
                                <p className={styles.header}>
                                    <p>History of NFT</p>
                                    <TbExternalLink color="#342AAA" className="w-6 h-6" />
                                </p>
                                <div className={styles["inner-cont"]}>
                                    {[1, 1, 1].map((item, i: number) => (
                                        <div key={i}>
                                            <div className={styles["info-cont"]}>
                                                <p className="font-semibold">Owned by:</p>
                                                <div className={styles["image-cont"]}>
                                                    <Image
                                                        src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                        layout="fill"
                                                        objectFit="cover"
                                                    />
                                                </div>
                                                <p>@Latest bidder</p>
                                            </div>
                                            {i < 2 && (
                                                <div className={styles["col-name"]}>
                                                    <p>Address.......</p>
                                                    <p>Date</p>
                                                    <p>Time</p>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div> */}
                            <div className="">
                                <div className="flex items-center justify-between gap-3">
                                    <p className="text-2xl font-bold">Details</p>
                                    <span className="border-b px-12 lg:px-20 border-yellow-600 mx-2" />
                                    <div className="border-2 border-primary rounded-full p-2 px-3">
                                        <a
                                            href={`https://explorer.testnet.near.org/transactions/${things?.tokens[0]?.txId}`}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            <Near className="w-4 h-4" fill="black" />
                                        </a>
                                    </div>
                                    <div className="border-2 border-primary rounded-full p-1 px-3">
                                        <a href={`https://viewblock.io/arweave/tx/${thing_id.split(":")[0]}`} target="_blank" rel="noreferrer">
                                            <div className="w-6 h-6">
                                                <Image src={Arweave} className="" />
                                            </div>
                                        </a>
                                    </div>
                                </div>

                                <div className="bg-primary rounded-lg my-8 py-2">
                                    <p className="text-center text-white text-lg">
                                        {tokens.length}/{allTokens.length} Tokens available
                                    </p>
                                </div>

                                {/* <div className="flex flex-col lg:flex-row justify-center items-center gap-4 lg:gap-10 mt-4">
                                    <div className="border-b border-primary lg:border-0 w-full lg:w-1/4 pb-2 lg:pb-0">
                                        <p className="text-2xl font-bold">Perks</p>
                                    </div>
                                    <span className="text-lg w-4/5 lg:w-3/4">
                                        <li>First Perk</li>
                                        <li>Second Perk</li>
                                        <li>Exclusive access to comunity</li>
                                    </span>
                                </div> */}
                            </div>
                        </div>

                        {things && (
                            <div>
                                {things.tokens[0]?.lists[0]?.autotransfer ? (
                                    <PurchaseNft buy={buy} price={price!} isConnected={isConnected} />
                                ) : (
                                    <MakeOffer
                                        buy={buy}
                                        isConnected={isConnected}
                                        latestBid={tokens[0]?.lists[0]?.offer?.price}
                                        bidder={tokens[0]?.lists[0]?.offer?.from}
                                        owner={tokens[0]?.ownerId}
                                    />
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {/* <SimilarNft /> */}
        </div>
    );
};
export default thing_id;

export function getServerSideProps({ query }: any) {
    const thing_id = query.thing_id;
    return {
        props: {
            thing_id,
        },
    };
}
