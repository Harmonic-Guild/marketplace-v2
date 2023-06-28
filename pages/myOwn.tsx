import { useEffect, useState } from "react";
import React from "react";
import Image from "next/image";
import ListNft from "../Modal/List";
import { BsCircle } from "react-icons/bs";
import { AiOutlineExpandAlt } from "react-icons/ai";

import styles from "../styles/MyOwn.module.scss";
import { resolveUrl } from "../helpers/resolveUrl";
import { Token, ownedTokens, tokensByStatus } from "@mintbase-js/data";

const NFT = ({
    thing_id,
    metadata_id,
    toggle,
    tokenId,
    media,
    title,
    animationUrl,
    accountId
}: {
    thing_id: string;
    toggle: any;
    metadata_id: string;
    tokenId: string;
    media: string;
    title: string;
    animationUrl: string;
    accountId: string;
}) => {
    const [sellModal, showSellModal] = useState(false);
    const [listed, setListed] = useState<boolean | undefined>(undefined);

    const toggleFullScreen = (media: any) => {
        toggle(media);
    };
    
    // let listed: boolean | undefined = undefined;
    const fetchData = async () => {
        const {data, error} = await tokensByStatus(thing_id, accountId);

        setListed(data?.listedTokens.includes(tokenId))  
        
    }
    
    useEffect(() => {
        thing_id && fetchData()
    }, [])
    


    return (
        <div className="w-full h-auto border border-primary-color rounded-2xl bg-card bg-opacity-10">
            <div className="p-4">
                {sellModal && <ListNft closeModal={() => showSellModal(false)} thingId={thing_id} tokenId={tokenId} title={title} />}
                <div>
                    {animationUrl === null ||
                    animationUrl === undefined ?(
                        <div className="relative mx-auto rounded-lg overflow-hidden w-full aspect-square z-0">
                            <Image
                                src={resolveUrl(media)}
                                layout='fill'
                                objectFit="cover"
                                alt={title}
                            />
                            <div className="absolute bottom-2 right-2 text-primary-color" onClick={() => toggleFullScreen(resolveUrl(media))}>
                                <BsCircle className="relative h-8 w-8" />
                                <AiOutlineExpandAlt title="full screen" className="w-4 h-4 absolute -mt-6 ml-2" />
                            </div>
                        </div>
                    ) : (
                        <div className="w-full aspect-square rounded-lg overflow-hidden mx-auto flex items-center">
                            <video poster={resolveUrl(media)} controls controlsList="nodownload" loop muted>
                                <source src={animationUrl}></source>
                            </video>
                        </div>
                    )}
                    <div className="px-30 py-2">
                        <div className="text-center font-bold text-lg font-text">{title}</div>
                        <div className="w-full justify-center mt-6">
                        { listed ?
                        <button className="border hover:text-primary-color hover:bg-secondary-color rounded-xl outline-none bg-card border-secondary-color py-2 font-medium px-4 w-full mb-3 text-gray-800 font-header">Unlist (coming&nbsp;soon)</button> :
                            <button className="border hover:text-font-color hover:bg-secondary-color rounded-xl outline-none bg-card border-secondary-color py-2 font-medium px-4 w-full text-gray-800 font-header" onClick={()=> showSellModal(true)}>List on sale</button>  }
                         
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

type MetaData = {
    animationUrl: string
    baseUri: string
    contractId: string
    document: string
    lastTransferredAt: string
    media: string
    metadataId: string
    minter: string
    title: string
    tokenId: string
};



interface List {
    autotransfer: boolean;
    offer: {
        price: number;
    };
    price: number;
}

const MyOwn = ({tokens, accountId}: {tokens: Token[], accountId: string}) => {
    const [fullScreen, setFullScreen] = useState(false);
    const [image, setImage] = useState<any>(null);

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
                <>
                    <h1 className="drop-shadow-lg text-xl text-center font-semibold tracking-widest uppercase text-gray-500 title-font md:text-2xl px-6 py-8 font-header">
                        your tokens
                    </h1>

                    <div className="pb-24 w-full mx-auto px-10">
                        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2  w-full pt-4 gap-y-5 gap-x-2">
                            {tokens.map((meta: MetaData, index: number) => (
                                <NFT
                                    key={index}
                                    thing_id={meta.metadataId}
                                    toggle={toggle}
                                    tokenId={meta.tokenId}
                                    media={meta.media}
                                    title={meta.title}
                                    animationUrl={meta.animationUrl}
                                    metadata_id={meta.metadataId}
                                    accountId = {accountId}
                                />
                            ))}
                        </div>
                    </div>
                </>
        </div>
    );
};

export default MyOwn;

export async function getServerSideProps({query}: {query:{account: string}}) {

    const {account} = query;

    let tokens: Token[] | null | undefined = undefined;
    try {
        const {data, error} = await ownedTokens(account, {limit: 30})
        tokens = data;
        
    } catch (error) {
        console.log(error);
    }

    return {
        props: {
            tokens,
            accountId: account
        },
    };
}


