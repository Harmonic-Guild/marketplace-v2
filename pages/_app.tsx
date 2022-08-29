import { ApolloProvider } from '@apollo/client'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import '../styles/globals.css'
import dynamic from 'next/dynamic';
import type { AppProps } from 'next/app'
import { WalletProvider } from "../services/providers/MintbaseWalletContext";
import { useApollo } from '../services/apolloClient';

const Header = dynamic(()=> import('../components/Header'));
const Footer = dynamic(()=> import('../components/Footer'));


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
