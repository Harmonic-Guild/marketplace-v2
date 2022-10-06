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
import { formatNearAmount } from "near-api-js/lib/utils/format";
// import dynamic from 'next/dynamic';

import styles from "../styles/MyOwn.module.scss";

const FETCH_TOKENS = gql`
    query FetchTokensByStoreId($ownerId: String!, $storeId: String!, $limit: Int, $offset: Int) {
        metadata(
            order_by: { thing_id: asc }
            where: { thing: { tokens: { ownerId: { _eq: $ownerId } }, storeId: { _eq: $storeId } } }
            limit: $limit
            offset: $offset
            distinct_on: thing_id
        ) {
            id
            media
            animation_url
            title
            thing_id
            animation_type
            thing {
                id
                metaId
                memo
                tokens(where: { burnedAt: { _is_null: true }, ownerId: { _eq: $ownerId } }) {
                    id
                    ownerId
                    lists(order_by: { createdAt: desc }) {
                        autotransfer
                        offer {
                            price
                        }
                        price
                    }
                }
            }
        }
    }
`;
const images = [
    "https://pbs.twimg.com/media/FbpyI7oUcAAJtWy?format=jpg&name=small",
    "https://pbs.twimg.com/media/Fbpz9sVXkAA6l2h?format=jpg&name=small",
    "https://pbs.twimg.com/media/FbpAEs8VEAAlXCB?format=jpg&name=small",
];


// const FETCH_Others = gql`
// query FetchTokensByStoreId($ownerId: String!, $storeId: String!, $limit: Int, $offset: Int) {
//   metadata(
//     order_by: { thing_id: asc }
//     where: {thing: {tokens: {ownerId: {_eq: $ownerId}}, storeId: {_eq: $storeId}}}
//     limit: $limit
//     offset: $offset
//     distinct_on: thing_id
//   ) {
//     id
//     media
//     animation_url
//     title
//     thing_id
//     animation_type
//     thing {
//       id
//       metaId
//       memo
//     }
//   }
// }`

const NFT = ({
    toggle,
    tokenId,
    media,
    title,
    animation_url,
    animation_type,
}: {
    toggle: any;
    tokenId: string;
    media: string;
    title: string;
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
                                src={media}
                                layout='fill'
                                objectFit="cover"
                                alt={title}
                            />
                            <div className="absolute bottom-2 z-10 right-2 text-primary" onClick={() => toggleFullScreen(media)}>
                                <BsCircle className="relative h-8 w-8" />
                                <AiOutlineExpandAlt title="full screen" className="w-4 h-4 absolute -mt-6 ml-2" />
                            </div>
                        </div>
                    ) : (
                        <div className="w-full aspect-square rounded-lg overflow-hidden mx-auto flex items-center">
                            <video poster={media} controls controlsList="nodownload" loop muted>
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
    id: string;
    media: string;
    animation_url: string;
    title: string;
    animation_type: string;
    thing_id: string;
    thing: {
        id: string;
        metaId: string;
        memo: string;
        tokens: Tokens[];
    };
};

interface Tokens {
    id: string;
    ownerId: string;
    lists: List[];
}

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
            limit: 10,
            offset: 0,
            storeId: "",
        },
    });

    useEffect(() => {
        getTokens({
            variables: {
                ownerId: wallet?.activeAccount?.accountId!,
                limit: 20,
                offset: 0,
                storeId: process.env.NEXT_PUBLIC_STORE_NAME!,
            },
        });
    }, [wallet?.activeAccount?.accountId]);

    useEffect(() => {
        if (!tokensData) return;

        setMetaData(tokensData.metadata);
        console.log(tokensData.metadata);

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
                                    key={meta.id}
                                    tokenId={meta.thing.tokens[0].id}
                                    media={meta.media}
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
