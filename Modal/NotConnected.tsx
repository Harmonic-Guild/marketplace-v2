import React, { useState } from 'react'
import Connect_Line from '../icons/connect_Line.svg'
import Near from '../icons/near.svg'
import { FiX } from 'react-icons/fi'
import { useWallet } from '../services/providers/MintbaseWalletContext'

const NotConnected = () => {   

    const [cancleModal, setCancleModal] = useState(true)
    const { wallet, isConnected} = useWallet()
    
    setTimeout(() => {
        setCancleModal(false)
    }, 5000);

  return (
    <div>
        {cancleModal && 
            <div className="h-screen w-screen glass-morphism fixed top-0 left-0 z-40">
                <div className="align-middle mx-auto md:w-2/5 w-5/6 relative top-80 lg:top-52 rounded-xl p-8 bg-white">
                    <div className='w-full text-right'>
                        {cancleModal && <span onClick={() => setCancleModal(false) } className='absolute top-1 z-10 -ml-2 text-yellow-500 bg-gray-900 p-2 rounded-full'><FiX className='w-4 h-4'/></span>}
                    </div>
                    <div className="text-xl font-bold">
                        To continue connect to a <span className='flex'><p>wallet</p><span className='mt-2 px-2'><Near/></span></span>
                    </div>
                    <div className='flex'>
                        <span className=''><Connect_Line/></span>
                        <div className="p-4 mt-2">
                            <button onClick={() => wallet?.connect({ requestSignIn: true })} className="border-2 hover:bg-gray-100 rounded-full outline-none w-full p-2 px-5 lg:px-12 text-gray-800">Connect</button>                    
                        </div>
                    </div>
                </div>
            </div>
        }
    </div>
  )
}

export default NotConnected
