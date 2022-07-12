import { useState, useEffect } from 'react';
import Down from '../icons/down.svg'
import Up from '../icons/up.svg'

function DropDown({setFilters}: {setFilters: (param: any)=> void}) {



    const [pop, setPop] = useState<{}>(false)
    const [showType ,setShowType] = useState<boolean>(false)
    const [showRange ,setShowRange] = useState<boolean>(false)
    const [order, setOrder] = useState<Obj|null>(null)
    const [type ,setType] = useState<Obj|null>(null)
    const [range ,setRange] = useState<Obj|null>(null)

    interface Obj {
        text: string;
        value: string
    }

    interface Filter {
        order?: string;
        type?: string;
        range?: string;
    }

    const setFilterData = (): Filter => {
        return {order: order?.value, type: type?.value, range: range?.value }
    }

    
    const handleSelection = async (show: any, func:any, obj: Obj) => {
        await func(obj)
       show(false)
    }

    useEffect(()=> {
        const filters = setFilterData();
        setFilters(filters)

    }, [order, type, range])

    return ( 
        <div className='flex w-3/5 justify-start mt-4'>
                    <div className="justify-around flex w-5/6">
                        <div className='p-2 text-mp-gray-4'>Sort by:</div>
                        <div className="w-1/4">
                            <div className={`dropdown ${pop? 'bg-mp-gray-2': 'bg-white'}`} onClick={()=> setPop(!pop)}> 
                                <p className='w-full'>{order? order.text: 'Order'}</p>
                                {pop? (
                                    <Up className="h-5 w-full py-1 px-2"></Up>
                                ) : (
                                    <Down className="h-5 w-full py-1 px-2"></Down>
                                )}
                                
                            </div>
                            {!!pop && (
                                <ul className='dropdown-content'>
                                <li className='dropdown-item' onClick={()=> handleSelection(setPop, setOrder, {text: 'ascending', value: 'asc'})}>Ascending</li>
                                <li className='dropdown-item' onClick={()=> handleSelection(setPop, setOrder, {text: 'Descending', value: 'desc'})}>Descending</li>
                            </ul>
                            )}
                        </div>
                        <div className="w-1/4">
                            <div className={`dropdown ${showType? 'bg-mp-gray-2': 'bg-white'}`} onClick={()=> setShowType(!showType)}>
                                <p className='w-full'>{type? type.text: 'Type'}</p> 
                                {showType? (
                                    <Up className="h-5 w-full py-1 px-2"></Up>
                                ) : (
                                    <Down className="h-5 w-full py-1 px-2"></Down>
                                )}
                                
                            </div>
                            {/* dropdown Items */}
                            {!!showType && (
                                <ul className='dropdown-content'>
                                <li className='dropdown-item' onClick={()=> handleSelection(setShowType, setType, {text: 'All', value: 'all'})}>All</li>
                                <li className='dropdown-item' onClick={()=> handleSelection(setShowType, setType, {text: 'Video', value: 'video'})}>Video</li>
                                <li className='dropdown-item' onClick={()=> handleSelection(setShowType, setType, {text: 'Audio', value: 'audio'})}>Audio</li>
                                <li className='dropdown-item' onClick={()=> handleSelection(setShowType, setType, {text: 'GIF', value: 'gif'})}>GIF</li>
                                <li className='dropdown-item' onClick={()=> handleSelection(setShowType, setType, {text: 'Image', value: 'image'})}>Image</li>
                            </ul>
                            )}
                        </div>
                        <div className="w-1/4">
                            <div className={`dropdown ${showRange? 'bg-mp-gray-2': 'bg-white'}`} onClick={()=> setShowRange(!showRange)}>
                                <p className='w-full'>{range? range?.text: 'Price Range'}</p>
                                {showRange? (
                                    <Up className="h-5 w-12 py-1 px-2"></Up>
                                ) : (
                                    <Down className="h-5 w-12 py-1 px-2"></Down>
                                )}
                                
                            </div>
                            {/* dropdown Items */}
                            {!!showRange && (
                                <ul className='dropdown-content'>
                                <li className='dropdown-item' onClick={()=> handleSelection(setShowRange, setRange, {text: '1 - 5', value: '1-5'})}>1-5 Near</li>
                                <li className='dropdown-item' onClick={()=> handleSelection(setShowRange, setRange, {text: '5 - 10', value: '5-10'})}>5-10 Near</li>
                                <li className='dropdown-item' onClick={()=> handleSelection(setShowRange, setRange, {text: '10- 100', value: '10-100'})}>10-100 Near</li>
                                <li className='dropdown-item' onClick={()=> handleSelection(setShowRange, setRange, {text: '100+', value: '100+'})}> 100 Near &gt;</li>
                            </ul>
                            )}
                        </div> 
                    </div>
                </div>
     );
}

export default DropDown;