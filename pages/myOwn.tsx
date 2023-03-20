import { useEffect, useState } from "react";
import React from "react";
import Image from "next/image";
import MintNft from "../Modal/MintNft";
import { BsCircle } from "react-icons/bs";
import { AiOutlineExpandAlt } from "react-icons/ai";

import styles from "../styles/MyOwn.module.scss";
import { resolveUrl } from "../helpers/resolveUrl";
import { ownedTokens } from "@mintbase-js/data";
import { useWallet } from "@mintbase-js/react";

const NFT = ({
    thing_id,
    metadata_id,
    toggle,
    tokenId,
    media,
    title,
    animationUrl,
}: {
    thing_id: string;
    toggle: any;
    metadata_id: string;
    tokenId: string;
    media: string;
    title: string;
    animationUrl: string;
}) => {
    const [sellModal, showSellModal] = useState(false);

    const toggleFullScreen = (media: any) => {
        toggle(media);
    };

    return (
        <div className="w-full h-auto border border-primary-color rounded-2xl bg-card bg-opacity-10">
            <div className="p-4">
                {sellModal && <MintNft closeModal={() => showSellModal(false)} thingId={thing_id} tokenId={tokenId} title={title} />}
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
                        <div className="w-full flex justify-center mt-6">
                        {/* {metaData.length? (
                            <>
                                {metaData.price}
                                <button className="border hover:text-primary-color hover:bg-secondary-color rounded-xl outline-none bg-card border-secondary-color py-2 font-medium px-4 w-2/3 text-gray-800 font-header">Unlist (coming&nbsp;soon)</button> 
                            </> 
                        ): ( */}
                            <button className="border hover:text-primary-color hover:bg-secondary-color rounded-xl outline-none bg-card border-secondary-color py-2 font-medium px-4 w-2/3 text-gray-800 font-header" onClick={()=> showSellModal(true)}>List on sale</button>  
                         {/* )}  */}
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

const MyOwn = () => {
    const { activeAccountId } = useWallet();
    const [fullScreen, setFullScreen] = useState(false);
    const [image, setImage] = useState<any>(null);
    const [tokens, setTokens] = useState<any>([])


    const fetchOwnedTokens = async () => {
        if(activeAccountId) {
            const {data, error} = await ownedTokens(activeAccountId, {limit: 20})
            setTokens(data);
            
        }
    }

    useEffect(() => {
        fetchOwnedTokens()
    }, [])

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
                        your tokens from this store
                    </h1>

                    <div className="pb-24 w-full mx-auto px-10">
                        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2  w-full pt-4 gap-y-5 gap-x-2">
                            {tokens.map((meta: MetaData, index: string) => (
                                <NFT
                                    key={index}
                                    thing_id={meta.metadataId}
                                    toggle={toggle}
                                    tokenId={meta.tokenId}
                                    media={meta.media}
                                    title={meta.title}
                                    animationUrl={meta.animationUrl}
                                    metadata_id={meta.metadataId}
                                />
                            ))}
                        </div>
                    </div>
                </>
        </div>
    );
};

export default MyOwn;
