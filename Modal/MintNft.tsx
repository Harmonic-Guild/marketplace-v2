import React from 'react'
import Near from '../icons/near.svg'
import { AiOutlineClose } from 'react-icons/ai';

const MintNft = () => {
  return (
    <div className="glass-morphism ">
        <div className="align-middle mx-auto lg:w-1/3 w-5/6 h-full relative top-[30%] rounded-xl p-8 bg-white">
            <div className='flex w-full justify-between'>
                <p className='text-4xl font-bold '>Bid is placed <br />sucessfully</p>
                <span className=' top-5 text-gray-400'><AiOutlineClose/></span>
            </div>
            <div className='flex text-xl text-gray-400 w-full mx-32'>
                <p>Adress: <span className='font-bold text-gray-800'>0xa2ba...7D051</span></p> 
                <span className='mt-2 px-2'><Near/></span>
            </div>

            <div className="flex">
                <span className='border-2 rounded-full outline-none flex px-6 lg:px-12 text-gray-800"'><p>16.5</p><span className='mt-2 px-2'><Near/></span></span>
                <button className="border-2 rounded-full outline-none action-btn px-6 lg:px-12 text-gray-800 mt-4">Check details</button>                    
            </div>
            
        </div>
    </div>
  )
}

export default MintNft