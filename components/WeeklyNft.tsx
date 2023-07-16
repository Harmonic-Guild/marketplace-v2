import { GiStarShuriken } from "react-icons/gi";
import Slider from "react-slick";
import { Token } from "../constants/interfaces";
import dynamic from "next/dynamic";

import styles from "../styles/WeeklyNft.module.scss";
import { useEffect, useState } from "react";
import { QUERIES, fetchGraphQl } from "@mintbase-js/data";
import { mbjs } from "@mintbase-js/sdk";

const NFT = dynamic(() => import("../components/NFT"));

const WeeklyNft = ({ ids }: any) => {
    const [tokens, setTokens] = useState<any>();

    const idsToFetch = ids?.c?.map((k: any) => {
        return k.v;
    }) || [];

    const fetchFeatured = async () => {
        const { data, error } = await fetchGraphQl<any>({
            query: QUERIES.storeNftsQuery,
            variables: {
                condition: {
                    nft_contract_id: { _in: mbjs.keys.contractAddress },
                    metadata_id: { _in: idsToFetch },
                    //   ...(showOnlyListed && { price: { _is_null: false } }),
                },
                limit: 5,
                offset: 0,
            },
        });
        // console.log('okkkokokokkokk',data.mb_views_nft_metadata_unburned);

        setTokens(data?.mb_views_nft_metadata_unburned);
    };

    useEffect(() => {
        if (ids?.c?.length) fetchFeatured();
    }, [ids]);

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
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: true,
                },
            },
        ],
    };

    if(!tokens) return <h1 className="text-font-color text-2xl mb-8">No tokens to show</h1>

    // const tokens: Token[] = data.mb_views_nft_metadata_unburned
    return (
        <>
            {/* {loadingtokensData && <div className="h-5 w-5 bg-primary-color animate-pulse rounded-full"></div>} */}
            <div className={styles.container}>
                <div className=" text-center  font-bold text-gray-900 mb-4">
                    <p className="text-font-color mb-2">
                        Hot <GiStarShuriken className="inline w-6 h-5" />
                    </p>
                    <h2 className="text-font-color text-4xl font-bold font-header">NFTs of the week </h2>
                </div>
                {/* <div className={styles["nfts-cont"]}> */}
                <Slider {...settings} className={styles["nfts-cont"]}>
                    {tokens.map((token: Token, id: number) => (
                        <NFT token={token} key={id} />
                    ))}
                </Slider>
                {/* </div> */}
            </div>
        </>
    );
};

export default WeeklyNft;
