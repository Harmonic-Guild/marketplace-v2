import React from 'react'
import { gql } from 'apollo-boost'
import { useLazyQuery } from '@apollo/client'
import { useEffect, useState } from 'react';
import { useWallet } from '../services/providers/MintbaseWalletContext';
import DropDown from '../components/Dropdown-Filters'
import NFT from '../components/NFT'
import Vector from '../icons/Vector.svg'
import Categories from '../components/category/Categories'
import Artists from '../components/category/Artists'
import Color from '../components/category/Color'
import { Store } from '../interfaces/wallet.interface';
import QueryFilters from '../helpers/getQuery';



const FETCH_STORE = gql`
  query FetchStore($storeId: String!) {
    store(where: { id: { _eq: $storeId } }) {
      id
      name
      symbol
      baseUri
      owner
    }
  }
`

const FETCH_TOKENS = gql`
  query FetchTokensByStoreId($storeId: String!, $lt: numeric, $gt: numeric, $limit: Int, $offset: Int) {
    token(
      order_by: { thingId: asc }
      where: {
         storeId: { _eq: $storeId },
          burnedAt: { _is_null: true },
          list: {_or: {
            # offer: {price: {_gte: $gt, _lte: $lt}},
             price: {_gte: $gt, _lte: $lt},
          }},
          thing: {}
        }
      limit: $limit
      offset: $offset
      distinct_on: thingId
    ) {
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
          media
          media_type
          animation_url
          animation_type
        }
      }
    }
  }
`



const explore = () => {

    const { wallet } = useWallet()
    const [store, setStore] = useState<Store | null>(null)
    const [things, setThings] = useState<any>([])
    const [tokens, setTokens] = useState<any>([])
    const [filterParams, setFilterParams] = useState<any>(null)

     // fetching
     const [getStore, { loading: loadingStoreData, data: storeData }] =
     useLazyQuery(FETCH_STORE, {
       variables: {
         storeId: ''
       },
     })
 
   const [getTokens, { loading: loadingTokensData, data: tokensData }] =
     useLazyQuery(FETCH_TOKENS, {
       variables: {
         storeId: '',
         limit: 15,
         offset: 0,
         lt: 0,
         gt: 0
       },
     })
 
   useEffect(() => {
     getStore({
       variables: {
         storeId: 'sevendeadstars.mintbase1.near',
       },
     })
   }, [])
   
 
   useEffect(() => {
     // console.log(storeData);
     
     if (!storeData) return
 
     if (storeData?.store.length === 0) return
 
     setStore({
       ...storeData.store[0],
     })
     getTokens({
       variables: {
         storeId: storeData.store[0].id,
         limit: 15,
         offset: 0,
         lt: filterParams.prices.lt.toString(),
         gt: filterParams.prices.gt.toString()
       },
     })
    //  console.log(filterParams.prices);
     
     
   }, [storeData, filterParams])
 
   useEffect(() => {
     if (!store || !tokensData) return
 
     const things = tokensData.token.map((token: any) => token.thing)
 
     setThings(things)
 
     const tokens = tokensData.token.map((token: any)=> {
       return {id: token.id, list : token.lists[0], thing: token.thing, txid: token.txid, thingId: token.thingId}
     }) 
 
     setTokens(tokens)
     // console.log(tokensData, '-=-=-=-=-=++_+_+');
     
   }, [tokensData])

   const setFilters = (filters: any) => {

    const {order} = filters;
    
    const res = QueryFilters(filters);
    setFilterParams({...res, order});
   }

  return (
    <div className='px-8'>
        <div className='text-center'>
            <p className='text-mp-orange-1'>NFTs <Vector className='inline'></Vector></p>
            <h2 className='text-mp-dark-2 text-4xl font-bold'>Explore</h2>
        </div>
        <div>
            <DropDown setFilters={setFilters}/>  
        </div>    
        <div className='lg:flex block justify-around'>
            <div className=' order-last pt-4'>
                <div className='lg:block hidden'>
                    <Categories/>
                    <span><Artists/></span> 
                    <Color/>
                </div>
                <div className='lg:hidden sm:flex block'>
                    <span className='order-last'>
                        <span className='pb-4'><Color/></span>
                        <span><Categories/></span>
                    </span>
                    <span>
                        <Artists/> 
                    </span>
                </div>
            </div>
            <div className='grid lg:grid-cols-3 grid-cols-2 lg:w-3/4 w-full pt-4 gap-y-5 gap-x-3'>
                {tokens.map((token: any)=> {
                    return (
                          
                        <NFT token={token} baseUri={store?.baseUri} key={token.thing.id}/>
                    )
                })}
            </div>
        </div>  
    </div>
  )
}

export default explore