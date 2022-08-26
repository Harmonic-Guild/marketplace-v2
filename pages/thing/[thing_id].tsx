import React, { useEffect, useState } from "react";
import { useWallet } from '../../services/providers/MintbaseWalletContext';
import { TbExternalLink } from 'react-icons/tb';
import { FiLayers } from "react-icons/fi";
import { BsCircle, BsHeart } from "react-icons/bs";
import { BiShareAlt } from "react-icons/bi";
import { AiOutlineExpandAlt } from "react-icons/ai";
// import SimilarNft from "../../components/SimilarNft";
import Vector_back from '../../icons/Vector_back.svg'
import { gql } from "apollo-boost";
import { useLazyQuery } from "@apollo/client";
import Image from "next/image";
import { formatNearAmount, parseNearAmount } from "near-api-js/lib/utils/format";
import MakeOffer from "../../Modal/MakeOffer";
import PurchaseNft from "../../Modal/PurchaseNft";
import Near from '../../icons/near.svg'

const FETCH_TOKENS = gql`
query MyQuery($thing_id: String!) {
  thing(where: {id: {_eq: $thing_id}}) {
    id
    tokens(distinct_on: id, where: {list: {removedAt: {_is_null: true}}}) {
      id
      lists(order_by: {createdAt: desc}, limit: 1) {
        price
        autotransfer
        offer {
          price
        }
        createdAt
        tokenKey
      }
      txId
      minter
    }
    allTokens: tokens(distinct_on: id) {
      id
      # txId
      # minter
    }
    storeId
    store {
      name
      owner
    }
    metadata {
      animation_type
      animation_url
      media
      title
      description
      external_url
      category
      tags
      youtube_url
    }
  }
}
`

