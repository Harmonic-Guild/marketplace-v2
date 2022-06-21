import { gql } from 'apollo-boost'
import { useLazyQuery } from '@apollo/client'
import { useEffect, useState } from 'react';
import { useWallet } from '../services/providers/MintbaseWalletContext';
import { Store } from '../interfaces/wallet.interface';

import DropDown from '../components/Dropdown-Filters';
import NFT from '../components/NFT';
import SideOptions from '../components/SideOptions';
import Vector from '../icons/Vector.svg'
import Burger from '../icons/burger.svg'
import Lists from '../icons/lists.svg'

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
  query FetchTokensByStoreId($storeId: String!, $limit: Int, $offset: Int) {
    token(
      order_by: { thingId: asc }
      where: { storeId: { _eq: $storeId }, burnedAt: { _is_null: true } }
      limit: $limit
      offset: $offset
      distinct_on: thingId
    ) {
      id
      thingId
      thing {
        id
        metaId
      }
    }
  }
`

function Explore() {

    const { wallet } = useWallet()
    const [store, setStore] = useState<Store | null>(null)
    const [things, setThings] = useState<any>([])
    const [showOptions, setShowOptions] = useState<boolean>(false)

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
        limit: 10,
        offset: 0,
      },
    })

  useEffect(() => {
    getStore({
      variables: {
        storeId: 'muti.mintbase1.near',
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
        limit: 10,
        offset: 0,
      },
    })
  }, [storeData])

  useEffect(() => {
    if (!store || !tokensData) return

    

    const things = tokensData.token.map((token: any) => token.thing)

    setThings(things)
  }, [tokensData])

    return ( 
        <div className='my-12 w-11/12 mx-auto'>
            <div className='text-center'>
                <p className='text-mp-orange-1'>Lorem <Vector className='inline'></Vector></p>
                <h2 className='text-mp-dark-2 text-6xl font-bold'>Explore</h2>
            </div>

            {/* Sort Section */}
            <div className='flex w-full justify-between mt-8'>
                {/* drop downs */}
                <DropDown/>
                {/* toggles */}
                <div className="flex w-1/5 justify-end">
                    <div className='flex w-2/5 justify-around'>
                        <span><Burger className="my-2"></Burger></span>
                        <span onClick={()=> setShowOptions(!showOptions)} className='cursor-pointer'><Lists className="mt-2" ></Lists></span>
                    </div>
                </div>
            </div>

            <div className='grid grid-cols-10'>
                {/* checkboxes */}
                {showOptions && (
                    <SideOptions/>
                    )}

                {/* nfts wrapper */}
                <div className={`col-start-1 ${showOptions?'col-span-7 grid-cols-3' : 'col-span-10 grid-cols-4'} order-1 grid  p-4 gap-3`}>
                    {things.map((thing: any)=> {
                      return (
                          
                          <NFT thing={thing} baseUri={store?.baseUri} key={thing.id}/>
                      )
                    })}
                </div>

            </div>

        </div>
     );
}

export default Explore;