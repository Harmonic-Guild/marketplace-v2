import type { NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";
// import AboutArtist from "../components/AboutArtist";
import Gleap from 'gleap';
import { useEffect } from 'react';

const FeaturedNft = dynamic(() => import("../components/FeaturedNft"));
const WeeklyNft = dynamic(() => import("../components/WeeklyNft"));
const AboutArtist = dynamic(() => import("../components/AboutArtist"));

const Home: NextPage = () => {
    const storeName = process.env.NEXT_PUBLIC_STORE_NAME!;

    useEffect(() => {
        // Run within useEffect to execute this code on the frontend.
        Gleap.initialize("QiQEFx0bETLdNLtHD0n1dFu81ayhDck3");
    }, []);

    return (
        <div className="flex min-h-screen flex-col items-center justify-center py-2">
            <Head>
                <title>MarketPlace</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <FeaturedNft storeId={storeName} />
            <WeeklyNft storeId={storeName} />
            <AboutArtist storeId={storeName} />
        </div>
    );
};

export default Home;
