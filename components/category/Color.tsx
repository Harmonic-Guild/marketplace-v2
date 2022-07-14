import React from 'react'

const Color = () => {
  return (
    <div className='border-2 rounded-md w-4/5 mx-9'>
        <h3 className='text-xl font-semibold text-mp-dark-1 my-3 ml-4'>Color</h3>
        <div className='flex justify-between px-3 artist'>
            <div className='flex'>
                <input type="radio" name='color' className=' w-6 h-6' />
                <span className='pl-2'>Red</span>
            </div>
            <span>103</span>
        </div>
        <div className='flex justify-between px-3 artist'>
            <div className='flex'>
                <input type="radio" name='color' className=' w-6 h-6' />
                <span className='pl-2'>Blue</span>
            </div>
            <span>23</span>
        </div>
        <div className='flex justify-between px-3 artist'>
            <div className='flex'>
                <input type="radio" name='color' className=' w-6 h-6' />
                <span className='pl-2'>Black {'&'} White</span>
            </div>
            <span>12</span>
        </div>
        <div className='flex justify-between px-3 artist'>
            <div className='flex'>
                <input type="radio" name='color' className=' w-6 h-6' />
                <span className='pl-2'>Orange</span>
            </div>
            <span>22</span>
        </div>
        <div className='flex justify-between px-3 artist'>
            <div className='flex'>
                <input type="radio" name='color' className=' w-6 h-6' />
                <span className='pl-2'>Yellow</span>
            </div>
            <span>11</span>
        </div>
    </div>
  )
}

export default Color