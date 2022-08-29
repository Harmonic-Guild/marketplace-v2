import Cross from '../icons/cross.svg'
function SideOptions() {
    return ( 
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
                </div>
     );
}

export default SideOptions;