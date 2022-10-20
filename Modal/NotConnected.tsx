import React, { useState } from 'react'
import Connect_Line from '../icons/connect_Line.svg'
import Near from '../icons/near.svg'
import { FiX } from 'react-icons/fi'
import { useWallet } from '../services/providers/MintbaseWalletContext';

import styles from '../styles/NotConnected.module.scss';

const NotConnected = () => {   

    const [cancelModal, setCancelModal] = useState(true)
    const { wallet, isConnected} = useWallet()
    
    setTimeout(() => {
        setCancelModal(false)
    }, 5000);

  return (
    <div>
        {cancelModal && 
            <div className={`${styles.container} glass-morphism`}>
                <div className={`mx-auto w-4/5 relative top-80 lg:top-52 rounded-xl bg-white ${styles['inner-cont']}`}>
                    <div className='w-full text-right'>
                        {cancelModal && <span onClick={() => setCancelModal(false) } className='absolute top-1 z-10 -ml-2 text-yellow-500 bg-gray-900 p-2 rounded-full'><FiX className='w-4 h-4'/></span>}
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
