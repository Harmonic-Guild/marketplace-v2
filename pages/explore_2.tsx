import React from 'react'
import DropDown from '../components/Dropdown-Filters'
import NFT from '../components/NFT'
import Vector from '../icons/Vector.svg'
import Categories from '../category/Categories'
import Artists from '../category/Artists'
import Color from '../category/Color'

const explore_2 = () => {
  return (
    <div className='px-8'>
        <div className='text-center'>
            <p className='text-mp-orange-1'>Lorem <Vector className='inline'></Vector></p>
            <h2 className='text-mp-dark-2 text-4xl font-bold'>Explore</h2>
        </div>
        <div>
            <DropDown/>  
        </div>    
        <div className='lg:flex block justify-around'>
            <div className=' order-last pt-4'>
                <div className='lg:block hidden'>
                    <Categories/>
                    <span><Artists/></span> 
                    <Color/>
                </div>
                <div className='lg:hidden sm:flex block'>
                    <span className='order-last'>
                        <span className='pb-4'><Color/></span>
                        <span><Categories/></span>
                    </span>
                    <span>
                        <Artists/> 
                    </span>
                </div>
            </div>
            <div className='grid lg:grid-cols-3 grid-cols-2 lg:w-3/4 w-full pt-4 gap-y-5 gap-x-3'>
                <NFT/>
                <NFT/>
                <NFT/>
                <NFT/>
                <NFT/>
                <NFT/>
            </div>
        </div>  
    </div>
  )
}

export default explore_2