import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Vector from '../icons/Vector.svg';
import Vector_right from '../icons/Vector_right.svg';
import Vector_left from '../icons/Vector_left.svg';

import { gql } from "apollo-boost";
import { useLazyQuery } from "@apollo/client";
import Image from "next/image";

const FETCH_WEEKLY = gql`
query MyQuery($storeId: String!) {
  token(where: {storeId: {_eq: $storeId}, burnedAt: {_is_null: true}}, limit: 5, distinct_on: thingId, order_by: {thingId: asc}) {
    id
    thing {
      id
      metaId
      metadata{
        media
        media_type
        animation_url
        animation_type
        title
      }
    }
  }
}
`


const FeaturesNft = ({storeId}: {storeId: string}) => {

  interface Token {
    id: string;
    thing: {
      id: string;
      metaId: string;
      metadata: {
        media: string 
      }
    }
  }

  const [tokens, setTokens] = useState<[]>([])
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

    const [getTokens, { loading: loadingtokensData, data: tokensData }] =
     useLazyQuery(FETCH_WEEKLY, {
       variables: {
         storeId: ''
       },
     })

     useEffect(() => {
      getTokens({
        variables: {
          storeId,
        },
      })
      
    }, []);

    useEffect(() => {
      
      if (!tokensData) return
  
      if (tokensData?.token.length === 0) return;
  
      const weeklyTokens = tokensData.token.map((token: Token) => token)

      setTokens(weeklyTokens);     
      
      // console.log(tokens);
      
      
    }, [tokensData])
    return (
      <div className="w-full h-fit pt-10 lg:px-32 px-12 ">
        <div className=" text-center  font-bold text-gray-900 mb-6">
        <p className='text-mp-orange-1 mb-2'>Lorem <Vector className='inline'></Vector></p>
          <h2 className="text-mp-dark-2 text-4xl font-semibold mb-2"> Featured NFTs </h2>
          <p className="lg:text-2xl text-lg text-mp-dark-2">New arivals</p>
        </div>
        <Slider {...settings}>
            {tokens.map((token: Token, index) => (
              <div className={index === slideIndex ? 'slide:active' : 'slide'} key={index}>
                <div className="h-96 w-fit rounded-xl shadow-lg relative overflow-hidden">
                        <Image
                          src={token.thing.metadata.media} 
                          alt=""
                          objectFit="cover"
                          layout="fill"
                        />
                      </div>
              </div>
            ))}
        </Slider>
      </div>
    );
}

export default FeaturesNft