const thing_id = ({ thing_id }: { thing_id: string }) => {
   interface Thing {
    id: string;
    tokens: [Tokens?]
    allTokens: [id:string]
    storeId: string
    store :{
      name: string
      owner: string
    }
    metadata: MetaData
    
   }

   interface Tokens {
    id: string
    lists: [List?]
    createdAt: string|number
    tokenKey: string|number
    txId:string
    minter:string
   }

   interface List {
    price: number
    autotransfer: boolean
    offer: {
      price:number
    }
    createdAt: string| number
  }
    interface MetaData   {
      animation_type: string
      animation_url: string
      media: string
      title: string
      description: string
      external_url: string
      category: string
      tags: any
      youtube_url: string
    }

  const [things, setThing] = useState<Thing|null>(null)
  const [tokens, setTokens] = useState<[Tokens?]>([])
  const [allTokens, setAllTokens] = useState<[id?:string]>([])
  const { wallet, isConnected } = useWallet();
  const [hide, setHide] = useState<Boolean>(false)

  const [getTokens, { loading: loadingTokensData, data: tokensData, fetchMore }] =
    useLazyQuery(FETCH_TOKENS, {
      variables: {
        thing_id: ''
      },
    })
  useEffect(() => {

    getTokens({
      variables: {
        thing_id
      },
    })
  }, [])
  useEffect(() => {

    if (!tokensData) return;
    setThing(tokensData.thing[0])

    const tokens = tokensData.thing[0].tokens.map((token: any) => {
      return token
    })
    const allTokens = tokensData.thing[0].allTokens.map((token: any) => {
      return token
    })
    setTokens(tokens)
    setAllTokens(allTokens)

  }, [tokensData])

  const toggleDiscription = () => {
    setHide(!hide)
  }

  const buy = (bid: number) => {
    const token_Id = things?.tokens[0]?.id!
    

    if (things?.tokens[0]?.lists[0]?.autotransfer) {
      wallet?.makeOffer(token_Id, tokenPrice)
    }
    else {
      wallet?.makeOffer(
        token_Id,
         parseNearAmount(bid.toString())!.toString(),
         )
  }

  }
  // console.log(wallet);
  

  const tokenPriceNumber = Number(things?.tokens[0]?.lists[0]?.price)
  const price = things?.tokens[0]?.lists[0] &&  formatNearAmount((tokenPriceNumber).toLocaleString('fullwide', { useGrouping: false }), 2)
  const tokenPrice = (tokenPriceNumber).toLocaleString('fullwide', { useGrouping: false })

  let currentBid;
  if (things?.tokens[0]?.lists[0]?.offer == null) {
    currentBid = '0'
  }
  else {
    currentBid = formatNearAmount((Number(things?.tokens[0]?.lists[0]?.offer?.price)).toLocaleString('fullwide', { useGrouping: false }), 5)
  }

  return (
    <>
    <div className="container mx-auto mt-10 lg:mt-20 text-gray-700">

        <div

          className="flex flex-wrap lg:m-0 lg:flex-nowrap lg:gap-10 items-center justify-center lg:justify-start lg:items-start"
        >
          {/* Image */}



          {/* Image */}

          {/* Right Box */}
          <div className="flex flex-col lg:w-3/5 mx-8">
            <div className="flex justify-between lg:items-center">
            </div>
            <div className="text-lg">
            </div>
             
             

            {/* HISTORY OF NFT */}
            <div className="mt-12 lg:flex lg:gap-5 lg:justify-between">
              <div className="lg:w-2/5 bg-yellow-100 rounded-lg p-5 mb-10">
                <p className="text-xl pr-1 text-2xl font-bold text-center lg:text-left">
                  History of NFT mine
                </p>
                {/* <TbExternalLink className="text-yellow-300 w-5 h-5"/> */}
              </div>
              <div className="">
                <div className="flex items-center justify-between mb-8 gap-3">
                  <p className="text-2xl font-bold">Details</p>
                  <span className="border-b px-12 lg:px-20 border-yellow-600 mx-2" />
                  <div className="border-2 border-yellow-400 rounded-full p-2">
                    <Near className="w-4 h-4" />
                  </div>
                  <div className="border-2 border-yellow-400 rounded-full p-2">
                    <FiLayers className="w-4 h-4" />
                  </div>
                </div>
                <div className="lg:flex lg:items-center gap-10">
                  <p className="text-2xl font-bold mb-5 pb-5 border-b border-yellow-400 lg:border-0">
                    Perks
                  </p>
                  <span className="text-lg">
                    <li>First Perk</li>
                    <li>Second Perk</li>
                    <li>Exclusive access to comunity</li>
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* Right Box */}
        </div>
      ))}
    </div>
    
    <div className="min-h-screen p-4 text-gray-700">
      <div className="lg:flex hidden"><Vector_back /></div>
      <div className="lg:flex block justify-evenly w-4/5 lg:w-full mx-auto">
        <div className="pl-0 xl:pl-12 mx-auto w-full xl:w-4/5">
          {(things?.metadata.animation_type !== null && things?.metadata.animation_type !== 'image/jpeg' && things?.metadata.animation_type !== 'image/png'&& things?.metadata.animation_type !== 'image/gif' ) ? (
            <div className="w-full xl:w-4/5 mx-auto flex align-middle">
              <video controls className='' poster={things?.metadata.media} controlsList="nodownload" muted>
                <source src={things?.metadata.animation_url} ></source>
              </video>
            </div>
          ) : (

            <div className=" w-full xl:w-4/5 mx-auto">
            {things?.metadata.media &&
              <div className="">
                <Image
                  src={things?.metadata.media}
                  objectFit="cover"
                  className="w-4/5 lg:w-2/5 rounded-lg shadow-xl"
                  width={600}
                  height={600}
                  // layout="fill"
                  alt={'alt'} />
              </div>
            }
            </div>
          )}
        </div>
        {/* <div className='flex lg:hidden gap-5 justify-end py-4'>
          <div className=' text-yellow-300 sm:hidden block'>
            <BsCircle className="relative h-8 w-8" />
            <BsHeart className="w-4 h-4 absolute -mt-6 ml-2" />
          </div>
          <div className=' text-yellow-300'>
            <BsCircle className="relative h-8 w-8" />
            <BiShareAlt className='w-4 h-4 absolute -mt-6 ml-2' />
          </div>
          <div className=' text-yellow-300'>
            <BsCircle className="relative h-8 w-8" />
            <AiOutlineExpandAlt className="w-4 h-4 absolute -mt-6 ml-2" />
          </div>
        </div> */}
        <div className="w-full">
          
          <div  className="text-4xl font-bold my-5">
            {things?.metadata.title}
          </div>

          <div className="flex text-lg">
            {/* <span>Minted on: {moment(things?.tokens[0]?.lists[0]?.createdAt).format('MMM DD, YYYY')}</span> */}
            {`Minted On: ` + new Date(things?.tokens[0]?.lists[0]?.createdAt!).toDateString()}
            <TbExternalLink className="text-yellow-300 w-6 h-6" />
          </div>
          {/* <div className="timer pb-4">ongoing : 16:32:24 hrs</div> */}
          <div className="">
            <div className="mt-10">
              <div className="border-b border-yellow-600 mb-3 pb-3">
                <span className="text-3xl font-medium">Description</span>
              </div>

              <p className={hide ? "" : "line-clamp-3"}>
                {things?.metadata.description} Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic.
              </p>
              <span id='span' onClick={toggleDiscription} className='cursor-pointer text-blue-400 hover:underline'> {!hide ? '.....see more' : 'see less'}</span>
              {/* <span className="border-b border-yellow-600 py-2 w-full px-44"></span> */}
            </div>

          {/* History of NFT NEW */}
            <div className="mt-12 lg:flex lg:gap-5 lg:justify-between">
              <div className="lg:w-2/5 bg-yellow-100 rounded-lg p-5 mb-10">
                <p className="text-xl pr-1 text-2xl font-bold text-center lg:text-left">
                  History of NFT mine
                </p>
                {/* <TbExternalLink className="text-yellow-300 w-5 h-5"/> */}
              </div>
              <div className="">
                <div className="flex items-center justify-between mb-8 gap-3">
                  <p className="text-2xl font-bold">Details</p>
                  <span className="border-b px-12 lg:px-20 border-yellow-600 mx-2" />
                  <div className="border-2 border-yellow-400 rounded-full p-2">
                  <a href={`https://explorer.testnet.near.org/transactions/${things?.tokens[0]?.txId}`}  target="_blank" rel="noreferrer" >
                    <Near className="w-4 h-4" />
                  </a>
                  </div>
                  <div className="border-2 border-yellow-400 rounded-full p-2">
                  <a href={`https://viewblock.io/arweave/tx/${thing_id.split(":")[0]}`}  target="_blank" rel="noreferrer" >
                    <FiLayers className="w-4 h-4" />
                  </a>
                  </div>
                </div>

                <div>
                  <p className="lg:hidden text-center text-gray-500 text-lg">{tokens.length}/{allTokens.length} Tokens available</p>
                </div>
                
                <div className="lg:flex lg:items-center gap-10">
                  <p className="text-2xl font-bold mb-5 pb-5 border-b border-yellow-400 lg:border-0">
                    Perks
                  </p>
                  <span className="text-lg">
                    <li>First Perk</li>
                    <li>Second Perk</li>
                    <li>Exclusive access to comunity</li>
                  </span>
                </div>
              </div>
            </div>
          {/* History of NFT NEW */}
