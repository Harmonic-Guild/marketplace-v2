import React, { Component } from "react";
import Slider from "react-slick";
import Right from '../icons/right.svg';
import Share from '../icons/share.svg'
import Near from '../icons/near.svg'


import Vector from '../icons/Vector.svg'

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

export default class SimilarNft extends Component {
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
        <h2 className="text-mp-dark-2 text-3xl text-left font-bold mb-4">Similar NFTs</h2>
        <Slider {...settings}>
            {image.map((image, index) => (
                <div key={index} className="p-2 ">
                    <div className="rounded-2xl p-2 border border-yellow-600">
                        <img src={image.src} alt="" className="px-2 rounded-2xl"/>
                        <div className="text-sm py-2 text-mp-dark-3 relative">
                        <div className="flex sm:hidden absolute text-white rounded-md px-2 py-1 -top-4 left-16">
                            <div className='bg-red-700 rounded-full h-7 w-7 absolute right-12 p-1 text-white'>MZ</div>
                            <div className='bg-blue-700 rounded-full h-7 w-7 absolute right-7 text-white p-1'>RR</div>
                            <div className='bg-green-700 rounded-full h-7 w-7 absolute right-2 text-white p-1'>SM</div>
                          </div>
                          <div className="timer sm:flex hidden">16:12:56 hrs</div>
                          <div className="font-semibold my-1 py-1">Buster Character Color</div>
                          <div className="flex my-1 py-1 justify-between">
                              <p className='flex'>Last Bid: 0.25 <span className='mt-[.15rem] ml-1'><Near></Near></span></p>
                              <div className="md:flex hidden relative">
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

