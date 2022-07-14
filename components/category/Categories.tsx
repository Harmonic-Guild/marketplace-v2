import React from 'react'
import Cross from '../../icons/cross.svg'

const Categories = () => {
  return (
    <div className="px-4 pt-6 pb-8 text-sm border-2 rounded-md w-4/5 mx-9 my-3">
      <h3 className='text-xl font-semibold text-mp-dark-1 mb-3'>Categories</h3>
      <div className="flex flex-wrap text-mp-gray-6">
        <div className="chip">not up for bidding <Cross className="mx-1 my-1"></Cross></div>
        <div className="chip">up for bidding <Cross className="mx-1 my-1"></Cross></div>
        <div className="chip">purchase direct <Cross className="mx-1 my-1"></Cross></div>
      </div>  
    </div>
  )
}

export default Categories