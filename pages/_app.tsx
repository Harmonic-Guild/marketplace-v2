import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import Header from "../components/Header";
import Footer from "../components/Footer";


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
    <Header/>    
    <Component {...pageProps} />
    <Footer/>

    </>
  )
}

export default MyApp
