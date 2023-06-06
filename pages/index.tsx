import type { NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";
// import AboutArtist from "../components/AboutArtist";
import Gleap from "gleap";
import config from "../config/config";
import { useEffect } from "react";
import { QUERIES, fetchGraphQl } from "@mintbase-js/data";
import { mbjs } from "@mintbase-js/sdk";

const FeaturedNft = dynamic(() => import("../components/FeaturedNft"));
const WeeklyNft = dynamic(() => import("../components/WeeklyNft"));
const AboutArtist = dynamic(() => import("../components/AboutArtist"));

const Home: NextPage = ({ featured, weekly }: any) => {

    useEffect(() => {
        // Run within useEffect to execute this code on the frontend.
        Gleap.initialize("QiQEFx0bETLdNLtHD0n1dFu81ayhDck3");
    }, []);

    return (
        <div className="flex min-h-screen flex-col items-center justify-center py-2">
            <Head>
                <title>{config.title}</title>
                <link rel="icon" href={config.logo2} />
            </Head>
            <FeaturedNft data={featured} />
            <WeeklyNft data={weekly} />
            {/* <AboutArtist storeId={storeName} /> */}
        </div>
    );
};

export default Home;

export async function getServerSideProps(params: any) {
    let featured: ResponseType | undefined = undefined;
    let weekly: ResponseType | undefined = undefined;

    // fetch featured NFTs
    try {
        const { data, error } = await fetchGraphQl<ResponseType>({
            query: QUERIES.storeNftsQuery,
            variables: {
                condition: {
                    nft_contract_id: { _in: mbjs.keys.contractAddress },
                    //   ...(showOnlyListed && { price: { _is_null: false } }),
                },
                limit: 5,
                offset: 0,
            },
        });

        featured = data;
    } catch (error) {
        console.log(error);
    }

    // fetch Weekly NFTs
    try {
        const { data, error } = await fetchGraphQl<ResponseType>({
            query: QUERIES.storeNftsQuery,
            variables: {
                condition: {
                    nft_contract_id: { _in: mbjs.keys.contractAddress },
                    //   ...(showOnlyListed && { price: { _is_null: false } }),
                },
                limit: 5,
                offset: 3,
            },
        });

        weekly = data;
    } catch (error) {
        console.log(error);
    }

    return {
        props: {
            featured,
            weekly,
        },
    };
}
