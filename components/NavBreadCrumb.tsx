import React, { Component } from "react";
import Slider from "react-slick";

const image = [
    {src: 'https://arweave.net/Yjn-nuWnEv8IgiFsw1LPKq1xjfa86yC2WVheWGPpixg'},
    {src: 'https://arweave.net/Yjn-nuWnEv8IgiFsw1LPKq1xjfa86yC2WVheWGPpixg'},
    {src: 'https://arweave.net/Yjn-nuWnEv8IgiFsw1LPKq1xjfa86yC2WVheWGPpixg'},
    {src: 'https://arweave.net/Yjn-nuWnEv8IgiFsw1LPKq1xjfa86yC2WVheWGPpixg'},
    {src: 'https://arweave.net/Yjn-nuWnEv8IgiFsw1LPKq1xjfa86yC2WVheWGPpixg'},
    {src: 'https://arweave.net/Yjn-nuWnEv8IgiFsw1LPKq1xjfa86yC2WVheWGPpixg'},
    {src: 'https://arweave.net/Yjn-nuWnEv8IgiFsw1LPKq1xjfa86yC2WVheWGPpixg'},
    {src: 'https://arweave.net/Yjn-nuWnEv8IgiFsw1LPKq1xjfa86yC2WVheWGPpixg'},
    {src: 'https://arweave.net/Yjn-nuWnEv8IgiFsw1LPKq1xjfa86yC2WVheWGPpixg'}
]

export default class NavBreadCrumb extends Component {
  render() {
    var settings = {
        dots: false,
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "-3px",
        // slidesToShow: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true,
        slidesToScroll: 4,
        initialSlide: 0,
    };
    return (
      <div className="">
        <Slider {...settings}>
            <div className="py-2 text-center">
                <span className="bg-yellow-100 border border-yellow-600 rounded-full px-3 py-2">featured nft</span>
                <span className="bg-yellow-100 border border-yellow-600 rounded-full px-3 py-2">nfts of the week</span>
                <span className="bg-yellow-100 border border-yellow-600 rounded-full px-3 py-2">jump to</span>
            </div>
        </Slider>
      </div>
    );
  }
}

