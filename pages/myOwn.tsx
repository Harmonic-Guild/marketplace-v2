import { useEffect, useState } from 'react'
import { useWallet } from '../services/providers/MintbaseWalletContext'
import { gql } from 'apollo-boost'
import { useLazyQuery } from '@apollo/client'
import React from 'react'
// import dynamic from 'next/dynamic';
import Image from 'next/image'
import MintNft from '../Modal/MintNft'



const FETCH_TOKENS = gql`
query FetchTokensByStoreId($ownerId: String!, $limit: Int, $offset: Int) {
  metadata(
    order_by: { thing_id: asc }
    where: {thing: {tokens: {ownerId: {_eq: $ownerId}}}}
    limit: $limit
    offset: $offset
    distinct_on: thing_id
  ) {
    id
    media
    animation_url
    title
    thing_id
    animation_type
    thing {
      id
      metaId
      memo
    }
  }
}
`

const NFT = ({ toggle, tokenId, media, title, animation_url, animation_type }: {toggle: any, tokenId: string, media: string; title: string; animation_url: string; animation_type: string }) => {
  
  const [sellModal, showSellModal] = useState(false)

  const toggleFullScreen =  (media: any) => {
    toggle(media)
  }

  

  return (
    <div className="w-full h-auto border border-mp-brown-2 rounded-2xl bg-mp-peach-2 cursor-pointer">
      <div className="p-4">
      {sellModal &&<MintNft closeModal={()=> showSellModal(false)} tokenId={tokenId} title={title} />}
        <div>

          {(animation_type === null || animation_type === 'image/jpeg' || animation_type === 'image/png' || animation_type === 'image/gif' ) ?
            (<div className="object-contain mx-auto rounded lg:h-80 h-64 ">
              <div className="relative">
              <Image
              height={500}
              width={500}
              objectFit="cover"
              src={media}
              alt={title} />
              <div className='absolute bottom-2 z-10 right-2' onClick={()=> toggleFullScreen(media)}>[]</div>
              </div>
            </div>) : 
            (<div className="lg:h-80 h-64 mx-auto flex items-center">
              
              <video poster={media} controls className='object-contain' controlsList="nodownload" autoPlay loop muted>
                  <source src={animation_url}></source>
              </video>
            </div>)
          }


          <div className="px-30 py-2">
            <div className="text-center font-bold text-lg">{title}</div>
            <div className="w-full flex justify-center mt-6">
              <button className='btnColor px-4 py-2 rounded-lg mx-center w-4/5' onClick={()=> showSellModal(true)}>Sell NFT</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


type MetaData = {
  id: string
  media: string
  animation_url: string
  title: string
  animation_type: string
  thing_id: string
}

const MyOwn = () => {
  const { wallet} = useWallet()
  const [metaData, setMetaData] = useState<any>([])
  const [fullScreen, setFullScreen] = useState(false)
  const [image, setImage] = useState<any>(null)


  const [getTokens, { loading: loadingTokensData, data: tokensData }] =
    useLazyQuery(FETCH_TOKENS, {
      variables: {
        ownerId: '',
        limit: 10,
        offset: 0,
      },
    })


  useEffect(() => {
    getTokens({
      variables: {
        ownerId: wallet?.activeAccount?.accountId!,
        limit: 20,
        offset: 0,
      },
    })
  }, [wallet?.activeAccount?.accountId])

  useEffect(() => {
    if (!tokensData) return;
    
    setMetaData(tokensData.metadata)

    console.log(tokensData, '][][[][]]');
    
    
  }, [tokensData])

  const toggle = (image: any)=> {
    setFullScreen(true)
    setImage(image)
  }

  return (
    <div className="bg-fixed bg-gradient-to-r from-slate-50 to-slate-100 w-full px-6 py-10 relative">
      {fullScreen && <div className='h-screen w-screen bg-gray-900 z-50 fixed left-0 top-0 '>
        <div className="relative h-screen w-screen transition-opacity duration-200 cursor-pointer">
          <Image
            src={image}
            layout="fill"
            objectFit='contain'
          />
          <div className='absolute bottom-2 right-8 text-white' onClick={()=> setFullScreen(false)}>[]</div>
        </div>
      </div>}
      {loadingTokensData && 'Loading...'}
      {!loadingTokensData && (
        <>
        <h1 className="drop-shadow-lg text-xl text-center font-semibold tracking-widest uppercase text-gray-500 title-font md:text-4xl px-6 py-8">
          {wallet?.activeAccount?.accountId}, your tokens
        </h1>
        <div className="pb-24 w-full mx-auto ">
          <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2  w-full pt-4 gap-y-5 gap-x-2">
            {metaData.map((meta: MetaData) => (
                <NFT
                key={meta.id}
                  tokenId={meta.id}
                  media={meta.media}
                  title={meta.title}
                  animation_url={meta.animation_url}
                  animation_type={meta.animation_type}
                  toggle={toggle}
                />
            ))}
          </div>
        </div>
      </>
      )}
      
    </div>
  )
}

export default MyOwn
