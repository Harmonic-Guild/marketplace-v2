import React, { useEffect, useState } from "react";
import { useWallet } from "../../services/providers/MintbaseWalletContext";
import { TbExternalLink } from "react-icons/tb";
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
import { resolveUrl } from '../../helpers/resolveUrl';

import styles from "../../styles/Thing.module.scss";
import { metadataByMetadataId } from "@mintbase-js/data";
import { mbjs } from "@mintbase-js/sdk";

const thing_id = ({ thing_id }: { thing_id: string }) => {
    
    interface Thing {
        contract: {
            id: string;
            baseUri: string;
            created_at: string
        }
        title: string
        description: string
        media: string
        media_hash: string
        animationUrl?: string
        animation_hash: string


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


    const [listings, setListings] = useState<any>([]);
    const [metadata, setMetadata] = useState<any>([]);
    const [tokenCount, setTokenCount] = useState<number>(0);
    const { wallet, isConnected } = useWallet();
    const [hide, setHide] = useState<boolean>(false);
    const [enlarge, setEnlarge] = useState(false);


    

    useEffect( ()=> {
        const  myFetchMethod = async () => {
            const { data, error } = await metadataByMetadataId(thing_id);
            if(data?.metadata) setMetadata(data?.metadata)
            if(data?.tokenCount) setTokenCount(data?.tokenCount.aggregate.count!)
            if(data?.listings) setListings(data?.listings)
        }
        myFetchMethod()
    }, [])

    
    const toggleDescription = () => {
        setHide(!hide);
    };
    
        const tokenPriceNumber = Number(listings && listings[0]?.price) || 0;
        const stringPrice = (tokenPriceNumber!== null && !Number.isNaN(tokenPriceNumber) )? tokenPriceNumber.toLocaleString("fullwide", { useGrouping: false }) : '0'
        const price = formatNearAmount(stringPrice, 5);
        const tokenPrice = tokenPriceNumber.toLocaleString("fullwide", {
            useGrouping: false,
        });

        let currentBid;
        if (listings && !listings[0]?.offers) {
            currentBid = "0";
        } else {
            currentBid =listings && formatNearAmount(Number(listings[0]?.offers[0]?.offer_price).toLocaleString("fullwide", { useGrouping: false }), 5) || 0;
        }

        let args = {
            token_Id :listings && listings[0]?.token.id! + ":" + thing_id.split(":")[0],
            marketAddress :listings && listings[0]?.market_id,
            tokenPrice,
            contractId: listings && listings[0]?.token.nft_contract_id
        }

        console.log(listings, 'kokokkokokokokokokoko');
        
        // useEffect(()=> {
        //     if(!listings[0]) return;

        //     args = {
        //         token_Id :listings && listings[0]?.token.id! + ":" + thing_id.split(":")[0],
        //         marketAddress :listings && listings[0]?.market_id,
        //         tokenPrice
        //     }
        // })
        
    

    return (
        <>
            {metadata && //listings &&
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
                        {(metadata[0]?.animationUrl !== null && metadata[0]?.animationUrl !== undefined) ? (
                            <div className="w-full mx-auto flex align-middle">
                                <video controls className="w-5/6 mx-auto" poster={resolveUrl(metadata[0]?.media)} controlsList="nodownload" muted>
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
                                            <div className="bg-primary-color p-2 rounded-full cursor-pointer" onClick={() => setEnlarge(true)}>
                                                <CgArrowsExpandRight color="white" />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                    <div className="w-full">
                        <div className="text-4xl font-bold mb-5">{metadata[0]?.title}</div>
        
                        <div className="text-lg">
                            {metadata[0]?.contract?.created_at ? (
                                `_`
                            ) : (
                                <div className="flex gap-3">
                                    {`Minted On: ` + new Date(metadata[0]?.contract?.created_at!).toDateString()}{" "}
                                    <TbExternalLink color="#AA5F2A" className="w-6 h-6" />
                                </div>
                            )}
                        </div>
                        
                        <div className="">
                            <div className="mt-10 border-b md:border-b-0 border-primary-color pb-4">
                                <div className="border-b border-primary-color mb-3 pb-3">
                                    <span className="text-3xl font-bold">Description</span>
                                </div>
        
                                <p className={hide ? "" : "line-clamp-3"}>{metadata[0]?.description}</p>
                                <span id="span" onClick={toggleDescription} className="cursor-pointer text-blue-400 hover:underline">
                                    {" "}
                                    {!hide ? ".....see more" : "see less"}
                                </span>
                            </div>
                        </div>
        
                        <div className="flex flex-col-reverse lg:flex-col">
                            <div className="flex flex-col-reverse items-center lg:flex-row mt-8 lg:gap-5 lg:justify-between">
                                <div className="">
                                    <div className="flex items-center justify-between gap-3">
                                        <p className="text-2xl font-bold">Details</p>
                                        <span className="border-b px-12 lg:px-20 border-yellow-600 mx-2" />
                                        <div className="border-2 border-primary-color rounded-full p-2 px-3">
                                            <a
                                                href={`https://explorer.testnet.near.org/transactions/${metadata[0]?.title}`}
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                <Near className="w-4 h-4" fill="black" />
                                            </a>
                                        </div>
                                        <div className="border-2 border-primary-color rounded-full p-1 px-3">
                                            <a href={`https://viewblock.io/arweave/tx/${thing_id.split(":")[0]}`} target="_blank" rel="noreferrer">
                                                <div className="w-6 h-6">
                                                    <Image src={Arweave} className="" />
                                                </div>
                                            </a>
                                        </div>
                                    </div>
        
                                    <div className="bg-primary-color rounded-lg my-8 py-2">
                                        <p className="text-center text-white text-lg">
                                            {tokenCount} Tokens Minted
                                        </p>
                                    </div>
                                </div>
                            </div>
                            {listings && listings.length 
                            //&& (tokensData.listings[0].market_id === process.env.NEXT_PUBLIC_marketAddress) 
                            ? (
                                <div>
                                    {listings && listings[0]?.kind === 'simple' ? (
                                        <PurchaseNft args={args} tokensData={listings} thingId={thing_id} price={price!} isConnected={isConnected} />
                                        
                                    ) : (
                                        <MakeOffer
                                            args = {args}
                                            isConnected={isConnected}
                                            latestBid={listings[0]?.offers[0]?.offer_price}
                                            bidder={listings[0]?.offers[0]?.offered_by}
                                            owner={listings[0]?.token.ownerId}
                                        />
                                    )}
                                </div>
                            ): <div className="bg-primary-color text-white text-center w-fit rounded-lg p-3">Not Listed</div>}
                        </div>
                    </div>
                </div>
                {/* <SimilarNft /> */}
            </div>
            }
        </>
    );
};
export default thing_id;

export function getServerSideProps({ params }: any) {
    
    const thing_id = params.thing_id
    return {
        props: {
            thing_id,
        },
    };
}
