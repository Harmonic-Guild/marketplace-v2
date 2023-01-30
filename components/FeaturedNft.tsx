import React, { useEffect, useState } from "react";
import Link from 'next/link';
import Slider from "react-slick";

import { gql } from "apollo-boost";
import { useLazyQuery } from "@apollo/client";
import Image from "next/image";

import styles from "../styles/FeaturedNfts.module.scss";
import { Token } from "../constants/interfaces";
import { resolveUrl } from '../helpers/resolveUrl';

const FETCH_WEEKLY = gql`
query GetStoreNfts($offset: Int = 0, $condition: mb_views_nft_metadata_unburned_bool_exp) @cached {
    mb_views_nft_metadata_unburned(offset: $offset, limit: 5, order_by: {minted_timestamp: desc}, where: $condition) {
      createdAt: minted_timestamp
      listed: price
      media
      storeId: nft_contract_id
      metadataId: metadata_id
      media_hash:reference_blob(path: "$.media_hash")
      title
      base_uri
      description
    }
    mb_views_nft_metadata_unburned_aggregate(where: $condition) {
      aggregate {
        count
      }
    }
  }
`;

const FeaturedNft = ({ storeId }: { storeId: string }) => {
  

    const [tokens, setTokens] = useState<[]>([]);
    const [slideIndex, setSlideIndex] = useState(0);

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
        // nextArrow: <SampleNextArrow/>,
        // prevArrow: <SamplePrevArrow/>,
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

    const [getTokens, { loading: loadingtokensData, data: tokensData }] = useLazyQuery(FETCH_WEEKLY, {
        variables: {
            condition: {
                nft_contract_id: { _regex: "" } 
            }
        },
    });

    useEffect(() => {
        getTokens({
            variables: {
                condition: {
                    nft_contract_id: { _regex: storeId } 
                }
            },
        });
    }, []);

    useEffect(() => {
        if (!tokensData) return;

        const weeklyTokens = tokensData?.mb_views_nft_metadata_unburned.map((token: Token) => token);

        setTokens(weeklyTokens);

    }, [tokensData]);

    return (
        <div className={styles.container}>
            <div className=" text-center  font-bold text-gray-900 mb-6 headerFont">
                <h2 className="text-mp-dark-2 text-4xl font-semibold mb-2"> Featured NFTs </h2>
                <p className="lg:text-2xl text-lg text-mp-dark-2">New arivals</p>
            </div>
            <Slider {...settings}>
                {tokens.map((token: Token, index) => (
                    <Link href={`/thing/${token.metadataId}`} key={token.metadataId}>
                        <div className={index === slideIndex ? "slide:active" : "slide"} key={index}>
                            <div className="h-96 w-full rounded-xl shadow-lg relative overflow-hidden">
                                <Image src={resolveUrl(token.media, token.media_hash)}  alt="" objectFit="cover" layout="fill" />
                                {index === slideIndex && (
                                    <div className="absolute bottom-5 text-center font-semibold w-full">
                                        <p className="text-white">{token.title}</p>
                                        {/* <button className={styles["bid-button"]}>Bid &rarr;</button> */}
                                    </div>
                                )}
                            </div>
                        </div>
                    </Link>
                ))}
            </Slider>
        </div>
    );
};

export default FeaturedNft;
