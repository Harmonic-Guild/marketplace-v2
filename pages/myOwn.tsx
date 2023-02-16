import { useEffect, useState } from "react";
import { useWallet } from "../services/providers/MintbaseWalletContext";
import { gql } from "apollo-boost";
import { useLazyQuery } from "@apollo/client";
import React from "react";
// import Slider, { Settings } from "react-slick";
import Image from "next/image";
import MintNft from "../Modal/MintNft";
import { BsCircle } from "react-icons/bs";
import { AiOutlineExpandAlt } from "react-icons/ai";
// import { formatNearAmount } from "near-api-js/lib/utils/format";
// import dynamic from 'next/dynamic';
import { FETCH_TOKENS, FETCH_LISTING } from "../queries/myown";

import styles from "../styles/MyOwn.module.scss";
import { resolveUrl } from "../helpers/resolveUrl";

const NFT = ({
    thing_id,
    metadata_id,
    toggle,
    tokenId,
    media,
    media_hash,
    title,
    animation_url,
    animation_type,
}: {
    thing_id: string;
    toggle: any;
    metadata_id: string;
    tokenId: string;
    media: string;
    title: string;
    media_hash: string;
    animation_url: string;
    animation_type: string;
}) => {
    const [sellModal, showSellModal] = useState(false);

    const toggleFullScreen = (media: any) => {
        toggle(media);
    };

    const [metaData, setMetaData] = useState<any>([])

    const [getTokens, { loading: loadingTokensData, data: tokensData }] = useLazyQuery(FETCH_LISTING, {
        variables: {
            metaId: "",
        },
    });

    useEffect(() => {
        if(!metadata_id) return
        
        getTokens({
            variables: {
                metaId: metadata_id
            },
        });
    }, [metadata_id]);

    useEffect(() => {
        if (!tokensData) return;

        setMetaData(tokensData.mb_views_active_listings);
        
    }, [tokensData]);

    return (
        <div className="w-full h-auto border border-primary-color rounded-2xl bg-card bg-opacity-10">
            <div className="p-4">
                {sellModal && <MintNft closeModal={() => showSellModal(false)} thingId={thing_id} tokenId={tokenId} title={title} />}
                <div>
                    {animation_type === null ||
                    animation_type === "image/jpeg" ||
                    animation_type === "image/png" ||
                    animation_type === "image/gif" ? (
                        <div className="relative mx-auto rounded-lg overflow-hidden w-full aspect-square z-0">
                            <Image
                                src={resolveUrl(media, media_hash)}
                                layout='fill'
                                objectFit="cover"
                                alt={title}
                            />
                            <div className="absolute bottom-2 right-2 text-primary-color" onClick={() => toggleFullScreen(resolveUrl(media, media_hash))}>
                                <BsCircle className="relative h-8 w-8" />
                                <AiOutlineExpandAlt title="full screen" className="w-4 h-4 absolute -mt-6 ml-2" />
                            </div>
                        </div>
                    ) : (
                        <div className="w-full aspect-square rounded-lg overflow-hidden mx-auto flex items-center">
                            <video poster={resolveUrl(media, media_hash)} controls controlsList="nodownload" loop muted>
                                <source src={animation_url}></source>
                            </video>
                        </div>
                    )}

                    <div className="px-30 py-2">
                        <div className="text-center font-bold text-lg font-text">{title}</div>
                        <div className="w-full flex justify-center mt-6">
                        {metaData.length? (
                            <>
                                {metaData.price}
                                <button className="border hover:text-primary-color hover:bg-secondary-color rounded-xl outline-none bg-card border-secondary-color py-2 font-medium px-4 w-2/3 text-gray-800 font-header">Unlist (coming&nbsp;soon)</button> 
                            </> 
                        ): (
                            <button className="border hover:text-primary-color hover:bg-secondary-color rounded-xl outline-none bg-card border-secondary-color py-2 font-medium px-4 w-2/3 text-gray-800 font-header" onClick={()=> showSellModal(true)}>List on sale</button>  
                        )} 
                        </div>
                        {/* {lists.length && <div className="text-center mt-2 text-gray-600">Currently on sale at {formatNearAmount(Number(lists[0]?.price).toLocaleString('fullwide', { useGrouping: false }),5)} Near</div>} */}
                    </div>
                </div>
            </div>
        </div>
    );
};

type MetaData = {
    metadata_id: string;
    token_id: string;
    media: string;
    media_hash: string;
    animation_url: string;
    title: string;
    nft_contract_id: string;
    animation_type: string;
    base_uri: string;
    description: string;
};



interface List {
    autotransfer: boolean;
    offer: {
        price: number;
    };
    price: number;
}

const MyOwn = () => {
    const { wallet } = useWallet();
    const [metaData, setMetaData] = useState<any>([]);
    const [fullScreen, setFullScreen] = useState(false);
    const [image, setImage] = useState<any>(null);

    const [getTokens, { loading: loadingTokensData, data: tokensData }] = useLazyQuery(FETCH_TOKENS, {
        variables: {
            ownerId: "",
        },
    });

    useEffect(() => {
        getTokens({
            variables: {
                ownerId: wallet?.activeAccount?.accountId!,
            },
        });
    }, [wallet?.activeAccount?.accountId]);

    useEffect(() => {
        if (!tokensData) return;

        setMetaData(tokensData.mb_views_nft_owned_tokens);

    }, [tokensData]);

    const toggle = (image: any) => {
        setFullScreen(true);
        setImage(image);
    };

    return (
        <div className={styles.container}>
            {fullScreen && (
                <div className="h-screen w-screen bg-gray-900 fixed left-0 top-0 z-50">
                    <div className="relative h-screen w-screen transition-opacity duration-200 cursor-pointer">
                        <Image src={image} layout="fill" objectFit="contain" />
                        <div className="absolute bottom-2 right-8 text-primary-color" onClick={() => setFullScreen(false)}>
                            <BsCircle className="relative h-8 w-8" />
                            <AiOutlineExpandAlt title="close screen" className="w-4 h-4 absolute -mt-6 ml-2" />
                        </div>
                    </div>
                </div>
            )}
            {loadingTokensData ? (
                <div className="flex justify-center items-center py-60">
                    <div className="h-5 w-5 bg-primary-color animate-pulse rounded-full"></div>
                </div>
            ) : (
                <>
                    <h1 className="drop-shadow-lg text-xl text-center font-semibold tracking-widest uppercase text-gray-500 title-font md:text-2xl px-6 py-8 font-header">
                        your tokens from this store
                    </h1>

                    <div className="pb-24 w-full mx-auto px-10">
                        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2  w-full pt-4 gap-y-5 gap-x-2">
                            {metaData.map((meta: MetaData) => (
                                <NFT
                                    key={meta.metadata_id}
                                    thing_id={meta.metadata_id}
                                    toggle={toggle}
                                    tokenId={meta.token_id}
                                    media={meta.media}
                                    media_hash={meta.media_hash}
                                    title={meta.title}
                                    animation_url={meta.animation_url}
                                    animation_type={meta.animation_type}
                                    metadata_id={meta.metadata_id}
                                />
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default MyOwn;
