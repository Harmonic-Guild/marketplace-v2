import React, { Component } from "react";
import Slider from "react-slick";
import { BsCircle, BsStars } from "react-icons/bs";
import { BiShareAlt } from "react-icons/bi";
import Link from "next/link";

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

export default class WeeklyNft extends Component {
  render() {
    var settings = {
      dots: false,
      className: "center",
      infinite: true,
      centerPadding: "1px",
      slidesToShow: 3,
      speed: 700,
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
      <div className="w-full h-full pt-10 lg:px-32 px-12 ">
        <div className=" text-center  font-bold text-gray-900 ">
            <h1 className="justify-center flex text-yellow-400">Lorem <BsStars className="w-6 h-6"/></h1>
            <h2 className="lg:text-3xl text-xl">NFTs of the week </h2>
        </div>
        <Slider {...settings}>
            {image.map((image, index) => (
                <div key={index} className="p-2 ">
                    <div className="rounded-3xl p-2 border border-yellow-600">
                        <img src={image.src} alt="" className="px-2 rounded-2xl"/>
                        <div className="px-2">
                            <p className="text-gray-900 font-bold lg:text-2xl text-sm">{image.title}</p>
                            <span className="lg:text-lg text-sm font-medium text-stone-900">starts in: </span>
                        </div>
                        <div className="flex justify-around">
                            <Link href="/thing_id" passHref>
                              <button className="bg-yellow-500 py-4 px-6 rounded-xl w-1/2 text-center text-gray-900 font-medium lg:text-lg text-xs">Buy</button>
                            </Link>
                            <div className=' text-yellow-300'>
                                <BsCircle className="relative lg:h-12 h-8 lg:w-12 w-9"/>
                                <BiShareAlt className='absolute lg:h-8 h-6 lg:w-8 w-6 lg:-mt-10 -mt-7 lg:ml-2 ml-1 '/>
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

