import { ApolloProvider } from "@apollo/client";
import Head from "next/head";
import NextProgress from "next-progress";
import dynamic from "next/dynamic";
import type { AppProps } from "next/app";
import { WalletProvider } from "../services/providers/MintbaseWalletContext";
import { useApollo } from "../services/apolloClient";

const Header = dynamic(() => import("../components/Header"));
const Footer = dynamic(() => import("../components/Footer"));

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }: AppProps) {
    const apolloClient = useApollo(pageProps);
    return (
        <>
            <NextProgress options={{ showSpinner: false }} color={"#0F172A"} />
            <Head>
                <title>MarketPlace</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <WalletProvider apiKey={process.env.NEXT_PUBLIC_MINTBASEJS_API_KEY || ""}>
                <ApolloProvider client={apolloClient}>
                    <Header />
                    <Component {...pageProps} />
                    <Footer />
                </ApolloProvider>
            </WalletProvider>
        </>
    );
}

export default MyApp;
