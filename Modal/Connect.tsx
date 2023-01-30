import React from 'react'
import Connect_Line from '../icons/connect_Line.svg'
import Near from '../icons/near.svg'
import Vector_x from '../icons/Vector_x.svg'
import Ellipse_x from '../icons/Ellipse_x.svg'

export const Connect = () => {
  return (
    <div className="glass-morphism ">
        <div className="align-middle mx-auto lg:w-1/3 w-5/6 h-full relative top-[30%] rounded-xl p-8 bg-white">
            <div className='w-full text-right'>
                {/* <span></span> */}
                <span className='absolute w-12 h-12 top-3'><Ellipse_x/></span>
                <span className='absolute w-12 h-12 top-5 z-10'><Vector_x/></span>
            </div>
            <div className="text-xl font-bold text-font">
                To continue create a <span className='flex'><p>wallet</p><span className='mt-2 px-2'><Near/></span></span>
            </div>

            <div className="flex mx-auto my-2 ">
                <span className=''><Connect_Line/></span>
                <button className="border-2 rounded-full outline-none w-full  px-6 lg:px-12 text-gray-800 mt-4">Cancel</button>                    
            </div>
            
        </div>
    </div>
  )
}
