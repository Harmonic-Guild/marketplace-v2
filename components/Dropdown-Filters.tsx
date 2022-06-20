import { useState } from 'react';
import Down from '../icons/down.svg'
import Up from '../icons/up.svg'

function DropDown() {

    const [pop, setPop] = useState<{}>(false)
    const [type ,setType] = useState<boolean>(false)
    const [range ,setRange] = useState<boolean>(false)

    return ( 
        <div className='flex w-3/5 justify-start'>
                    <div className="justify-around flex w-5/6">
                        <div className='p-2 text-mp-gray-4'>Sort by:</div>
                        <div className="w-1/4">
                            <div className={`dropdown ${pop? 'bg-mp-gray-2': 'bg-white w-full'}`} onClick={()=> setPop(!pop)}> 
                                <p className=''>Popularity</p>
                                {pop? (
                                    <Up className="h-full w-fit py-1 px-2"></Up>
                                ) : (
                                    <Down className="h-full w-fit py-1 px-2"></Down>
                                )}
                                
                            </div>
                            {/* dropdown Items */}
                            {!!pop && (
                                <ul className='dropdown-content'>
                                <li className='dropdown-item'>Highest Bid</li>
                                <li className='dropdown-item'>This Week</li>
                                <li className='dropdown-item'>Popular Artist</li>
                            </ul>
                            )}
                        </div>
                        <div className="w-1/4">
                            <div className={`dropdown ${type? 'bg-mp-gray-2': 'bg-white'}`} onClick={()=> setType(!type)}>
                                <p className=''>Type</p> 
                                {type? (
                                    <Up className="h-full w-fit py-1 px-2"></Up>
                                ) : (
                                    <Down className="h-full w-fit py-1 px-2"></Down>
                                )}
                                
                            </div>
                            {/* dropdown Items */}
                            {!!type && (
                                <ul className='dropdown-content'>
                                <li className='dropdown-item'>Video</li>
                                <li className='dropdown-item'>Audio</li>
                                <li className='dropdown-item'>GIF</li>
                                <li className='dropdown-item'>Image</li>
                            </ul>
                            )}
                        </div>
                        <div className="w-1/4">
                            <div className={`dropdown ${range? 'bg-mp-gray-2': 'bg-white'}`} onClick={()=> setRange(!range)}>
                                <p className=''>Price Range</p>
                                {range? (
                                    <Up className="h-full w-fit py-1 px-2"></Up>
                                ) : (
                                    <Down className="h-full w-fit py-1 px-2"></Down>
                                )}
                                
                            </div>
                            {/* dropdown Items */}
                            {!!range && (
                                <ul className='dropdown-content'>
                                <li className='dropdown-item'>0.1-5 Near</li>
                                <li className='dropdown-item'>5-20 Near</li>
                                <li className='dropdown-item'> &gt; 20 Near</li>
                            </ul>
                            )}
                        </div> 
                    </div>
                </div>
     );
}

export default DropDown;