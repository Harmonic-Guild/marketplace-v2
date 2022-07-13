import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai';
import Near from '../icons/near.svg'
import { useWallet } from '../services/providers/MintbaseWalletContext';
import PlaceBid from './PlaceBid';

const MakeOffer = (props: any,{buy, price}: {buy: any, price: any}) => {

  const { wallet, isConnected } = useWallet();
  const [showModal, setShowModal] = useState(false)
  const [bid, setBid] = useState('0')

  const handleChange = (e: any) => {
    setBid(e.target.value)
  }

  return (
    <div className={`lg:flex block justify-between border bg-mp-peach-2 border-mp-brown-1 rounded-lg lg:w-5/6 w-full p-6 mt-4`}>
      <div className="flex justify-between lg:block">
        <div className="flex">
        <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
        <span className="pl-2 text-sm ">@Latest bidder</span>
        </div>
        <span className=" font-medium flex md:text-base text-sm">
            <span className=''>Latestbid: </span>
            <span className="pl-3 pr-1">{bid}</span>
            {/* <span className="pl-3 pr-1">{price}</span> */}
            <span className='pt-1  ml-1'><Near /></span>
        </span>
      </div>
      <span className="border-b border-mp-brown-1 lg:hidden flex py-2 px-32"></span>
      <div className="mt-8 lg:mt-0">
            <button onClick={() => setShowModal(true) }  className={`py-2 rounded-md  font-medium text-gray-900 w-full sm:px-20 px-5 ${isConnected ? 'btnColor' : 'border border-mp-brown-1 py-2 cursor-not-allowed'}`}>Bid</button>
            <span className="text-center lg:flex block pt-4">
              <p className=" font-medium">Owned by: </p>
              <img className="inline-block h-4 w-4 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
              <span onClick={buy}>@owner</span>
            </span>
      </div>
      {showModal ? (
        <div className="h-screen w-screen glass-morphism fixed top-0 left-0 z-40">
        <div className="align-middle mx-auto md:w-2/5 w-5/6 relative top-80 lg:top-52 rounded-xl p-8 bg-white">
            <div className='flex w-full justify-between'>
                <p className='text-xl font-bold'>Buster character color</p>
                 <span className='text-gray-400 border border-mp-brown-1 rounded-full p-2 cursor-pointer' onClick={() => setShowModal(false)}><AiOutlineClose/></span>
            </div>
            <div className="flex font-bold justify-between w-full lg:w-3/5">
                <div className="bg-gray-900 text-white rounded-md px-2 py-1">16:12:56 hrs</div>
                <span className='lg:text-sm text-lg'>Time remaining</span>
            </div>
            <div className='my-2 flex justify-between w-full lg:w-3/5 border border-gray-400 rounded-lg'>
                <input type="number" className='w-full' value={bid} onChange={handleChange}/> 
                <span className='border-l border-gray-400 p-2'><Near/></span>
            </div>

            <div className="">
                <button onClick={(buy) => props.NewBid(bid)} className="border-2 rounded-xl outline-none btnColor py-2 font-medium px-6 lg:px-12 text-gray-800">Place bid</button>                    
            </div>
            
        </div>
    </div>
      ) : null}
    </div>
  )
}

export default MakeOffer