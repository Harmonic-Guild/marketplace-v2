import React, { useEffect, useState } from "react";
import { gql } from "apollo-boost";
import { useLazyQuery } from "@apollo/client";
import { GiStarShuriken } from "react-icons/gi";
import Slider from "react-slick";
import NFT from "./NFT";
import { Token } from "../constants/interfaces";

import styles from "../styles/WeeklyNft.module.scss";

const FETCH_WEEKLY = gql`
query GetStoreNfts($offset: Int = 0, $condition: mb_views_nft_metadata_unburned_bool_exp) @cached {
    mb_views_nft_metadata_unburned(offset: $offset, limit: 5, order_by: {minted_timestamp: asc}, where: $condition) {
      createdAt: minted_timestamp
      listed: price
      media
      storeId: nft_contract_id
      metadataId: metadata_id
      media_hash: reference_blob(path: "$.media_hash")
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

const WeeklyNft = ({ storeId }: { storeId: string }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        // autoplay: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    initialSlide: 3,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    dots: true,
                },
            },
        ],
    };

    const [tokens, setTokens] = useState<Token[]>([]);

    const [getTokens, { loading: loadingtokensData, data: tokensData }] = useLazyQuery(FETCH_WEEKLY, {
        variables: {
            condition: {
                nft_contract_id: { _in: "" } 
            }
        },
    });

    useEffect(() => {
        getTokens({
            variables: {
                condition: {
                    nft_contract_id: { _in: storeId } 
                }
            },
        });
        console.log(storeId);
    }, []);

    useEffect(() => {
        // console.log(storeData);

        if (!tokensData) return;


        const weeklyTokens = tokensData?.mb_views_nft_metadata_unburned.map((token: any) => token);

        setTokens(weeklyTokens);
    }, [tokensData]);

    return (
        <>
            {loadingtokensData && <div className="h-5 w-5 bg-primary animate-pulse rounded-full"></div>}
            <div className={styles.container}>
                <div className=" text-center  font-bold text-gray-900 mb-4">
                    <p className="text-secondary mb-2">
                        Hot <GiStarShuriken className="inline w-6 h-5" />
                    </p>
                    <h2 className="text-mp-dark-2 text-4xl font-bold">NFTs of the week </h2>
                </div>
                {/* <div className={styles["nfts-cont"]}> */}
                <Slider {...settings} className={styles["nfts-cont"]}>
                    {tokens.map((token) => (
                        <NFT token={token} key={token.metadataId} />
                    ))}
                </Slider>
                {/* </div> */}
            </div>
        </>
    );
};

export default WeeklyNft;
