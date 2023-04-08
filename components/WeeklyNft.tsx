import React, { useEffect, useState } from "react";
import { GiStarShuriken } from "react-icons/gi";
import Slider from "react-slick";
import NFT from "./NFT";
import { ResponseType, Token } from "../constants/interfaces";

import styles from "../styles/WeeklyNft.module.scss";
import { QUERIES, fetchGraphQl } from "@mintbase-js/data";
import { mbjs } from "@mintbase-js/sdk";

const WeeklyNft = (storeId : any) => {

    const [tokens, setTokens] = useState<Token[]>([]);
    
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 4,
        // autoplay: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
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
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: true,
                },
            },
        ],
    };

   async function myFetchMethod  () {
        const { data, error } = await fetchGraphQl<ResponseType>({
          query: QUERIES.storeNftsQuery,
          variables: {
            condition: {
              nft_contract_id: { _in: mbjs.keys.contractAddress },
            //   ...(showOnlyListed && { price: { _is_null: false } }),
            },
            limit: 5,
            offset: 1,
          }
        });
        setTokens(data?.mb_views_nft_metadata_unburned!)    
      }

    useEffect( ()=> {
        myFetchMethod()
    }, [])


    return (
        <>
            {/* {loadingtokensData && <div className="h-5 w-5 bg-primary-color animate-pulse rounded-full"></div>} */}
            <div className={styles.container}>
                <div className=" text-center  font-bold text-gray-900 mb-4">
                    <p className="text-secondary-color mb-2">
                       
                    </p>
                    <h2 className="text-mp-dark-2 text-2xl lg:text-4xl font-bold font-header">Airdrops and Collectibles</h2>
                </div>
                {/* <div className={styles["nfts-cont"]}> */}
                <Slider {...settings} className={styles["nfts-cont"]}>
                    {tokens.map((token, id) => (
                        <NFT token={token} key={id} />
                    ))}
                </Slider>
                {/* </div> */}
            </div>
        </>
    );
};

export default WeeklyNft;
