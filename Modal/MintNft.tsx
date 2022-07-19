import React, { useState } from 'react'
import Near from '../icons/near.svg'
import { AiOutlineClose } from 'react-icons/ai';

const MintNft = () => {

    const [cancleModal, setCancleModal] = useState(true)

    const cancle = () => {
        setCancleModal(false)   
        
    }
  
  return (
    <div>
        {cancleModal && 
            <div className="h-screen w-screen glass-morphism fixed top-0 left-0 z-40">
                <div className="align-middle mx-auto md:w-2/5 w-5/6 relative top-80 lg:top-44 rounded-xl p-8 bg-white">
                    <div className='flex w-full justify-between'>
                        <p className='text-xl font-bold '>Buster character color</p>
                        {cancleModal && <span className='text-gray-400 border border-mp-brown-1 rounded-full p-2 cursor-pointer' onClick={cancle}><AiOutlineClose/></span>}
                    </div>
                    <div className='flex text-xl text-gray-400 '>
                        <p>Adress: <span className='font-bold text-gray-800'>0xa2ba...7D051</span></p> 
                        <span className='mt-2 px-2'><Near/></span>
                    </div>
        
                    <div className="flex justify-evenly">
                        <span className='border border-gray-200 rounded-full outline-none flex px-6 lg:px-12 text-gray-800'><p className='mt-3'>16.5</p><span className='mt-4 px-2'><Near/></span></span>
                        <button className="border-2 rounded-xl outline-none btnColor py-2 font-medium px-6 lg:px-12 text-gray-800">mint nft</button>                    
                    </div>
                    
                </div>
            </div>
        }
    </div>
  )
}

export default MintNft