<hr/>
            <div className="lg:hidden block w-2/3">
              <span className="border-b border-yellow-600 py-2 px-44"></span>
              <div className="flex my-6">
                <span className="mx-2 cursor-pointer">
                  <a href={`https://explorer.testnet.near.org/transactions/${things?.tokens[0]?.txId}`}  target="_blank" rel="noreferrer" >
                    <BsCircle className="relative h-8 w-8 text-yellow-300" />
                    <Near className='w-4 h-4 absolute -mt-6 ml-2' />
                  </a>
                </span>
                <span className="cursor-pointer">
                  <a href={`https://viewblock.io/arweave/tx/${thing_id.split(":")[0]}`}  target="_blank" rel="noreferrer" >
                    <BsCircle className="relative h-8 w-8 text-yellow-300" />
                    <FiLayers className="w-4 h-4 absolute -mt-6 ml-2" />
                  </a>
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="w-full py-2 font-medium text-xl mt-3">Perks</span>
                <span></span>
              </div>
              <span className="border-b border-mp-brown-1 flex"></span>
              <div className=" mt-6 px-4">
                <span className="text-sm ">
                  <li>First Perk</li>
                  <li>Second Perk</li>
                  <li>Exclusive access to comunity</li>
                </span>
              </div>
              <div className="px-8 py-4">
                <p className="flex">
                  <span className="font-medium text-xl pr-1">History of NFT MOB</span>
                </p>
                <span className=" border-r-2 border-yellow-600 h-20"></span>
              </div>
            </div>
          </div>
          <div>
            {things?.tokens[0]?.lists[0]?.autotransfer ?
            (
              <PurchaseNft buy ={buy} price={price!} isConnected={isConnected}/> 
            ): (

              <MakeOffer buy ={buy} isConnected={isConnected} latestBid={tokens[0]?.lists[0]?.offer?.price}/> 
            )
              

            }
            
          </div>
          {/* MOVE THIS ABOVE */}
            <div className="border border-yellow-600 bg-yellow-100 rounded-lg p-6 mt-8 lg:flex lg:gap-10">
              <div className="flex flex-col justify-center items-center">
                <div className="flex items-center gap-2">
                  <img
                    className="inline-block h-10 w-10 rounded-full"
                    src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                  <span className="font-bold text-lg">@Latest bidder</span>
                </div>
                <div className="flex flex-row gap-2 mt-3 mb-3 lg:mb-0">
                  <span className="font-medium text-lg">Latest bid: </span>
                  <span className="font-bold text-xl flex items-center gap-2">
                    0.25 <Near />
                  </span>
                </div>
              </div>
              {/* left side of box */}
              <div className="flex flex-col flex-grow">
              {/* Button */}
                <span className="bg-gradient-to-r from-actionBtn-Yellow-1 to-actionBtn-Orange-1 tracking-wider	text-center font-bold text-lg bg-yellow-400 py-2 rounded-md text-gray-900">
                  Make an offer
                </span>
              {/* Button */}
                <div className="text-center flex justify-center items-center mt-3">
                  <p className="font-bold">Owned by:</p>
                  <img
                    className="h-5 w-5 rounded-full mx-2"
                    src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                  <span>@owner</span>
                </div>
              </div>
            </div>
          {/* MOVE THIS ABOVE */}



          <div className="hidden lg:flex justify-around mt-5 w-3/5 ml-20">
            <div>
              <p className="flex">
                <span className="font-medium text-xl pr-1">History of NFT LG</span>
              </p>
            </div>
            <span className=" border-r-2 border-yellow-600 h-20"></span>
            <div>
              <div className="flex justify-evenly w-full">
                <p className="text">Details</p>
                <span className="border-b px-8 border-yellow-600 mb-4 mx-2"></span>
                <div className="mx-2 cursor-pointer">
                  <a href={`https://explorer.testnet.near.org/transactions/${things?.tokens[0]?.txId}`}  target="_blank" rel="noreferrer" >
                    <BsCircle className="relative h-8 w-8 text-yellow-300" />
                    <Near className='w-4 h-4 absolute -mt-6 ml-2' />
                  </a>
                </div>
                <div className="cursor-pointer">
                  <a href={`https://viewblock.io/arweave/tx/${thing_id.split(":")[0]}`}  target="_blank" rel="noreferrer" >
                    <BsCircle className="relative h-8 w-8 text-yellow-300" />
                    <FiLayers className="w-4 h-4 absolute -mt-6 ml-2" />
                  </a>
                </div>
              </div>
              <div className="flex justify-evenly mt-3">
                <p className="font-medium text-xl px-6 mt-3">Perks</p>
                <span className="text-sm ">
                  <li>First Perk</li>
                  <li>Second Perk</li>
                  <li>Exclusive access to comunity</li>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <SimilarNft /> */}
    </div>
  </>
  )
}
export default thing_id;

export function getServerSideProps({ query }: any) {
  const thing_id = query.thing_id
  return {
    props: {
      thing_id
    }
  }

}
