import Link from 'next/link'
import { useEffect, useState } from 'react'
import Near from '../icons/near.svg'
import Right from '../icons/right.svg'
import Share from '../icons/share.svg'
import {formatNearAmount} from 'near-api-js/lib/utils/format'
import Image from 'next/image'
import { AiOutlineRight } from 'react-icons/ai'
import { FiPlayCircle } from 'react-icons/fi'

function NFT({token, baseUri}: any) {
    
    const {thing, list} = token;
    
    const [metadata, setMetadata] =
      useState<{
        [key: string]: string
      } | null>(null)
  
    const fetchMetadata = async (url: string) => {
      
      const response = await fetch(url)
  
      const result = await response.json()
  
      if (!result) return
  
      setMetadata(result)
      
    }
  
    useEffect(() => {
      fetchMetadata(`${baseUri}/${thing.metaId}`)
      
      
    }, [])
  
    if (!metadata) return null    
    
    
    return ( 
        <Link href={`/thing/${thing.id}`} passHref>
            <div className="lg:w-full md:w-5/6  border border-mp-brown-2 rounded-2xl bg-mp-peach-2 cursor-pointer">
                <div className="p-3">

                        {metadata.animation_hash ? (
                            // <video controls className='object-contain mx-auto rounded-lg' poster={metadata.media} controlsList="nodownload" muted>
                            //     <source src={metadata.animation_url} ></source>
                            // </video>
<<<<<<< HEAD
                            <div className="object-contain mx-auto">
=======
                            <div className="object-contain mx-auto rounded-lg relative">
>>>>>>> 4096af738ce360f9c7f276fbc81c1d18da0de0e4
                                <Image
                                // src="https://coldcdn.com/api/cdn/bronil/HM9kQpGaqbzqugnArmkC0Dej5U5yKYT4RPvw6r1SELQ"//{media}
                                height={500}
                                width={500}
                                objectFit="cover"
                                className='rounded-lg'
                                src={metadata.media}
                                alt={'alt'} />
<<<<<<< HEAD
                                <div className='absolute z-10'><FiPlayCircle className='w-12 h-12'/></div>
=======
                                
                                <div className='absolute w-7 h-7 rounded-lg bg-gray-900 top-1/2 left-1/2 text-white  cursor-pointer'>play</div>
>>>>>>> 4096af738ce360f9c7f276fbc81c1d18da0de0e4
                            </div>
                        ) : (
                            <div className="object-contain mx-auto">
                                <Image
                                // src="https://coldcdn.com/api/cdn/bronil/HM9kQpGaqbzqugnArmkC0Dej5U5yKYT4RPvw6r1SELQ"//{media}
                                height={500}
                                width={500}
                                objectFit="cover"
                                className='rounded-lg'
                                src={metadata.media}
                                alt={'alt'} />
                            </div>
                        )}
                        <div className="text-sm py-2 text-mp-dark-3 relative">
                            {list?.offer?.timeout && <div className="timer sm:flex hidden">timeout :{new Date(list?.offer?.timeout).toLocaleDateString()}
                            </div>}
                            <div className="flex md:hidden absolute text-white rounded-md px-2 py-1 -top-4 left-16">
                                <div className='bg-red-700 rounded-full h-7 w-7 absolute right-12 p-1 text-white'>MZ</div>
                                <div className='bg-blue-700 rounded-full h-7 w-7 absolute right-7 text-white p-1'>RR</div>
                                <div className='bg-green-700 rounded-full h-7 w-7 absolute right-2 text-white p-1'>SM</div>
                            </div>
                            <div className="font-semibold my-1 py-1 text-sm">{metadata.title}</div>
                            <div className="flex my-1 py-1 justify-between">
                                <p className='flex'>
                                    {list? list?.offer?.price?
                                     (<>
                                     Last Bid: {formatNearAmount(Number(list?.offer?.price).toLocaleString('fullwide', { useGrouping: false }),5)}
                                     <span className='pt-1  ml-1'><Near></Near></span>
                                    </>):
                                    (<>
                                        Price: {formatNearAmount(Number(list?.price).toLocaleString('fullwide', { useGrouping: false }),5)}
                                        <span className='pt-1  ml-1'><Near></Near></span>
                                       </>): 
                                    `Not Available`
                                    }
                                    </p>
                                <div className="md:flex hidden relative">
                                    <div className='bg-red-700 rounded-full h-7 w-7 absolute right-12 p-1 text-white'>MZ</div>
                                    <div className='bg-blue-700 rounded-full h-7 w-7 absolute right-7 text-white p-1'>RR</div>
                                    <div className='bg-green-700 rounded-full h-7 w-7 absolute right-2 text-white p-1'>SM</div>
                                </div>
                            </div>
                            <div className="flex mt-4 pt-1 justify-between">
                                <button className='flex action-btn '>
                                    <span className=''>
                                    {
                                    list? list?.offer?.price? 'Bid': 'Get Details' : 'N/A'
                                    }
                                    </span> 
                                     <span className='border-l border-black  md:ml-2 ml-0'><AiOutlineRight className=' w-6 h-6'/></span> 
                                     </button>
                                <button><Share></Share></button>
                            </div>
                        </div>
                </div>
            </div>
        </Link>
    );
}

export default NFT;