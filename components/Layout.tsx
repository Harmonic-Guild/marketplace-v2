import React from 'react';
// import Footer from './Footer';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children } : any) => {
  return (
    <>
        <Header />
        {children}
        <Footer/>
    </>
  )
}

export default Layout