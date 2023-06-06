import React, { useState } from 'react'
import Connect_Line from '../icons/connect_Line.svg'
import Near from '../icons/near.svg'
import { FiX } from 'react-icons/fi'

import styles from '../styles/NotConnected.module.scss';
import { useWallet } from '@mintbase-js/react';

const NotConnected = ({closeModal}: any) => {   

    const { isConnected, connect, disconnect } = useWallet();

    const walletAction = isConnected ? disconnect : connect;
    

  return (
    <div>
            <div className={`${styles.container} glass-morphism`}>
                <div className={`mx-auto w-4/5 relative top-80 lg:top-52 rounded-xl bg-white ${styles['inner-cont']}`}>
                    <div className='w-full text-right'>
                         <span onClick={() => closeModal(false) } className='cursor-pointer absolute top-1 z-10 -ml-2  bg-primary-color  p-2 rounded-full'><FiX className='text-font-color w-4 h-4'/></span>
                    </div>
                    <div className="text-xl font-bold font-header mt-10 text-secondary-color">
                        Connect Wallet 
                    </div>
                    <div className='flex'>
                        <span className=''><Connect_Line/></span>
                        <div className="p-4 mt-2">
                            <button onClick={walletAction} className="border-2 hover:bg-primary-color rounded-full outline-none w-full p-2 px-5 lg:px-12 text-font-color border-secondary-color">Connect</button>                    
                        </div>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default NotConnected
