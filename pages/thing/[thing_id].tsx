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
import moment from 'moment'

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
      txId
      minter
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

  const [things, setThing] = useState<any>(null)
  const [tokens, setTokens] = useState<any>([])
  const [bid, setBid] = useState('0')
  const [allTokens, setAllTokens] = useState<any>([])
  const { wallet } = useWallet();
  const [hide, setHide] = useState(false)

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

  const buy = () => {
    if (things?.tokens[0]?.lists[0]?.autotransfer) {
      wallet?.makeOffer(things?.tokens[0]?.id, tokenPrice, { marketAddress: process.env.NEXT_PUBLIC_marketAddress })
    }
    else {
      wallet?.makeOffer(things?.tokens[0]?.id, parseNearAmount(bid)!.toString(), { marketAddress: process.env.NEXT_PUBLIC_marketAddress })
  }
  }
  // console.log(wallet);
  

  const tokenPriceNumber = Number(things?.tokens[0]?.lists[0]?.price)
  const price = things?.tokens[0]?.lists[0] &&  formatNearAmount((tokenPriceNumber).toLocaleString('fullwide', { useGrouping: false }), 2)
  const tokenPrice = (tokenPriceNumber).toLocaleString('fullwide', { useGrouping: false })

  var currentBid;
  if (things?.tokens[0]?.lists[0]?.offer == null) {
    currentBid = '0'
  }
  else {
    currentBid = formatNearAmount((Number(things?.tokens[0]?.lists[0]?.offer?.price)).toLocaleString('fullwide', { useGrouping: false }), 5)
  }

  return (
    <div className={`min-h-screen p-4 text-gray-700`}>
      <div className="lg:flex hidden"><Vector_back /></div>
      <div className="lg:flex block justify-evenly w-4/5 lg:w-full mx-auto">
        <div className="pl-0 xl:pl-12 mx-auto w-full xl:w-4/5">
          {things?.metadata.animation_hash ? (
            <video controls className='' poster={things?.metadata.media} controlsList="nodownload" muted>
              <source src={things?.metadata.animation_url} ></source>
            </video>
          ) : (
            <div className=" w-full xl:w-4/5">
              {things?.metadata.media &&
                <div className="">
                  <Image
                    src={things?.metadata.media}
                    objectFit="cover"
                    className="rounded-lg shadow-xl"
                    width={600}
                    height={600}
                    // layout="fill"
                    alt={'alt'} />
                </div>
              }
            </div>
          )}
        </div>
        <div className='flex lg:hidden gap-5 justify-end py-4'>
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
        </div>
        <div className="w-full lg:w-1/2">
          <div className="w-full container">
            <span className="lg:text-4xl text-xl font-medium ">{things?.metadata.title}</span>
          </div>
          <div className="flex w-3/4 py-4">
            <span>Minted on: {moment(things?.tokens[0].lists[0].createdAt).format('MMM DD, YYYY')}</span>
            <TbExternalLink className="text-yellow-300 w-6 h-6" />
          </div>
          {/* <div className="timer pb-4">ongoing : 16:32:24 hrs</div> */}
          <div className="">
            <div className="w-2/3">
              <span className="text">Discription</span>
              <span className="border-b border-mp-brown-1 flex"></span>
              <p className={hide ? 'pt-2 h-24 overflow-y-scroll ' : 'pt-2 h-16 overflow-y-scroll truncate'}>
                <span>{things?.metadata.description}</span>
              </p>
              <span id='span' onClick={toggleDiscription} className='cursor-pointer p-2 text-blue-500 hover:underline'> {!hide ? '.....see more' : 'see less'}</span>
              {/* <span className="border-b border-yellow-600 py-2 w-full px-44"></span> */}
            </div>
            <div className="lg:hidden block w-2/3">
              {/* <span className="border-b border-yellow-600 py-2 px-44"></span> */}
              <div className="flex my-6">
                <span className="mx-2">
                  <a href={`https://explorer.testnet.near.org/transactions/${things?.tokens[0].txId}`}  target="_blank" rel="noreferrer" >
                    <BsCircle className="relative h-8 w-8 text-yellow-300" />
                    <Near className='w-4 h-4 absolute -mt-6 ml-2' />
                  </a>
                </span>
                <span>
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
                  <span className="font-medium text-xl pr-1">History of NFT</span>
                </p>
                <span className=" border-r-2 border-yellow-600 h-20"></span>
              </div>
            </div>
          </div>
          <div>
            {things?.tokens[0]?.lists[0]?.autotransfer && 
              <PurchaseNft buy ={buy} price={price}/>
            }
            {/* {bid} */}
            {!things?.tokens[0]?.lists[0]?.autotransfer && 
            <div>
              <MakeOffer buy ={buy} price={price}/>
            </div>
            }
          </div>
          <div className="hidden lg:flex justify-around mt-5 w-3/5 ml-20">
            <div>
              <p className="flex">
                <span className="font-medium text-xl pr-1">History of NFT</span>
              </p>
            </div>
            <span className=" border-r-2 border-yellow-600 h-20"></span>
            <div>
              <div className="flex justify-evenly w-full">
                <p className="text">Details</p>
                {console.log(things, 'banana')
                }
                <span className="border-b px-8 border-yellow-600 mb-4 mx-2"></span>
                <div className="mx-2">
                  <a href={`https://explorer.testnet.near.org/transactions/${things?.tokens[0].txId}`}  target="_blank" rel="noreferrer" >
                    <BsCircle className="relative h-8 w-8 text-yellow-300" />
                    <Near className='w-4 h-4 absolute -mt-6 ml-2' />
                  </a>
                </div>
                <div>
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
