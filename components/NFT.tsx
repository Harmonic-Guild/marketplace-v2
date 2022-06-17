function NFT() {
    return ( 
        <div className="border border-mp-brown-2 rounded-md bg-mp-peach-2">
                        <div className="p-2">
                            <img className="max-h-64 object-contain mx-auto rounded-md shadow-lg "
                                // src="https://coldcdn.com/api/cdn/bronil/HM9kQpGaqbzqugnArmkC0Dej5U5yKYT4RPvw6r1SELQ"//{media}
                                src={"https://arweave.net/HM9kQpGaqbzqugnArmkC0Dej5U5yKYT4RPvw6r1SELQ"}
                                alt={'alt'} />
                                <div className="text-sm py-2 text-mp-dark-3">
                                    <div className="font-semibold my-1 py-1">Buster Character Color</div>
                                    <div className="flex my-1 py-1">
                                        <p>Last Bid: 0.25 Near</p>
                                        <div className="">avatars</div>
                                    </div>
                                    <div className="flex mt-1 pt-1">
                                        <button>Get Details</button>
                                        <button>Share</button>
                                    </div>
                                </div>
                        </div>
                    </div>
     );
}

export default NFT;