import React, { Component, useState } from "react";
import Slider from "react-slick";
import Vector from '../icons/Vector.svg';
import Vector_right from '../icons/Vector_right.svg';
import Vector_left from '../icons/Vector_left.svg';

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

// function SampleNextArrow({onClick}) {
//   return (
//     <div className="arrow arrow-right" onClick={onClick}>
//       <Vector_right/>
//     </div>
//   );
// }

// function SamplePrevArrow({onClick}) {
//   return (
//     <div className="arrow arrow-left" onClick={onClick}>
//       <Vector_left/>
//     </div>
//   );
// }
const FeaturesNft = () => {

  const [slideIndex, setSlideIndex] = useState(0)

  // render() {
    const settings = {
      dots: true,
      className: "center",
      infinite: true,
      centerPadding: "8px",
      centerMode: true,
      slidesToShow: 3,
      autoplay: true,
      autoplaySpeed: 2000,
      pauseOnHover: true,
      slidesToScroll: 1,
      initialSlide: 0,
      beforeChange: (current:any, next:any) => setSlideIndex(next),
      // nextArrow: <SampleNextArrow/>,
      // prevArrow: <SamplePrevArrow/>,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 800,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            initialSlide: 3
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
            {image.map((image, index) => (
              <div key={index} className={index === slideIndex ? 'slide:active' : 'slide'}>
                <img key={index} src={image.src} alt="" className="px-2 rounded-2xl"/>
              </div>
            ))}
        </Slider>
      </div>
    );
}

export default FeaturesNft

