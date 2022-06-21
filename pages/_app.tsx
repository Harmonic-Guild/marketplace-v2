import { ApolloProvider } from '@apollo/client'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Header from "../components/Header";
import Footer from "../components/Footer";
import { WalletProvider } from "../services/providers/MintbaseWalletContext";
import { useApollo } from '../services/apolloClient';


function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps)
  return (
    <>
    <WalletProvider apiKey={process.env.NEXT_PUBLIC_MINTBASEJS_API_KEY || ''}>
      <ApolloProvider client={apolloClient}>
        <Header/>    
        <Component {...pageProps} />
        <Footer/>
      </ApolloProvider>
    </WalletProvider>
    

    </>
  )
}

export default MyApp
