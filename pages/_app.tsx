import { ApolloProvider } from "@apollo/client";
import Head from "next/head";
import NextProgress from "next-progress";
import dynamic from "next/dynamic";
import type { AppProps } from "next/app";
import { WalletProvider } from "../services/providers/MintbaseWalletContext";
import { useApollo } from "../services/apolloClient";
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import * as Fathom from 'fathom-client';

const Header = dynamic(() => import("../components/Header"));
const Footer = dynamic(() => import("../components/Footer"));

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }: AppProps) {
    const apolloClient = useApollo(pageProps);
    const router = useRouter();

    useEffect(() => {
    // Initialize Fathom when the app loads
    // Example: yourdomain.com
    //  - Do not include https://
    //  - This must be an exact match of your domain.
    //  - If you're using www. for your domain, make sure you include that here.
    Fathom.load(process.env.NEXT_PUBLIC_YOUR_FATHOM_TRACKING_CODE!, {
      includedDomains: ['testnet.harmonicguild.io'],
    });

    function onRouteChangeComplete() {
      Fathom.trackPageview();
    }
    // Record a pageview when route changes
    router.events.on('routeChangeComplete', onRouteChangeComplete);

    // Unassign event listener
    return () => {
      router.events.off('routeChangeComplete', onRouteChangeComplete);
    };
    }, []);
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
