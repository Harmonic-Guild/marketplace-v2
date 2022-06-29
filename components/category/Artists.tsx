import React from 'react'

const Artists = () => {
  return (
    <div className="px-4 p-4 text-sm border-2 rounded-md w-4/5 mx-9 my-3">
        <input type='text' placeholder='Search By Artist' className="w-full outline-none border rounded-md p-2 bg-mp-gray-2 text-mp-gray-4" />
        <h3 className='text-xl font-semibold text-mp-dark-1 my-3'>Artist Names</h3>

        <div className="text-mp-gray-6">
            <div className="artist">
                <span className='flex'>
                    <input type="checkbox" name="artist" id="" className=' w-5 h-5 '/>
                    <p className='pl-2'>Ben Afleck</p>
                </span>
                <p className=''>98 </p>
            </div>
            <div className="artist">
                <span className='flex'>
                    <input type="checkbox" name="artist" id="" className=' w-5 h-5 '/>
                    <p className='pl-2'>Joseph Morgan</p>
                </span>
                <p className=''>12</p>
            </div>
            <div className="artist">
                <span className='flex'>
                    <input type="checkbox" name="artist" id="" className=' w-5 h-5 '/>
                    <p className='pl-2'>Emilia Clarke</p>
                </span>
                <p className=''>56 </p>
            </div>
            <div className="artist">
                <span className='flex'>
                    <input type="checkbox" name="artist" id="" className=' w-5 h-5 '/>
                    <p className='pl-2'>Leonardo Da Vinci</p>
                </span>
                <p className=''>8989 </p>
            </div>
            <div className="artist">
                <span className='flex'>
                    <input type="checkbox" name="artist" id="" className=' w-5 h-5 '/>
                    <p className='pl-2'>Mikel Angelo</p>
                </span>
                <p className=''>506 </p>
            </div>
        </div>                      
    </div> 
  )
}

export default Artists