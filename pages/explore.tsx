import Image from 'next/image';
import DropDown from '../components/Dropdown-Filters';
import NFT from '../components/NFT';
import Vector from '../icons/Vector.svg'
import Cross from '../icons/cross.svg'
import Burger from '../icons/burger.svg'
import Lists from '../icons/lists.svg'



function Explore() {
    return ( 
        <div className='my-12 w-10/12 mx-auto'>
            <div className='text-center'>
                <p className='text-mp-orange-1'>Lorem <Vector className='inline'></Vector></p>
                <h2 className='text-mp-dark-2 text-6xl font-bold'>Explore</h2>
            </div>

            {/* Sort Section */}
            <div className='flex w-full justify-between mt-8'>
                {/* drop downs */}
                <DropDown/>
                {/* toggles */}
                <div className="flex w-1/5 justify-end ">
                    <div className='flex w-2/5 justify-around'>
                        <Burger className="my-2"></Burger>
                        <Lists className="mt-2"></Lists>
                    </div>
                </div>
            </div>

            
            <div className='grid grid-cols-8 gap-48'>
                {/* checkboxes */}
                <div className="col-end-8 col-span-3 order-2">
                    <div className="flex justify-end">
                        <div className="w-4/5 px-4 py-8 text-sm border-2 rounded-md">
                            <h3 className='text-xl font-semibold text-mp-dark-1 my-3'>Categories</h3>
                            <div className="flex flex-wrap text-mp-gray-6">
                                <div className="chip">not up for bidding <Cross className="mx-1 my-1"></Cross></div>
                                <div className="chip">up for bidding <Cross className="mx-1 my-1"></Cross></div>
                                <div className="chip">purchase direct <Cross className="mx-1 my-1"></Cross></div>
                            </div>  
                        </div>  
                    </div>

                    <div className="flex justify-end mt-3">
                        <div className="w-4/5 px-4 pb-8 pt-4 text-sm border-2 rounded-md">
                            <input type='text' placeholder='Search By Artist' className="w-full outline-none border rounded-sm p-2 bg-mp-gray-2 text-mp-gray-4" />
                            <h3 className='text-xl font-semibold text-mp-dark-1 my-3'>Artist Names</h3>

                            <div className="text-mp-gray-6">
                                <div className="artist">
                                    <input type="checkbox" className='h-12 hover:cursor-pointer outline-mp-blue-1'/>

                                </div>
                                <div className="artist">

                                </div>
                                <div className="artist">

                                </div>
                            </div>  
                        </div>  
                    </div>
                </div>

                {/* nfts wrapper */}
                <div className="col-start-1 col-end-6 h-4 order-1 grid grid-cols-3 p-4 gap-3">

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