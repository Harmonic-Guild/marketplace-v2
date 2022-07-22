import React from 'react'
import Near from '../icons/near.svg'

const PurchaseNft = ({buy, price, isConnected}: {buy: any, price: string, isConnected: boolean}) => {


  return (
    <div className={`flex justify-between border border-mp-brown-1 bg-mp-peach-2 rounded-lg lg:w-4/5 w-fulltokenPriceNumber p-6 mt-4`}>
      <div className="flex">
        <div className=" font-medium flex">
            <span>Get it at: </span>
            <span className="pl-3 pr-1">{price}</span>
            <span className='pt-1  ml-1'><Near /></span>
        </div>
      </div>
      <div className="-mt-2">
        <button onClick={buy}  className={`py-2 rounded-md  font-medium text-gray-900 sm:px-20 px-5 ${isConnected ? 'btnColor' : 'border border-mp-brown-1 py-2 cursor-not-allowed'}`}>Purchase</button>
      </div>
    </div>
  )
}

export default PurchaseNft