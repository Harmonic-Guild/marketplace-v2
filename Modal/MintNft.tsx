import React, { useState } from 'react'
import Near from '../icons/near.svg'
import { AiOutlineClose } from 'react-icons/ai';
import { useWallet } from '../services/providers/MintbaseWalletContext';
import {parseNearAmount} from 'near-api-js/lib/utils/format'

const MintNft = ({closeModal, thingId, tokenId, title}: any) => {
    const { wallet } = useWallet();
    const [price, setPrice] = useState<string|undefined>('0')

    const cancel = () =>  closeModal()
    
    const sellNFT = () => {
        if(!price) return;
        //const contractName = process.env.NEXT_PUBLIC_STORE_NAME!
        const contractName = thingId.split(":")[0]
        const amount = parseNearAmount(price)!

        wallet?.list(tokenId, contractName ,amount).then(res=> {
            console.log(res, '=*****-0--*-***--*-*--===-=-****');
        }).catch(e=> console.log(e)
        )

    }
  return (
    <div>
        
            <div className="h-screen w-screen glass-morphism fixed top-0 left-0 z-40">
                <div className="align-middle mx-auto md:w-2/5 w-5/6 relative top-80 lg:top-44 rounded-xl p-8 bg-white">
                    <div className='flex w-full justify-between'>
                        <p className='text-xl font-bold '>{title}</p>
                        <span className='text-gray-400 border border-mp-brown-1 rounded-full p-2 cursor-pointer' onClick={cancel}><AiOutlineClose/></span>
                    </div>
                    <div className='flex text-xl text-gray-400 '>
                        <p>Adress: <span className='font-bold text-gray-800'>{wallet?.activeAccount?.accountId}</span></p> 
                    </div>
        
                    <div className="flex mt-3">
                        <span className='outline-none flex text-gray-800 w-full'>
                            <input type='number' placeholder='enter price' className='outline-none h-12 mx-3 w-1/3 appearance-none' onChange={(e)=> setPrice(e.target.value)}/><span className='mt-4 px-2'><Near/></span></span>
                        <button className="border-2 rounded-xl outline-none btnColor py-2 font-medium px-4 w-2/3 text-gray-800" onClick={sellNFT}>Place</button>                    
                    </div>
                    
                </div>
            </div>
        
    </div>
  )
}

export default MintNft