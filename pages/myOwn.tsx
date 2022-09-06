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

const nftExamples = [
    {
        image: images[0],
        title: "Dope NFT",
        description: "Lorem ipsum dolor sit amet,  adipiscing elit. Aliquam lobortis feugiat purus varius magnis purus quam.",
    },
    {
        image: images[1],
        title: "Classic NFT",
        description: "Lorem ipsum dolor sit amet,  adipiscing elit. Aliquam lobortis feugiat purus varius magnis purus quam.",
    },
    {
        image: images[2],
        title: "Magestic NFT",
        description: "Lorem ipsum dolor sit amet,  adipiscing elit. Aliquam lobortis feugiat purus varius magnis purus quam.",
    },
    {
        image: images[0],
        title: "Dope NFT",
        description: "Lorem ipsum dolor sit amet,  adipiscing elit. Aliquam lobortis feugiat purus varius magnis purus quam.",
    },
    {
        image: images[1],
        title: "Classic NFT",
        description: "Lorem ipsum dolor sit amet,  adipiscing elit. Aliquam lobortis feugiat purus varius magnis purus quam.",
    },
    {
        image: images[2],
        title: "Magestic NFT",
        description: "Lorem ipsum dolor sit amet,  adipiscing elit. Aliquam lobortis feugiat purus varius magnis purus quam.",
    },
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
    lists,
}: {
    toggle: any;
    tokenId: string;
    media: string;
    title: string;
    animation_url: string;
    animation_type: string;
    lists: any;
}) => {
    const [sellModal, showSellModal] = useState(false);

    const toggleFullScreen = (media: any) => {
        toggle(media);
    };

    return (
        <div className="w-full h-auto border border-mp-brown-2 rounded-2xl bg-mp-peach-2">
            <div className="p-4">
                {sellModal && <MintNft closeModal={() => showSellModal(false)} tokenId={tokenId} title={title} />}
                <div>
                    {animation_type === null ||
                    animation_type === "image/jpeg" ||
                    animation_type === "image/png" ||
                    animation_type === "image/gif" ? (
                        <div className="object-contain mx-auto rounded">
                            <div className="object-contain mx-auto rounded-lg relative">
                                <Image
                                    height={500}
                                    width={500}
                                    objectFit="cover"
                                    src={media}
                                    alt={title}
                                    className="object-contain mx-auto rounded-lg"
                                />
                                <div className="absolute bottom-2 z-10 right-2 text-yellow-500" onClick={() => toggleFullScreen(media)}>
                                    <BsCircle className="relative h-8 w-8" />
                                    <AiOutlineExpandAlt title="full screen" className="w-4 h-4 absolute -mt-6 ml-2" />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="lg:h-80 h-64 mx-auto flex items-center">
                            <video poster={media} controls className="object-contain mx-auto rounded-lg" controlsList="nodownload" loop muted>
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
    const [slideIndex, setSlideIndex] = useState(0);

    const settings: Settings = {
        dots: false,
        arrows: false,
        // className: "center",
        infinite: false,
        centerPadding: "8px",
        centerMode: true,
        slidesToShow: 3,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true,
        slidesToScroll: 1,
        initialSlide: 0,
        beforeChange: (current: any, next: any) => setSlideIndex(next),
        // nextArrow: <SampleNextArrow/>,
        // prevArrow: <SamplePrevArrow/>,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    initialSlide: 3,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    const [getTokens, { loading: loadingTokensData, data: tokensData }] = useLazyQuery(FETCH_TOKENS, {
        variables: {
            ownerId: "",
            limit: 10,
            offset: 0,
            storeId: "",
        },
    });

    console.log(slideIndex);

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
                        <div className="absolute bottom-2 right-8 text-yellow-500" onClick={() => setFullScreen(false)}>
                            <BsCircle className="relative h-8 w-8" />
                            <AiOutlineExpandAlt title="close screen" className="w-4 h-4 absolute -mt-6 ml-2" />
                        </div>
                    </div>
                </div>
            )}
            {loadingTokensData && "Loading..."}
            {!loadingTokensData && (
                <>
                    <h1 className="drop-shadow-lg text-xl text-center font-semibold tracking-widest uppercase text-gray-500 title-font md:text-2xl px-6 py-8">
                        {/* {wallet?.activeAccount?.accountId}  */}
                        your tokens from this store
                    </h1>
                    <div className="pb-24 w-full mx-auto ">
                        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2  w-full pt-4 gap-y-5 gap-x-2">
                            {/* {metaData.map((meta: MetaData) => (
                                <NFT
                                    key={meta.id}
                                    tokenId={meta.thing.tokens[0].id}
                                    media={meta.media}
                                    title={meta.title}
                                    animation_url={meta.animation_url}
                                    animation_type={meta.animation_type}
                                    lists={meta.thing.tokens[0].lists}
                                    toggle={toggle}
                                />
                            ))} */}
                        </div>
                        <Slider {...settings}>
                            {nftExamples.map(({ image, title, description }: any, index: number) => (
                                <div
                                    className={`${styles.nft} ${
                                        index === slideIndex ? "slide:active" : index < slideIndex ? "slide lower" : "slide higher"
                                    }
                                        ${index == nftExamples.length - 1 ? styles.last : ""}
                                    `}
                                    key={image}
                                >
                                    <div className={styles["image-cont"]}>
                                        <Image src={image} layout="fill" objectFit="cover" />
                                    </div>
                                    {index === slideIndex && (
                                        <>
                                            <p className={styles.title}>{title}</p>
                                            <p className={styles.description}>{description}</p>
                                        </>
                                    )}
                                </div>
                            ))}
                            <div></div>
                            <div></div>
                        </Slider>
                    </div>

                    {/* <h1 className="drop-shadow-lg text-xl text-center font-semibold tracking-widest uppercase text-gray-500 title-font md:text-2xl px-6 pb-4">
          your tokens from Other stores
        </h1>
        <div className="pb-24 w-full mx-auto ">
          <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2  w-full pt-4 gap-y-5 gap-x-2">
            {metaData.map((meta: MetaData) => (
                <NFT
                key={meta.id}
                  tokenId={meta.thing.tokens[0].id}
                  media={meta.media}
                  title={meta.title}
                  animation_url={meta.animation_url}
                  animation_type={meta.animation_type}
                  lists={meta.thing.tokens[0].lists}
                  toggle={toggle}
                />
            ))}
          </div>
        </div> */}
                </>
            )}
        </div>
    );
};

export default MyOwn;
