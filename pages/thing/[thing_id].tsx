import React, {  useEffect, useState } from "react";
import { useWallet } from '../../services/providers/MintbaseWalletContext';
import { TbExternalLink } from 'react-icons/tb';
import { FiLayers } from "react-icons/fi";
import SimilarNft from "../../components/SimilarNft";
import Vector_back from '../../icons/Vector_back.svg'
import { gql } from "apollo-boost";
import { Store, Thing } from "../../interfaces/wallet.interface";
import { useLazyQuery } from "@apollo/client";
import Image from "next/image";
import { BsCircle, BsHeart } from "react-icons/bs";
import { BiShareAlt } from "react-icons/bi";
import { AiOutlineExpandAlt } from "react-icons/ai";


const FETCH_TOKENS = gql`
query MyQuery ($thing_id: String!) {
    thing(where: {id: {_eq: $thing_id}}) {
      id
      tokens(distinct_on: id, where: {list: {removedAt: {_is_null: true}}}) {
        id
        lists (order_by: {createdAt: desc}, limit: 1){
          price
          autotransfer
          offer {
            price
          }
        }
        txId
      }
      allTokens: tokens(distinct_on: id) {
        id
      }
      storeId
      store{
        name
        }   
      metadata {
        animation_type
        animation_url
        media
        title
        description
        tags
        external_url
        category
      }
    }
  }`

const thing_id = ({ thing_id }: { thing_id: string }) =>  {
    
  const [things, setThing] = useState<Thing | null>(null)
  const [tokens, setTokens] = useState<any>([])
  const [allTokens, setAllTokens] = useState<any>([])
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
    // console.log(tokensData, '******************');
    
      if (!tokensData) return;
      setThing(tokensData.thing[0])
      
      const tokens = tokensData.thing[0].tokens.map((token: any)=> {
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

  return (
    <div className={`min-h-screen p-4 bg-white text-gray-700`}>
      <div className="lg:flex hidden"><Vector_back/></div>
      <div className="lg:flex block justify-evenly w-4/5 lg:w-full mx-auto">
        <div className="pl-0 xl:pl-12 mx-auto w-full xl:w-4/5">
          {things?.metadata.animation_hash ? (
              <video controls className='' poster={things?.metadata.media} controlsList="nodownload" muted>
                  <source src={things?.metadata.animation_url} ></source>
              </video>
            ) : (
              <div className=" w-full xl:w-4/5">
                { things?.metadata.media &&
                  <div className="">
                    <Image
                    src={things?.metadata.media}
                    objectFit="cover"
                    className="rounded-lg shadow-xl"
                    width={700}
                    height={700}
                    // layout="fill"
                    alt={'alt'} />
                  </div>
                }
              </div>
          )}
        </div>
        <div className='flex lg:hidden gap-5 justify-end py-4'>
          <div className=' text-yellow-300 sm:hidden block'>
            <BsCircle className="relative h-8 w-8"/>
            <BsHeart className="w-4 h-4 absolute -mt-6 ml-2"/>
          </div>
          <div className=' text-yellow-300'>
            <BsCircle className="relative h-8 w-8"/>
            <BiShareAlt className='w-4 h-4 absolute -mt-6 ml-2'/>
          </div>
          <div className=' text-yellow-300'>
            <BsCircle className="relative h-8 w-8"/>
            <AiOutlineExpandAlt className="w-4 h-4 absolute -mt-6 ml-2"/>
          </div>
        </div>
        <div className="w-full lg:w-1/2">
          <div className="w-full container">
            <span className="lg:text-4xl text-xl font-medium ">{things?.metadata.title}</span>
          </div>
          <div className="flex w-3/4 py-4">
            <span>Minted on: Jun-14-2022</span> 
            <TbExternalLink className="text-yellow-300 w-6 h-6"/>
          </div>
          {/* <div className="timer pb-4">ongoing : 16:32:24 hrs</div> */}
          <div className="">
            <div className="w-2/3">
              <span className="text">Discription</span>
              {/* <span className="border-b border-yellow-600 py-2 pb-2 z-10 px-40 lg:-ml-24 -ml-20"></span> */}
              <p className={hide ? 'pt-2 h-24 overflow-y-scroll ' : 'pt-2 h-16 overflow-y-scroll truncate'}>
                <span>{things?.metadata.description}</span>    
              </p>
              <span id='span' onClick={toggleDiscription} className='cursor-pointer p-2 text-blue-500 hover:underline'> {!hide ? '.....see more' : 'see less'}</span>
              {/* <span className="border-b border-yellow-600 py-2 w-full px-44"></span> */}
            </div>
            <div className="lg:hidden block">
              {/* <span className="border-b border-yellow-600 py-2 px-44"></span> */}
              <div className="flex my-6">
                <span className="mx-2">
                  <BsCircle className="relative h-8 w-8 text-gray-800"/>
                  <img src="https://marketplace.mintingmusic.com/images/near.png" alt="" className='w-4 h-4 absolute -mt-6 ml-2'/>
                </span>
                <span>
                  <BsCircle className="relative h-8 w-8 text-gray-800"/>
                  <FiLayers className="w-4 h-4 absolute -mt-6 ml-2"/>
                </span>
              </div>
              <span className="w-full border-b border-yellow-600 py-2 font-medium text-xl mt-3">Perks</span>
              {/* <span className="border-b border-yellow-600 py-2 px-44"></span> */}
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
          <div className={`lg:flex block justify-between border border-yellow-600 bg-yellow-100 rounded-lg lg:w-2/3 w-full p-6 mt-4`}>
            <div className="flex justify-between lg:block">
              <div className="flex">
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""/>
                <span className="pl-2">@Latest bidder</span>
              </div>
              <span className=" font-medium">Latest bid: </span>

            </div>
            <span className="border-b border-yellow-600 lg:hidden flex py-2 px-32"></span>
            <div className="mt-8 lg:mt-0">
              <span className="bg-yellow-400 py-4 rounded-md  font-medium text-gray-900 lg:w-1/2 w-full lg:px-3 px-16">Make an offer</span>
              <span className="text-center lg:flex block pt-4">
                  <p className=" font-medium">Owned by: </p> 
                  <img className="inline-block h-4 w-4 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""/>
                  <span>@owner</span>
              </span>
            </div>
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
                <span className="border-b px-8 border-yellow-600 mb-4 mx-2"></span>
                <div className="mx-2">
                  <BsCircle className="relative h-8 w-8 text-yellow-300"/>
                  <img src="https://marketplace.sevendeadstars.com/images/near.png" alt="" className='w-4 h-4 absolute -mt-6 ml-2'/>
                </div>
                <div>
                    <BsCircle className="relative h-8 w-8 text-yellow-300"/>
                    <FiLayers className="w-4 h-4 absolute -mt-6 ml-2"/>
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
      <SimilarNft/>     
    </div>
  )
}
export default thing_id;

export function getServerSideProps({query}: any){
  const thing_id = query.thing_id
  return {
      props: {
        thing_id
      }
  }
  
}
