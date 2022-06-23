import React from 'react'
import Near from '../icons/near.svg'
import { AiOutlineClose } from 'react-icons/ai';

const BidSucess = () => {
  return (
    <div className="glass-morphism ">
      <div className="align-middle mx-auto lg:w-1/3 w-5/6 h-full relative top-[30%] rounded-xl p-8 bg-white">
          <div className='flex w-full justify-between'>
              <p className='text-2xl font-bold '>Bid is placed <br />sucessfully</p>
              <span className=' top-5 text-gray-400'><AiOutlineClose/></span>
          </div>
          <div className="flex font-bold justify-between w-full lg:w-3/5">
              <div className="bg-gray-900 text-white rounded-md px-2 py-1">16:12:56 hrs</div>
              <span className='lg:text-sm text-lg'>Time remaining</span>
          </div>
          <div className='flex text-xl font-bold w-full mx-32'>
              <span>16.5</span> 
              <span className='mt-2 px-2'><Near/></span>
          </div>

          <div className="text-center">
              <button className="border-2 rounded-full outline-none action-btn px-6 lg:px-12 text-gray-800 mt-4">Check details</button>                    
          </div>
          
      </div>
    </div>
  )
}

export default BidSucess