import React, { useEffect, useState } from 'react'
import Near from '../icons/near.svg'
import { AiOutlineClose } from 'react-icons/ai';
import { useWallet } from '../services/providers/MintbaseWalletContext';
import {parseNearAmount} from 'near-api-js/lib/utils/format'
import { gql } from 'apollo-boost';
import { useLazyQuery } from '@apollo/client';

const FETCH_LISTING = gql`
query FetchTokensByStoreId($metaId: String!) {
    mb_views_active_listings(
      where: {metadata_id: {_eq: $metaId}}
    ) {
      price
      title
    }
  }
`

const MintNft = ({closeModal, tokenId, title, contract_id, metaId}: any) => {
    console.log(metaId,'jujujjjiujiujuijju');
    
    
    
    const [metaData, setMetaData] = useState([])

    const [getTokens, { loading: loadingTokensData, data: tokensData }] = useLazyQuery(FETCH_LISTING, {
        variables: {
            metaId: "",
        },
    });

    useEffect(() => {
        if(!metaId) return
        
        getTokens({
            variables: {
                metaId: metaId
            },
        });
    }, [metaId]);

    useEffect(() => {
        if (!tokensData) return;

        setMetaData(tokensData.mb_views_active_listings);
    }, [tokensData]);

    const { wallet } = useWallet();
    const [price, setPrice] = useState<string|undefined>('0')

    const cancel = () =>  closeModal()
    
    const sellNFT = () => {
        if(!price) return;
        // const contractName = process.env.NEXT_PUBLIC_STORE_NAME!
        const amount = parseNearAmount(price)!

        const token_id = tokenId.split(":"+process.env.NEXT_PUBLIC_STORE_NAME)[0]
        

        wallet?.list(token_id, contract_id ,amount).then(res=> {
        }).catch(e=> console.log(e)
        )

    }
  return (
    <div>
        
            <div className="h-screen w-screen glass-morphism fixed top-0 left-0 z-50">
                <div className="mx-auto w-1/2 mt-20 rounded-xl bg-white">
                    <div className='flex w-full justify-between'>
                        <p className='text-xl font-bold '>{title}</p>
                        <span className='text-gray-400 border border-mp-brown-1 rounded-full p-2 cursor-pointer' onClick={cancel}><AiOutlineClose/></span>
                    </div>
                    <div className='flex text-xl text-gray-400 '>
                        <p>Adress: <span className='font-bold text-gray-800'>{wallet?.activeAccount?.accountId}</span></p> 
                    </div>
        
                    <div className="flex mt-3">
                        {!metaData.length && <span className='outline-none flex text-gray-800 w-full'>
                            <input type='number' placeholder='enter price' className='outline-none h-12 mx-3 w-1/3 appearance-none' onChange={(e)=> setPrice(e.target.value)}/><span className='mt-4 px-2'><Near/></span></span>}
                            
                        {metaData.length? (
                            <button className="border-2 rounded-xl outline-none btnColor py-2 font-medium px-4 w-2/3 text-gray-800" >Unlist (coming soon)</button>  
                        ): (
                            <button className="border-2 rounded-xl outline-none btnColor py-2 font-medium px-4 w-2/3 text-gray-800" onClick={sellNFT}>Place</button>  
                        )}              
                    </div>
                </div>
            </div>
        
    </div>
  )
}

export default MintNft