import { useEffect, useState } from "react";
import { useWallet } from "../services/providers/MintbaseWalletContext";
import { gql } from "apollo-boost";
import { useLazyQuery } from "@apollo/client";
import React from "react";
import Slider, { Settings } from "react-slick";
import Image from "next/image";
import MintNft from "../Modal/MintNft";
import { BsCircle } from "react-icons/bs";
import { AiOutlineExpandAlt } from "react-icons/ai";
// import { formatNearAmount } from "near-api-js/lib/utils/format";
// import dynamic from 'next/dynamic';

import styles from "../styles/MyOwn.module.scss";

const FETCH_TOKENS = gql`
    query FetchTokensByStoreId($ownerId: String!) {
        mb_views_nft_tokens(
            where: {owner: {_eq: $ownerId}}
            order_by: {metadata_id: asc}
            distinct_on: metadata_id
          ) {
            metadata_id
            title
            token_id
            media_hash
            media
            base_uri
            description
            animation_type: reference_blob(path: "$.animation_type")
            animation_hash :reference_blob(path: "$.animation_hash")
          }
    }
`;
const images = [
    "https://pbs.twimg.com/media/FbpyI7oUcAAJtWy?format=jpg&name=small",
    "https://pbs.twimg.com/media/Fbpz9sVXkAA6l2h?format=jpg&name=small",
    "https://pbs.twimg.com/media/FbpAEs8VEAAlXCB?format=jpg&name=small",
];

const resolveUrl = (media: string, media_hash: string ): string => {
    if(media) {
        return `${media.startsWith('https://')? media : `https://arweave.net/${media}`}`
    } 
    else {
        return `${media_hash?.startsWith('https://')? media_hash : `https://arweave.net/${media_hash}`}`
    }
}



/**
 * 
 * query MyQuery {
  mb_views_nft_tokens(where: {owner: {_eq: "codeslayer.testnet"}}) {
    metadata_id
    title
    token_id
    listings {
      price
    }
  }
}

 */

const NFT = ({
    toggle,
    tokenId,
    media,
    media_hash,
    title,
    animation_url,
    animation_type,
}: {
    toggle: any;
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

    return (
        <div className="w-full h-auto border border-purple-border rounded-2xl bg-purple-bg">
            <div className="p-4">
                {sellModal && <MintNft closeModal={() => showSellModal(false)} tokenId={tokenId} title={title} />}
                <div>
                    {animation_type === null ||
                    animation_type === "image/jpeg" ||
                    animation_type === "image/png" ||
                    animation_type === "image/gif" ? (
                        <div className="relative mx-auto rounded-lg overflow-hidden w-full aspect-square">
                            <Image
                                src={resolveUrl(media, media_hash)}
                                layout='fill'
                                objectFit="cover"
                                alt={title}
                            />
                            <div className="absolute bottom-2 z-10 right-2 text-primary" onClick={() => toggleFullScreen(resolveUrl(media, media_hash))}>
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
                        <div className="text-center font-bold text-lg">{title}</div>
                        <div className="w-full flex justify-center mt-6">
                            <button className="btnColor px-4 py-2 rounded-lg mx-center w-4/5" onClick={() => showSellModal(true)}>
                                Sell NFT
                            </button>
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

        setMetaData(tokensData.mb_views_nft_tokens);

        console.log(tokensData, "*-*-*--*-*-");
    }, [tokensData]);

    const toggle = (image: any) => {
        setFullScreen(true);
        setImage(image);
    };

    return (
        <div className={styles.container}>
            {fullScreen && (
                <div className="h-screen w-screen bg-gray-900 z-50 fixed left-0 top-0 ">
                    <div className="relative h-screen w-screen transition-opacity duration-200 cursor-pointer">
                        <Image src={image} layout="fill" objectFit="contain" />
                        <div className="absolute bottom-2 right-8 text-primary" onClick={() => setFullScreen(false)}>
                            <BsCircle className="relative h-8 w-8" />
                            <AiOutlineExpandAlt title="close screen" className="w-4 h-4 absolute -mt-6 ml-2" />
                        </div>
                    </div>
                </div>
            )}
            {loadingTokensData ? (
                <div className="flex justify-center items-center py-60">
                    <div className="h-5 w-5 bg-primary animate-pulse rounded-full"></div>
                </div>
            ) : (
                <>
                    <h1 className="drop-shadow-lg text-xl text-center font-semibold tracking-widest uppercase text-gray-500 title-font md:text-2xl px-6 py-8">
                        your tokens from this store
                    </h1>

                    <div className="pb-24 w-full mx-auto px-10">
                        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2  w-full pt-4 gap-y-5 gap-x-2">
                            {metaData.map((meta: MetaData) => (
                                <NFT
                                    key={meta.metadata_id}
                                    tokenId={meta.token_id}
                                    media={meta.media}
                                    media_hash={meta.media_hash}
                                    title={meta.title}
                                    animation_url={meta.animation_url}
                                    animation_type={meta.animation_type}
                                    toggle={toggle}
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
