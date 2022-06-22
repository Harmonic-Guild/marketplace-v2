import React, { Component } from "react";
import Slider from "react-slick";
import Right from '../icons/right.svg';
import Share from '../icons/share.svg'
import Near from '../icons/near.svg'


import Vector from '../icons/Vector.svg'
import { BiArrowFromLeft, BiArrowFromRight } from "react-icons/bi";

const image = [
    {src: 'https://arweave.net/Yjn-nuWnEv8IgiFsw1LPKq1xjfa86yC2WVheWGPpixg', title: 'Buster character color'},
    {src: 'https://arweave.net/Yjn-nuWnEv8IgiFsw1LPKq1xjfa86yC2WVheWGPpixg', title: 'Buster character color'},
    {src: 'https://arweave.net/Yjn-nuWnEv8IgiFsw1LPKq1xjfa86yC2WVheWGPpixg', title: 'Buster character color'},
    {src: 'https://arweave.net/Yjn-nuWnEv8IgiFsw1LPKq1xjfa86yC2WVheWGPpixg', title: 'Buster character color'},
    {src: 'https://arweave.net/Yjn-nuWnEv8IgiFsw1LPKq1xjfa86yC2WVheWGPpixg', title: 'Buster character color'},
    {src: 'https://arweave.net/Yjn-nuWnEv8IgiFsw1LPKq1xjfa86yC2WVheWGPpixg', title: 'Buster character color'},
    {src: 'https://arweave.net/Yjn-nuWnEv8IgiFsw1LPKq1xjfa86yC2WVheWGPpixg', title: 'Buster character color'},
    {src: 'https://arweave.net/Yjn-nuWnEv8IgiFsw1LPKq1xjfa86yC2WVheWGPpixg', title: 'Buster character color'},
    {src: 'https://arweave.net/Yjn-nuWnEv8IgiFsw1LPKq1xjfa86yC2WVheWGPpixg', title: 'Buster character color'}
]

// function SampleNextArrow(props: any) {
//     const { className, style, onClick } = props;
//     return (
//       <div
//         className={className}
//         style={{ ...style, display: "block", background: "red" }}
//         onClick={onClick}
//       >
        
//       </div>
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

export default class WeeklyNft extends Component {
  render() {
    var settings = {
      dots: true,
      className: "center",
      infinite: true,
      centerPadding: "8px",
      slidesToShow: 4,
      speed: 700,
      slidesToScroll: 1,
      initialSlide: 0,
      // nextArrow: <SampleNextArrow />,
      // prevArrow: <SamplePrevArrow/>,
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
      <div className="w-full h-full pt-10 lg:px-32 px-12 ">
        <div className=" text-center  font-bold text-gray-900 mb-4">
        <p className='text-mp-orange-1 mb-2'>Lorem <Vector className='inline'></Vector></p>
            <h2 className="text-mp-dark-2 text-4xl font-bold">NFTs of the week </h2>
        </div>
        <Slider {...settings}>
            {image.map((image, index) => (
                <div key={index} className="p-2 ">
                    <div className="rounded-2xl p-2 border border-yellow-600">
                        <img src={image.src} alt="" className="px-2 rounded-2xl"/>
                        <div className="text-sm py-2 text-mp-dark-3 relative">
                          <div className="timer">16:12:56 hrs</div>
                          <div className="font-semibold my-1 py-1">Buster Character Color</div>
                          <div className="flex my-1 py-1 justify-between">
                              <p className='flex'>Last Bid: 0.25 <span className='mt-[.15rem] ml-1'><Near></Near></span></p>
                              <div className="flex relative">
                                  <div className='bg-red-700 rounded-full h-7 w-7 absolute right-12 p-1 text-white'>MZ</div>
                                  <div className='bg-blue-700 rounded-full h-7 w-7 absolute right-7 text-white p-1'>RR</div>
                                  <div className='bg-green-700 rounded-full h-7 w-7 absolute right-2 text-white p-1'>SM</div>
                              </div>
                          </div>
                          <div className="flex mt-4 pt-1 justify-between px-2">
                              <button className='flex action-btn'>Bid <span className='border-l border-black pl-2 ml-2'><Right></Right></span></button>
                              <button><Share></Share></button>
                          </div>
                        </div>
                    </div>
                </div>
            ))}
        </Slider>
      </div>
    );
  }
}

