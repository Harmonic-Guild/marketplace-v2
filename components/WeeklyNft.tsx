import React, { Component, useEffect, useState } from "react";
import Slider from "react-slick";
import Right from '../icons/right.svg';
import Share from '../icons/share.svg'
import Near from '../icons/near.svg'


import Vector from '../icons/Vector.svg'
import { BiArrowFromLeft, BiArrowFromRight } from "react-icons/bi";
import { gql } from "apollo-boost";
import { useLazyQuery } from "@apollo/client";
import Image from 'next/image';

const FETCH_WEEKLY = gql`
query MyQuery($storeId: String!) {
  token(where: {storeId: {_eq: $storeId}, burnedAt: {_is_null: true}}, limit: 5, distinct_on: thingId, order_by: {thingId: desc}) {
    id
    thing {
      id
      metaId
      metadata {
        media
      }
    }
  }
}
`


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

 const  WeeklyNft = () => {

  const [tokens, setTokens] = useState<[]>([])

    const settings = {
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

    const [getTokens, { loading: loadingtokensData, data: tokensData }] =
     useLazyQuery(FETCH_WEEKLY, {
       variables: {
         storeId: ''
       },
     })

     useEffect(() => {
      getTokens({
        variables: {
          storeId: process.env.NEXT_PUBLIC_STOREID!,
        },
      })
    }, []);

    useEffect(() => {
      // console.log(storeData);
      
      if (!tokensData) return
  
      if (tokensData?.token.length === 0) return;
  
      const weeklyTokens = tokensData.token.map((token: {}) => token)

      setTokens(weeklyTokens);     
      
      console.log(tokens);
      
      
    }, [tokensData])

    return (
      <div className="w-full h-full pt-10 lg:px-32 px-12 ">
        <div className=" text-center  font-bold text-gray-900 mb-4">
        <p className='text-mp-orange-1 mb-2'>Lorem <Vector className='inline'></Vector></p>
            <h2 className="text-mp-dark-2 text-4xl font-bold">NFTs of the week </h2>
        </div>
        <Slider {...settings}>
            {tokens.map((token:any) => (
                <div key={token.id} className="p-2 ">
                    <div className="rounded-2xl p-2 border border-yellow-600">
                      <div className="h-64 w-fit rounded-lg shadow-xl relative overflow-hidden">
                        <Image
                          src={token.thing.metadata.media} 
                          alt=""
                          objectFit="cover"
                          layout="fill"
                        />
                      </div>
                        <div className="text-sm py-2 text-mp-dark-3 relative">
                          <div className="timer">16:12:56 hrs</div>
                          <div className="font-semibold my-3 py-1">Buster Character Color</div>
                          <div className="flex my-0 py-1 justify-between">
                              <p className='flex'>Last Bid: 0.25 <span className='mt-[.15rem] ml-1'><Near></Near></span></p>
                              <div className="flex relative">
                                  <div className='bg-red-700 rounded-full h-7 w-7 absolute right-12 p-1 text-white'>MZ</div>
                                  <div className='bg-blue-700 rounded-full h-7 w-7 absolute right-7 text-white p-1'>RR</div>
                                  <div className='bg-green-700 rounded-full h-7 w-7 absolute right-2 text-white p-1'>SM</div>
                              </div>
                          </div>
                          <div className="flex mt-2 pt-1 justify-between px-2">
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

export default WeeklyNft;

