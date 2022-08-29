import React, { useState } from 'react'
import Near from '../icons/near.svg'
import { AiOutlineClose } from 'react-icons/ai';

const PlaceBid = () => {

    const [cancleModal, setCancleModal] = useState(true)
    const [showModal, setShowModal] = useState(false)

    const cancle = () => {
        setCancleModal(false)   
        
    }
  return (
    <div>
        {cancleModal &&
        <div className="h-screen w-screen glass-morphism fixed top-0 left-0 z-40">
            <div className="align-middle mx-auto md:w-2/5 w-5/6 relative top-80 lg:top-52 rounded-xl p-8 bg-white">
                <div className='flex w-full justify-between'>
                    <p className='text-xl font-bold'>Buster character color</p>
                    {cancleModal && <span className='text-gray-400 border border-mp-brown-1 rounded-full p-2 cursor-pointer' onClick={cancle}><AiOutlineClose/></span>}
                </div>
                <div className="flex font-bold justify-between w-full lg:w-3/5">
                    <div className="bg-gray-900 text-white rounded-md px-2 py-1">16:12:56 hrs</div>
                    <span className='lg:text-sm text-lg'>Time remaining</span>
                </div>
                <div className='my-2 flex justify-between w-full lg:w-3/5 border border-gray-400 rounded-lg'>
                    <input type="text" className='w-full'/> 
                    <span className='border-l border-gray-400 p-2'><Near/></span>
                </div>

                <div className="">
                    <button onClick={() => setShowModal(false) } className="border-2 rounded-xl outline-none btnColor py-2 font-medium px-6 lg:px-12 text-gray-800">Place bid</button>                    
                </div>
                
            </div>
        </div>
}
    </div>
  )
}

export default PlaceBid