import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai';

const MintingNft = () => {

  const [cancleModal, setCancleModal] = useState(true)

  const cancle = () => {
      setCancleModal(false)   
      
  }

  return (
    <div>
      {cancleModal && 
        <div className="h-screen w-screen glass-morphism fixed top-0 left-0 z-40">
        <div className="align-middle mx-auto w-5/6 lg:w-1/4 relative top-52 lg:top-32 rounded-xl p-8 bg-white">
            <div className='flex w-full justify-between'>
                <p className='text-xl font-bold headerFont'>Minting your NFT</p>
                {cancleModal && <span className='text-gray-400 border border-mp-brown-1 rounded-full p-2 cursor-pointer' onClick={cancle}><AiOutlineClose/></span>}
            </div>
            <div className="pb-10 p-5">
                <span className=''><img src="https://arweave.net/Yjn-nuWnEv8IgiFsw1LPKq1xjfa86yC2WVheWGPpixg" alt="" className=' rounded-xl'/></span>
                <span className='text-xl pt-4 text-font'>Buster Character Color #1234</span>
            </div>                
        </div>
      </div>
      }
    </div>
  )
}

export default MintingNft