import Image from 'next/image';
import DropDown from '../components/Dropdown-Filters';
import NFT from '../components/NFT';
import Vector from '../icons/Vector.svg'
import Cross from '../icons/cross.svg'
import Burger from '../icons/burger.svg'
import Lists from '../icons/lists.svg'
import { useState } from 'react';



function Explore() {

    const [showOptions, setShowOptions] = useState<boolean>(false)

    return ( 
        <div className='my-12 w-11/12 mx-auto'>
            <div className='text-center'>
                <p className='text-mp-orange-1'>Lorem <Vector className='inline'></Vector></p>
                <h2 className='text-mp-dark-2 text-6xl font-bold'>Explore</h2>
            </div>

            {/* Sort Section */}
            <div className='flex w-full justify-between mt-8'>
                {/* drop downs */}
                <DropDown/>
                {/* toggles */}
                <div className="flex w-1/5 justify-end">
                    <div className='flex w-2/5 justify-around'>
                        <span><Burger className="my-2"></Burger></span>
                        <span onClick={()=> setShowOptions(!showOptions)} className='cursor-pointer'><Lists className="mt-2" ></Lists></span>
                    </div>
                </div>
            </div>

            
            <div className='grid grid-cols-10'>
                {/* checkboxes */}
                {showOptions && (
                    <div className="col-end-11 col-span-3 order-last py-4">
                    <div className="flex justify-end">
                        <div className="w-4/5 px-4 pt-6 pb-8 text-sm border-2 rounded-md">
                            <h3 className='text-xl font-semibold text-mp-dark-1 mb-3'>Categories</h3>
                            <div className="flex flex-wrap text-mp-gray-6">
                                <div className="chip">not up for bidding <Cross className="mx-1 my-1"></Cross></div>
                                <div className="chip">up for bidding <Cross className="mx-1 my-1"></Cross></div>
                                <div className="chip">purchase direct <Cross className="mx-1 my-1"></Cross></div>
                            </div>  
                        </div>  
                    </div>

                    <div className="flex justify-end mt-3">
                        <div className="w-4/5 px-4 p-4 text-sm border-2 rounded-md">
                            <input type='text' placeholder='Search By Artist' className="w-full outline-none border rounded-sm p-2 bg-mp-gray-2 text-mp-gray-4" />
                            <h3 className='text-xl font-semibold text-mp-dark-1 my-3'>Artist Names</h3>

                            <div className="text-mp-gray-6">
                                <div className="artist">
                                    <p className=''>Ben Afleck</p>
                                    <p className=''>98 </p>
                                </div>
                                <div className="artist">
                                    <p className=''>Joseph Morgan</p>
                                    <p className=''>12</p>
                                </div>
                                <div className="artist">
                                    <p className=''>Emilia Clarke</p>
                                    <p className=''>56 </p>
                                </div>
                                <div className="artist">
                                    <p className=''>Leonardo Da Vinci</p>
                                    <p className=''>8989 </p>
                                </div>
                                <div className="artist">
                                    <p className=''>Mikel Angelo</p>
                                    <p className=''>506 </p>
                                </div>
                            </div>  
                        </div>  
                    </div>
                </div>)}

                {/* nfts wrapper */}
                <div className={`col-start-1 ${showOptions?'col-span-7 grid-cols-3' : 'col-span-10 grid-cols-4'} order-1 grid  p-4 gap-3`}>
                    <NFT/>
                    <NFT/>
                    <NFT/>
                    <NFT/>
                    <NFT/>
                    <NFT/>
                </div>

            </div>

        </div>
     );
}

export default Explore;