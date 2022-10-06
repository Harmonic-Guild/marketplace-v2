import React from 'react'
import { gql } from 'apollo-boost'
import { useLazyQuery } from '@apollo/client'
import { useEffect, useState } from 'react';
import DropDown from '../components/Dropdown-Filters'
import NFT from '../components/NFT'
import { Store } from '../interfaces/wallet.interface';
import QueryFilters from '../helpers/getQuery';
import { fetchTokens } from '../gql/FetchTokens'
import { GiStarShuriken } from 'react-icons/gi';



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
  query FetchTokensByStoreId($storeId: String!, $order: order_by!, $type:[String!], $lt: numeric, $gt: numeric, $limit: Int, $offset: Int) {
    token(
      order_by: { thingId: $order }
      where: {
         storeId: { _eq: $storeId },
          burnedAt: { _is_null: true },
          list: {_or: {
             price: {_gte: $gt, _lte: $lt},
             removedAt: {_is_null: true}
          }},
          thing: {
            metadata: {
              animation_type: {
                _in: $type
              }
            }
          }
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
const explore = () => {

    const [store, setStore] = useState<Store | null>(null)
    // const [things, setThings] = useState<any>([])
    const [tokens, setTokens] = useState<any>([])
    const [filterParams, setFilterParams] = useState<any>(null)

    const storeName = process.env.NEXT_PUBLIC_STORE_NAME!

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
         order: '',
         offset: 0,
         lt: 0,
         gt: 0,
         type: []
       },
     })
 
   useEffect(() => {
     getStore({
       variables: {
         storeId: storeName,
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
         storeId: storeName,
         limit: 15,
         offset: 0,
         order: filterParams.orders,
         lt: filterParams.prices.lt.toString(),
         gt: filterParams.prices.gt.toString(),
         type: filterParams.types
       },
     })
    //  console.log(filterParams.prices);
     
     
   }, [storeData, filterParams])
 
   useEffect(() => {
     if (!store || !tokensData) return
 
    //  const things = tokensData.token.map((token: any) => token.thing)
 
    //  setThings(things)
 
     const tokens = tokensData.token.map((token: any)=> {
       return token
     }) 
 
     setTokens(tokens)
     
   }, [tokensData])

   const setFilters = (filters: {range: string, type: string, order: string}) => {  
    
    const res = QueryFilters(filters);
    
    setFilterParams({...res});
    console.log(res);
    
   }

  return (
    <div className='px-8 w-full xl:w-5/6 mx-auto'>
        <div className='text-center'>
            <p className='text-mp-orange-1'>NFTs <GiStarShuriken className='inline w-6 h-5'/></p>
            <h2 className='text-mp-dark-2 text-4xl font-bold'>Explore</h2>
        </div>
        <div>
            <DropDown setFilters={setFilters}/>  
        </div>    
        <div className='xl:flex block justify-around'>
            {/* <div className=' order-last pt-4'>
                <div className='lg:block hidden lg:w-3/4'>
                    <Categories/>
                    <Artists/>
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
            </div> */}
            <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 w-full pt-4 gap-y-5 gap-x-2'>
                {tokens.map((token: any)=> {
                    return (
                      <>
                      {/* {token.lists[0].offer? 'bid': 'sale'} */}
                      <NFT token={token} baseUri={store?.baseUri} key={token.thing.id}/>
                      </>
                          
                    )
                })}
            </div>
        </div>  
    </div>
  )
}

export default explore