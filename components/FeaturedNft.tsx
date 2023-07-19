import React, { useEffect, useState } from "react";
import Link from "next/link";
import Slider from "react-slick";
import { GiStarShuriken } from "react-icons/gi";

import Image from "next/image";

import styles from "../styles/FeaturedNfts.module.scss";
import { Token } from "../constants/interfaces";
import { resolveUrl } from "../helpers/resolveUrl";
import { QUERIES, fetchGraphQl } from "@mintbase-js/data";
import { mbjs } from "@mintbase-js/sdk";

const FeaturedNft = ({ ids }: any) => {
    const [slideIndex, setSlideIndex] = useState(0);
    const [tokens, setTokens] = useState<any>()

    const idsToFetch = ids?.c?.map((k:any)=> {
        return k.v
    }) || [];
    

    const fetchFeatured = async () => {
        
        const { data, error } = await fetchGraphQl<any>({
            query: QUERIES.storeNftsQuery,
            variables: {
                condition: {
                    nft_contract_id: { _in: mbjs.keys.contractAddress },
                    metadata_id: {_in: idsToFetch}
                    //   ...(showOnlyListed && { price: { _is_null: false } }),
                },
                limit: 5,
                offset: 0,
                
            },
        });
        // console.log('okkkokokokkokk',data.mb_views_nft_metadata_unburned);
        
        setTokens(data?.mb_views_nft_metadata_unburned)
    }

    useEffect(()=> {
      if(ids?.c?.length)  fetchFeatured()
    }, [ids])

    // render() {
    const settings = {
        dots: true,
        // className: "center",
        infinite: true,
        centerPadding: "8px",
        centerMode: true,
        slidesToShow: 3,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true,
        slidesToScroll: 1,
        initialSlide: 0,
        beforeChange: (current: any, next: any) => setSlideIndex(next),
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
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
    if(!tokens) return <h1 className="text-font-color text-2xl mb-8">No featured Tokens to show</h1>


    return (
        <>
            {tokens?.length ? (
                <div className={styles.container}>
                    <div className=" text-center  font-bold text-gray-900 mb-6">
                        <p className="text-font-color mb-2">
                            <GiStarShuriken className="inline w-6 h-5" />
                        </p>
                        <h2 className="text-font-color text-4xl font-header font-semibold mb-2"> Featured NFTs </h2>
                        <p className="lg:text-2xl text-lg text-font-color font-header">New arrivals</p>
                    </div>
                    <Slider {...settings}>
                        {tokens.map((token: Token, index: number) => (
                            <Link href={`/thing/${token.metadata_id}`} key={index}>
                                <div className={index === slideIndex ? "slide:active" : "slide"} key={index}>
                                    <div className="h-96 w-full rounded-xl shadow-lg relative overflow-hidden">
                                        <Image src={resolveUrl(token.media)} alt="" objectFit="cover" layout="fill" />
                                        {index === slideIndex && (
                                            <div className="absolute bottom-5 text-center font-semibold w-full">
                                                <p className="text-primary-color">{token.title}</p>
                                                {/* <button className={styles["bid-button"]}>Bid &rarr;</button> */}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </Slider>
                </div>
            ) : (
                <p></p>
            )}
        </>
    );
};

export default FeaturedNft;
