import React, { useEffect, useState } from 'react'
import Near from '../icons/near.svg'
import { AiOutlineClose } from 'react-icons/ai';
import { useWallet } from '@mintbase-js/react';
import {parseNearAmount} from 'near-api-js/lib/utils/format'

import styles from '../styles/MintNft.module.scss';
import { execute, list } from '@mintbase-js/sdk';

    
    
    
const MintNft = ({closeModal, thingId, tokenId, title, metaId}: any) => {
    const [price, setPrice] = useState<string|undefined>('0')

  
    const cancel = () =>  closeModal()
    
    const { selector, activeAccountId } = useWallet();
    const listOnSale = async () => {
        
        const wallet = await selector.wallet();
        if(!price) return;
        //const contractName = process.env.NEXT_PUBLIC_STORE_NAME!
        const contractName = thingId.split(":")[0]
        const amount = parseNearAmount(price)!

        await execute({wallet}, list({contractAddress: contractName, tokenId, price: amount}))

    }
    
    return (
        <div>
            <div className={`${styles.container} glass-morphism`}>
                <div className={styles.modal}>
                    <div className='flex w-full justify-between'>
                        <p className='text-xl font-bold '>{title}</p>
                        <span className='text-gray-400 border border-mp-brown-1 rounded-full p-2 cursor-pointer' onClick={cancel}><AiOutlineClose/></span>
                    </div>
                    <div className='flex text-xl text-gray-400 '>
                        <p>Adress: <span className='font-bold text-gray-800'>{activeAccountId}</span></p> 
                    </div>
        
                    <div className="flex mt-3">
                        <span className='outline-none flex text-gray-800 w-full'>
                            <input type='number' placeholder='enter price' className='outline-none h-12 mx-3 w-2/3 appearance-none border px-3 rounded-lg' onChange={(e)=> setPrice(e.target.value)}/><span className='mt-4 px-2'><Near/></span></span>
                         
                            <button className="border-2 rounded-xl outline-none btnColor py-2 font-medium px-4 w-2/3 text-gray-800" onClick={listOnSale}>Sell</button>            
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MintNft