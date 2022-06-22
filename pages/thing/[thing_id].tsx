import React, {  useState } from "react";
import { BsCircle, BsHeart } from "react-icons/bs";
import { BiShareAlt } from "react-icons/bi";
import { FiLayers } from "react-icons/fi";

const image = [
    {src: 'https://arweave.net/Yjn-nuWnEv8IgiFsw1LPKq1xjfa86yC2WVheWGPpixg', title: 'Buster character color'}
]


const thing_id = ({ id }: {id:string}) =>  {
    

  const [hide, setHide] = useState<boolean>(false)
  const play = () => {
    setHide(!hide)
  }

  return (
    <div className={`w-full h-full p-4 bg-white text-gray-700`}>
      {image.map((image, index) => (
        <div key={index} className="lg:flex block justify-around pl-0 lg:pl-8">
          <div className="lg:w-1/3 w-5/6 rounded-3xl">
            <img src={image.src} alt="" />
          </div>
          <div className="lg:w-2/3 w-full">
                    <div className="flex justify-around w-full container lg:mt-0 mt-3">
                        <span className="lg:text-4xl text-xl font-medium ">Buster Character Color #1234</span>
                        <div className='flex gap-5'>
                            <div className=' text-yellow-300'>
                                <BsCircle className="relative h-12 w-12"/>
                                <BiShareAlt className='absolute h-8 w-8 -mt-10 ml-2 '/>
                            </div>
                            <div className=' text-yellow-300'>
                                <BsCircle className="relative h-12 w-12"/>
                                <BsHeart className="absolute h-8 w-8 -mt-9 ml-2 "/>
                            </div>
                        </div>
                    </div>
                    <div className="flex ml-0 lg:ml-20 w-3/4">
                        <span>Minted on: Jun-14-2022</span> 
                        {/* <TbExternalLink className="text-yellow-300 w-6 h-6"/> */}
                    </div>
                    <div className="w-3/5 ml-2 lg:ml-20 gap-y-8 my-5">
                        <span className="text">Discription</span>
                        <span className="border-b border-yellow-600 py-2 pb-2 z-10 px-44 lg:-ml-24 -ml-20"></span>
                        <p className={hide ? 'pt-2 h-24 overflow-y-scroll ' : 'pt-2 h-16 overflow-y-scroll truncate'}>
                            <span>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic 
                            </span>     
                        </p>
                        <span id='span' onClick={play} className='cursor-pointer text-blue-400 p-2'> {!hide ? '.....see more' : 'see less'}</span>
                        <div className="lg:hidden block">
                            <span className="border-b border-yellow-600 py-2 px-44 -ml-2 "></span>
                            <div className="flex my-6">
                                <span className="mx-2">
                                    <BsCircle className="relative h-8 w-8 text-gray-800"/>
                                    <img src="https://marketplace.mintingmusic.com/images/near.png" alt="" className='w-4 h-4 absolute -mt-6 ml-2'/>
                                </span>
                                <span>
                                    <BsCircle className="relative h-8 w-8 text-gray-800"/>
                                    <FiLayers className="w-4 h-4 absolute -mt-6 ml-2"/>
                                </span>
                            </div>
                                <span className="font-medium text-xl mt-3">Perks</span>
                                <span className="border-b border-yellow-600 py-2 px-44 -ml-14"></span>
                            <div className=" mt-6">
                                <span className="text-sm ">
                                    <li>First Perk</li>
                                    <li>Second Perk</li>
                                    <li>Exclusive access to comunity</li>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className={`lg:flex block justify-between border border-yellow-600 bg-yellow-100 rounded-lg lg:ml-20 ml-0 lg:w-1/2 w-full p-6`}>
                        <div className="flex justify-between lg:block">
                            <div className="flex">
                                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""/>
                                <span className="pl-2">@Latest bidder</span>
                            </div>
                            <span className=" font-medium">Latest bid: </span>

                        </div>
                        <span className="border-b border-yellow-600 lg:hidden flex py-2 px-32"></span>
                        <div className="mt-8 lg:mt-0">
                            <span className="bg-yellow-400 py-4 rounded-md  font-medium text-gray-900 lg:w-1/2 w-full lg:px-3 px-20">Make an offer</span>
                            <span className="text-center lg:flex block pt-4">
                                <p className=" font-medium">Owned by: </p> 
                                <img className="inline-block h-4 w-4 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""/>
                                <span>@owner</span>
                            </span>
                        </div>
                    </div>
                    <div className="hidden lg:flex justify-around mt-5 w-3/5 ml-20">
                        <div>
                            <p className="flex">
                                <span className="font-medium text-xl pr-1">History of NFT</span>
                                {/* <TbExternalLink className="text-yellow-300 w-5 h-5"/> */}
                            </p>
                        </div>
                        <span className=" border-r-2 border-yellow-600 h-20"></span>
                        <div>
                            <div className="flex justify-evenly w-full">
                                <p className="text">Details</p>
                                <span className="border-b px-8 border-yellow-600 mb-4 mx-2"></span>
                                <div className="mx-2">
                                    <BsCircle className="relative h-8 w-8 text-yellow-300"/>
                                    <img src="https://marketplace.sevendeadstars.com/images/near.png" alt="" className='w-4 h-4 absolute -mt-6 ml-2'/>
                                </div>
                                <div>
                                    <BsCircle className="relative h-8 w-8 text-yellow-300"/>
                                    <FiLayers className="w-4 h-4 absolute -mt-6 ml-2"/>
                                </div>
                            </div>
                            <div className="flex justify-evenly mt-3">
                                <p className="font-medium text-xl px-6 mt-3">Perks</p>
                                <span className="text-sm ">
                                    <li>First Perk</li>
                                    <li>Second Perk</li>
                                    <li>Exclusive access to comunity</li>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
      ))}      
    </div>
  )
}
export default thing_id;

export function getServerSideProps({query}: any){

    return {
        props: {
            id: query.thing_id
        }
    }
    
}
