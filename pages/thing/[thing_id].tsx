import React, { useState } from "react";
import { BsChevronLeft } from "react-icons/bs";
import { CgArrowsExpandRight } from "react-icons/cg";
import Image from "next/image";
import { formatNearAmount, parseNearAmount } from "near-api-js/lib/utils/format";
import MakeOffer from "../../Modal/MakeOffer";
import PurchaseNft from "../../Modal/PurchaseNft";
import Near from "../../icons/near.svg";
import Link from "next/link";
import Arweave from "../../public/images/ARWEAVE.png";

import { GiCancel } from "react-icons/gi";
import { resolveUrl } from "../../helpers/resolveUrl";

import styles from "../../styles/Thing.module.scss";
import { metadataByMetadataId } from "@mintbase-js/data";
import { MetadataByMetadataIdQueryResult } from "@mintbase-js/data/lib/api/metadataByMetadataId/metadataByMetadataId.types";
import { useWallet } from "@mintbase-js/react";
import { MAX_GAS, execute } from "@mintbase-js/sdk";

const thing_id = ({ thing_id, data, bidInfo }: { thing_id: string; data: MetadataByMetadataIdQueryResult | null | undefined; bidInfo: any }) => {
    interface Thing {
        contract: {
            id: string;
            baseUri: string;
            created_at: string;
        };
        title: string;
        description: string;
        media: string;
        media_hash: string;
        animationUrl?: string;
        animation_hash: string;
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

    const { isConnected, selector} = useWallet();
    const [hide, setHide] = useState<boolean>(false);
    const [enlarge, setEnlarge] = useState(false);

    const metadata = data?.metadata!;
    const tokenCount = data?.tokenCount.aggregate.count!;
    const listings: any = data?.listings!;
    

    const toggleDiscription = () => {
        setHide(!hide);
    };

    

    const buy = async (bid: number) => {

        const wallet = await selector.wallet();

        return await execute({ wallet }, {
            contractAddress: listings[0].market_id,
            methodName: "make_offer",
            args: {
                token_key: [listings[0]?.token?.token_id! + ":" + thing_id.split(":")[0]], 
                price: [parseNearAmount(String(bid))],
                timeout: [
                    {
                        Hours: 24
                    }
                ]

            },
            gas: MAX_GAS,
            deposit: parseNearAmount(String(bid))
        } );

    };
    const tokenPriceNumber = Number(listings && listings[0]?.price) || 0;
    const stringPrice =
        tokenPriceNumber !== null && !Number.isNaN(tokenPriceNumber) ? tokenPriceNumber.toLocaleString("fullwide", { useGrouping: false }) : "0";
    const price = formatNearAmount(stringPrice, 5);
    const tokenPrice = tokenPriceNumber.toLocaleString("fullwide", {
        useGrouping: false,
    });

    // let currentBid;
    // if (listings && !listings[0]?.offers) {
    //     currentBid = "0";
    // } else {
    //     currentBid =
    //         (listings && formatNearAmount(Number(listings[0]?.offers[0]?.offer_price).toLocaleString("fullwide", { useGrouping: false }), 5)) || 0;
    // }
    return (
        <>
            {metadata && (
                <div className={`container ${styles.container}`}>
                    {enlarge && (
                        <div className={styles.enlarged}>
                            <div className={styles["cancel-cont"]} onClick={() => setEnlarge(false)}>
                                <GiCancel color="white" size={30} />
                            </div>
                            {metadata && (
                                <div className={styles["image-cont"]}>
                                    <Image src={metadata[0].media} layout="fill" objectFit="cover" />
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
                            {metadata[0]?.animationUrl !== null && metadata[0]?.animationUrl !== undefined ? (
                                <div className="w-full h-full mx-auto relative">
                                    <video controls className="w-full" poster={resolveUrl(metadata[0]?.media)} controlsList="nodownload" muted>
                                        <source src={resolveUrl(metadata[0]?.animationUrl)}></source>
                                    </video>
                                    <br />
                                </div>
                            ) : (
                                <div className=" w-full xl:w-4/5 mx-auto">
                                    {metadata[0]?.media && (
                                        <div className="">
                                            <Image
                                                src={resolveUrl(metadata[0].media)}
                                                objectFit="cover"
                                                className="w-4/5 lg:w-2/5 rounded-lg shadow-xl"
                                                width={600}
                                                height={600}
                                                // layout="fill"
                                                alt={"alt"}
                                            />
                                            <div className="flex gap-5 justify-end py-4">
                                                <div className="bg-secondary-color p-2 rounded-full cursor-pointer" onClick={() => setEnlarge(true)}>
                                                    <CgArrowsExpandRight color="white" />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                        <div className="w-full">
                        <div className="w-full text-font-color">
                            <div className="text-4xl font-bold mb-5 text-font-color">{metadata[0]?.title}</div>
                        </div>

                        <div className="text-font-color">
                            <div className="mt-10 border-b md:border-b-0 border-primary-color pb-4">
                                <div className="border-b border-primary-color mb-3 pb-3">
                                    <span className="text-3xl font-bold text">Description</span>
                                </div>

                                <p className={hide ? "" : "line-clamp-3"}>{metadata[0]?.description}</p>
                                <span id="span" onClick={toggleDiscription} className="cursor-pointer text-blue-400 hover:underline">
                                    {" "}
                                    {!hide ? ".....see more" : "see less"}
                                </span>
                            </div>
                        </div>

                        <div className="flex flex-col-reverse lg:flex-col text-font-color">
                            <div className="flex flex-col-reverse items-center lg:flex-row mt-8 lg:gap-5 lg:justify-between">
                                <div className="">
                                    <div className="flex items-center justify-between gap-3">
                                        <p className="text-2xl font-bold">Details</p>
                                        <span className="border-b px-12 lg:px-20 border-yellow-600 mx-2" />
                                        <div className="border-2 border-secondary-color rounded-full p-2 px-3">
                                            <a
                                                href={`https://explorer.testnet.near.org/transactions/${metadata[0]?.title}`}
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                <Near className="w-4 h-4" fill="black" />
                                            </a>
                                        </div>
                                        <div className="border-2 border-secondary-color rounded-full p-1 px-3">
                                            <a href={`https://viewblock.io/arweave/tx/${thing_id.split(":")[0]}`} target="_blank" rel="noreferrer">
                                                <div className="w-6 h-6">
                                                    <Image src={Arweave} className="" />
                                                </div>
                                            </a>
                                        </div>
                                    </div>

                                    <div className="bg-primary-color rounded-lg my-8 py-2">
                                        <p className="text-center text-font-color text-lg">{tokenCount} Tokens Minted</p>
                                    </div>
                                </div>
                            </div>
                            {listings && listings.length ? (
                                    //&& (tokensData.listings[0].market_id === process.env.NEXT_PUBLIC_marketAddress)
                                    <div>
                                        {listings && listings[0]?.kind === "simple" ? (
                                            <PurchaseNft
                                                listings={listings}
                                                tokensData={listings}
                                                thingId={thing_id}
                                                price={price!}
                                                isConnected={isConnected}
                                            />
                                        ) : (
                                            <MakeOffer
                                                buy={buy}
                                                isConnected={isConnected}
                                                latestBid={bidInfo.offers ? bidInfo?.offers[0]?.offer_price : 0}
                                                bidder={bidInfo.offers ? bidInfo?.offers[0]?.offered_by : "No bids yet"}
                                                owner={bidInfo.listed_by}
                                            />
                                        )}
                                    </div>
                                ) : (
                                    <div className="bg-primary-color text-white text-center w-fit rounded-lg p-3">Not Listed</div>
                                )}
                            </div>
                        </div>
                    </div>
                    {/* <SimilarNft /> */}
                </div>
            )}
        </>
    );
};
export default thing_id;

export async function getServerSideProps({ params }: any) {
    const thing_id = params.thing_id;
    let thingData: MetadataByMetadataIdQueryResult | null | undefined = undefined;
    let bidInfo;

    try {
        const { data, error } = await metadataByMetadataId(thing_id);
        thingData = data;
    } catch (error) {
        console.log(error);
    }

     const res = await fetch(`https://graph.mintbase.xyz/${process.env.NEXT_PUBLIC_NETWORK}`, {
        method: "POST",
        headers: {
          "mb-api-key": "omni-site",
          "content-type": "application/json",
          "x-hasura-role": "anonymous"
        },
        body: JSON.stringify({
          query: `query MyQuery {
            mb_views_active_listings(
              where: {metadata_id: {_eq: "${thing_id}"}}
            ) {
              offers(order_by: {offered_at: desc}) {
                offer_price
                offered_by
              }
              listed_by
            }
          }`
        })
      })
      
      bidInfo = await res.json()

    return {
        props: {
            thing_id,
            data: thingData,
            bidInfo: bidInfo.data.mb_views_active_listings[0]
        },
    };
}
