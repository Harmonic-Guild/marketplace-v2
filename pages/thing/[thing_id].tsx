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
import Link from "next/link";

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
    <div className="container mx-auto mt-10 text-gray-700">
      <Link href='/explore' passHref>
        <div className="lg:flex hidden cursor-pointer"><Vector_back /></div>
      </Link>
      <div className="lg:flex justify-between w-4/5 lg:w-full mx-auto">
        <div className="mx-auto w-full">
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
        <div className='flex lg:hidden gap-5 justify-end py-4'>
          {/* <div className=' text-yellow-300 sm:hidden block'>
            <BsCircle className="relative h-8 w-8" />
            <BsHeart className="w-4 h-4 absolute -mt-6 ml-2" />
          </div>
          <div className=' text-yellow-300'>
            <BsCircle className="relative h-8 w-8" />
            <BiShareAlt className='w-4 h-4 absolute -mt-6 ml-2' />
          </div> */}
          <div className=' text-yellow-300'>
            <BsCircle className="relative h-8 w-8" />
            <AiOutlineExpandAlt className="w-4 h-4 absolute -mt-6 ml-2" />
          </div>
        </div>
        <div className="w-full">
          
          <div  className="text-4xl font-bold mb-5">
            {things?.metadata.title}
          </div>

          <div className="text-lg">
            {things?.tokens[0]?.lists[0]?.createdAt! === undefined ? `Mint date is not available` : <div className="flex gap-3">{`Minted On: ` + new Date(things?.tokens[0]?.lists[0]?.createdAt!).toDateString()} <TbExternalLink className="text-yellow-300 w-6 h-6" /></div>}
          </div>
          {/* <div className="timer pb-4">ongoing : 16:32:24 hrs</div> */}
          <div className="">
            <div className="mt-10">
              <div className="border-b border-yellow-600 mb-3 pb-3">
                <span className="text-3xl font-medium">Description</span>
              </div>

              <p className={hide ? "" : "line-clamp-3"}>
                {things?.metadata.description}
              </p>
              <span id='span' onClick={toggleDiscription} className='cursor-pointer text-blue-400 hover:underline'> {!hide ? '.....see more' : 'see less'}</span>
              {/* <span className="border-b border-yellow-600 py-2 w-full px-44"></span> */}
            </div>

              <div className="flex flex-col-reverse lg:flex-row mt-8 lg:gap-5 lg:justify-between">
                {/* <div className="lg:w-2/5 bg-yellow-100 rounded-lg p-5 my-10 lg:mt-0">
                  <p className="text-xl pr-1 text-2xl font-bold text-center lg:text-left">
                    History of NFT
                  </p>
                  {/* <TbExternalLink className="text-yellow-300 w-5 h-5"/>
                </div> */}
                <div className="">
                  <div className="flex items-center justify-between gap-3">
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

                  <div className="bg-yellow-100 rounded-lg my-8 py-2">
                    <p className="lg:hidden text-center text-gray-500 text-lg">{tokens.length}/{allTokens.length} Tokens available</p>
                  </div>
                  
                  {/* <div className="lg:flex lg:items-center gap-10">
                    <p className="text-2xl font-bold mb-5 pb-5 border-b border-yellow-400 lg:border-0">
                      Perks
                    </p>
                    <span className="text-lg">
                      <li>First Perk</li>
                      <li>Second Perk</li>
                      <li>Exclusive access to comunity</li>
                    </span>
                  </div> */}
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
