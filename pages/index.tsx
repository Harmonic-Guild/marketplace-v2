import type { NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";
// import AboutArtist from "../components/AboutArtist";
import Gleap from "gleap";
import config from "../config/config";
import { useEffect, useState } from "react";
import { getData } from "../helpers/fetchSheetsData";

const FeaturedNft = dynamic(() => import("../components/FeaturedNft"));
const WeeklyNft = dynamic(() => import("../components/WeeklyNft"));
const AboutArtist = dynamic(() => import("../components/AboutArtist"));

const Home: NextPage = () => {
    const [data, setData] = useState<{rows: any}>()

    const fetchData = async () => {
        const data = await getData();
        setData(data);
    }

    useEffect(() => {
        // Run within useEffect to execute this code on the frontend.
        fetchData()
        Gleap.initialize("QiQEFx0bETLdNLtHD0n1dFu81ayhDck3");
    }, []);

    return (
        <div className="flex min-h-screen flex-col items-center justify-center py-2">
            <Head>
                <title>{config.title}</title>
                <link rel="icon" href={config.logo2} />
            </Head>
            
                <FeaturedNft sheetData={{ids: data?.rows[0], stores: data?.rows[2]}}/>
                <WeeklyNft ids={data?.rows[1] || []} />
            {/* <AboutArtist storeId={storeName} /> */}
        </div>
    );
};

export default Home;
