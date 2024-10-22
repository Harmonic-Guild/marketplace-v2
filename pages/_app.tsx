import { ApolloProvider } from "@apollo/client";
import Head from "next/head";
import NextProgress from "next-progress";
import dynamic from "next/dynamic";
import type { AppProps } from "next/app";
import { useApollo } from "../services/apolloClient";
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import * as Fathom from 'fathom-client';
import {WalletContextProvider} from '@mintbase-js/react'
import '@near-wallet-selector/modal-ui/styles.css'
import config from '../config/config'
import { mbjs } from '@mintbase-js/sdk'

const Header = dynamic(() => import("../components/Header"));
const Footer = dynamic(() => import("../components/Footer"));

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }: AppProps) {
    const apolloClient = useApollo(pageProps);
    const router = useRouter();

    const network = process.env.NEXT_PUBLIC_NETWORK
    const contractAddress = process.env.NEXT_PUBLIC_STORE_NAME 

        mbjs.config({network, contractAddress})

    useEffect(() => {
        
        // Initialize Fathom when the app loads
        // Example: yourdomain.com
        //  - Do not include https://
        //  - This must be an exact match of your domain.
        //  - If you're using www. for your domain, make sure you include that here.
        Fathom.load(process.env.NEXT_PUBLIC_YOUR_FATHOM_TRACKING_CODE!, {
            includedDomains: [process.env.NEXT_PUBLIC_DOMAIN_NAME!],
        });

        function onRouteChangeComplete() {
            Fathom.trackPageview();
        }
        // Record a pageview when route changes
        router.events.on("routeChangeComplete", onRouteChangeComplete);

        // Unassign event listener
        return () => {
            router.events.off("routeChangeComplete", onRouteChangeComplete);
        };
    }, []);
    
    return (
        <>
            <NextProgress options={{ showSpinner: false }} color={"#0F172A"} />
            <Head>
                <title>{config.title}</title>
                <link rel="icon" href={config.favicon} />
            </Head>

            <WalletContextProvider>
                <ApolloProvider client={apolloClient}>
                    <Header />
                    <Component {...pageProps} />
                    <Footer />
                </ApolloProvider>
            </WalletContextProvider>
        </>
    );
}

export default MyApp;
