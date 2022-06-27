import React from 'react'
import Near from '../icons/near.svg'
import { AiOutlineClose } from 'react-icons/ai';

const PlaceBid = () => {
  return (
    <div className="glass-morphism ">
        <div className="align-middle mx-auto lg:w-1/3 w-5/6 h-full relative top-[30%] rounded-xl p-8 bg-white">
            <div className='flex w-full justify-between'>
                <p className='text-xl font-bold'>Buster character color</p>
                <span className=' top-5 text-gray-400'><AiOutlineClose/></span>
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
                <button className="border-2 rounded-full outline-none action-btn px-6 lg:px-12 text-gray-800 mt-4">Place bid</button>                    
            </div>
            
        </div>
    </div>
  )
}

export default PlaceBid