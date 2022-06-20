import React, { Component } from "react";
import Slider from "react-slick";

export default class NavBreadCrumb extends Component {
  render() {
    var settings = {
        dots: false,
        className: "center",
        infinite: true,
        centerPadding: "-3px",
        // slidesToShow: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true,
        slidesToScroll: 1,
        initialSlide: 0,
    };
    return (
      <div className="block lg:hidden">
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

