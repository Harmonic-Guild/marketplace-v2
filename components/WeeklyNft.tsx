import React, { useEffect, useState } from "react";
import { gql } from "apollo-boost";
import { useLazyQuery } from "@apollo/client";
import { GiStarShuriken } from "react-icons/gi";
import NFT from "./NFT";

const FETCH_WEEKLY = gql`
query MyQuery($storeId: String!) {
  token(where: {storeId: {_eq: $storeId}, list: {price: {_is_null: false}}, burnedAt: {_is_null: true}}, limit: 4, distinct_on: thingId, order_by: {thingId: desc}) {
    id
    lists(
      order_by: {createdAt: desc}, limit: 1
    ){
      price
      autotransfer
      offer{
        price
        timeout
      }
    }
    txId
    thingId
    thing {
      id
      metaId
      metadata{
        title
        media
        media_type
        animation_url
        animation_type
      }
    }
  }
}
`



 const  WeeklyNft = ({storeId}: {storeId: string}) => {

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
          storeId,
        },
      })
    }, []);

    useEffect(() => {
      // console.log(storeData);
      
      if (!tokensData) return
  
      if (tokensData?.token.length === 0) return;
  
      const weeklyTokens = tokensData.token.map((token: any) => token)

      setTokens(weeklyTokens);    

      console.log(tokensData, '*/*//*/*//+896');
      
      
    }, [tokensData])

    return (
      <div className="w-full h-full pt-10 lg:px-32 px-12 ">
        <div className=" text-center  font-bold text-gray-900 mb-4">
        <p className='text-mp-orange-1 mb-2'><GiStarShuriken className='inline w-6 h-5'/></p>
            <h2 className="text-mp-dark-2 text-4xl font-bold">NFTs of the week </h2>
        </div>
        <div className="grid md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 w-full pt-4 gap-y-5 gap-2">
            {tokens.map((token:any) => (
                <NFT token={token} key={token.id} />
            ))}
        </div>
      </div>
    );
  }

export default WeeklyNft;

