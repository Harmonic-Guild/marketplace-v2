import React from 'react'
import { AiOutlineClose } from 'react-icons/ai';

const MintingNft = () => {
  return (
    <div className="glass-morphism ">
      <div className="align-middle mx-auto lg:w-1/3 w-5/6 h-full relative top-[30%] rounded-xl p-8 bg-white">
          <div className='flex w-full justify-between'>
              <p className='text-3xl font-bold '>Minting your NFT</p>
              <span className='w-12 h-12 top-5 text-gray-400'><AiOutlineClose/></span>
          </div>
          <div className="pb-20 p-5">
              <span className='w-1/3 h-1/3'><img src="https://arweave.net/Yjn-nuWnEv8IgiFsw1LPKq1xjfa86yC2WVheWGPpixg" alt="" className=' rounded-xl'/></span>
              <span className='text-xl pt-4'>Buster Character Color #1234</span>
          </div>                
      </div>
    </div>
  )
}

export default MintingNft