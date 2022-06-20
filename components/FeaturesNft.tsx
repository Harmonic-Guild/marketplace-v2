import React, { Component } from "react";
import Slider from "react-slick";
import { BsStars } from "react-icons/bs";

import Vector from '../icons/Vector.svg'

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

// function SampleNextArrow(props: any) {
//     const { className, style, onClick } = props;
//     return (
//       <div
//         className={className}
//         style={{ ...style, display: "block", background: "red" }}
//         onClick={onClick}
//       />
//     );
// }

// function SamplePrevArrow(props: any) {
//     const { className, style, onClick } = props;
//     return (
//       <div
//         className={className}
//         style={{ ...style, display: "block", background: "green" }}
//         onClick={onClick}
//       />
//     );
//   }

export default class FeaturesNft extends Component {
  render() {
    var settings = {
      dots: false,
      className: "center",
      infinite: true,
      centerPadding: "8px",
      slidesToShow: 3,
      autoplay: true,
      autoplaySpeed: 2000,
      pauseOnHover: true,
      slidesToScroll: 1,
      initialSlide: 0,
    //   nextArrow: <SampleNextArrow />,
    //   prevArrow: <SamplePrevArrow />,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };
    return (
      <div className="w-full h-fit pt-10 lg:px-32 px-12 ">
        <div className=" text-center  font-bold text-gray-900 mb-6">
        <p className='text-mp-orange-1 mb-2'>Lorem <Vector className='inline'></Vector></p>
          <h2 className="text-mp-dark-2 text-4xl font-semibold mb-2"> Featured NFTs </h2>
          <p className="lg:text-2xl text-lg text-mp-dark-2">New arivals</p>
        </div>
        <Slider {...settings}>
          {/* <div> */}
            {image.map((image, index) => (
              <img key={index} src={image.src} alt="" className="px-2 rounded-3xl"/>
            ))}
          {/* </div>           */}
        </Slider>
      </div>
    );
  }
}

