import Near from '../icons/near.svg'
import Right from '../icons/right.svg'
import Share from '../icons/share.svg'
function NFT() {
    return ( 
        <div className="border border-mp-brown-2 rounded-md bg-mp-peach-2">
                        <div className="p-2">
                            <img className="max-h-64 object-contain mx-auto rounded-md shadow-lg shadow-gray-300 "
                                // src="https://coldcdn.com/api/cdn/bronil/HM9kQpGaqbzqugnArmkC0Dej5U5yKYT4RPvw6r1SELQ"//{media}
                                src={"https://arweave.net/HM9kQpGaqbzqugnArmkC0Dej5U5yKYT4RPvw6r1SELQ"}
                                alt={'alt'} />
                                <div className="text-sm py-2 text-mp-dark-3 relative">
                                    <div className="timer">16:12:56 hrs</div>
                                    <div className="font-semibold my-1 py-1">Buster Character Color</div>
                                    <div className="flex my-1 py-1 justify-between">
                                        <p className='flex'>Last Bid: 0.25 <span className='mt-[.15rem] ml-1'><Near></Near></span></p>
                                        <div className="flex relative">
                                            <div className='bg-red-700 rounded-full h-7 w-7 absolute right-12 p-1 text-white'>MZ</div>
                                            <div className='bg-blue-700 rounded-full h-7 w-7 absolute right-7 text-white p-1'>RR</div>
                                            <div className='bg-green-700 rounded-full h-7 w-7 absolute right-2 text-white p-1'>SM</div>
                                        </div>
                                    </div>
                                    <div className="flex mt-4 pt-1 justify-between">
                                        <button className='flex action-btn'>Get Details <span className='border-l border-black pl-2 ml-2'><Right></Right></span></button>
                                        <button><Share></Share></button>
                                    </div>
                                </div>
                        </div>
                    </div>
     );
}

export default NFT;