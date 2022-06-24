import Link from 'next/link'
import { useEffect, useState } from 'react'
import Near from '../icons/near.svg'
import Right from '../icons/right.svg'
import Share from '../icons/share.svg'
import {formatNearAmount} from 'near-api-js/lib/utils/format'
import Image from 'next/image'

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
            <div className="border border-mp-brown-2 rounded-md bg-mp-peach-2 cursor-pointer">
                <div className="p-2">
                    
                        {metadata.animation_hash ? (
                            <video controls className='h-64 object-cover mx-auto rounded-md shadow-lg shadow-gray-300 ' poster={metadata.media} controlsList="nodownload" muted>
                                <source src={metadata.animation_url} ></source>
                            </video>
                        ) : (
                            <div className="h-64 object-cover mx-auto rounded-md shadow-lg shadow-gray-300 ">
                                <Image
                                // src="https://coldcdn.com/api/cdn/bronil/HM9kQpGaqbzqugnArmkC0Dej5U5yKYT4RPvw6r1SELQ"//{media}
                                height={260}
                                width={260}
                                objectFit="cover"
                                src={metadata.media}
                                alt={'alt'} />
                            </div>
                        )}
                        <div className="text-sm py-2 text-mp-dark-3 relative">
                            {list?.offer?.timeout && <div className="timer">timeout :{new Date(list?.offer?.timeout).toLocaleDateString()}
                            </div>}
                            <div className="font-semibold mt-3 py-1 h-12">{metadata.title}</div>
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
                                <div className="flex relative">
                                    <div className='bg-red-700 rounded-full h-7 w-7 absolute right-12 p-1 text-white'>MZ</div>
                                    <div className='bg-blue-700 rounded-full h-7 w-7 absolute right-7 text-white p-1'>RR</div>
                                    <div className='bg-green-700 rounded-full h-7 w-7 absolute right-2 text-white p-1'>SM</div>
                                </div>
                            </div>
                            <div className="flex mt-4 pt-1 justify-between">
                                <button className='flex action-btn'>
                                    <span className=''>
                                    {
                                    list? list?.offer?.price? 'Bid': 'Get Details' : 'N/A'
                                    }
                                    </span> 
                                     <span className='border-l border-black pl-2 ml-2'><Right></Right></span> 
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