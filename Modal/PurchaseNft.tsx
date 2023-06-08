import React, { useState } from "react";
import Near from "../icons/near.svg";
import { parseNearAmount } from "near-api-js/lib/utils/format";
import { useWallet } from "@mintbase-js/react";
import { BuyArgs, buy, execute } from "@mintbase-js/sdk";
import NotConnected from "./NotConnected";

const PurchaseNft = ({
    listings,
    thingId,
    price,
    isConnected,
}: {
    listings: any;
    tokensData: any;
    thingId: string;
    price: string;
    isConnected: boolean;
}) => {
    const [oldToken, setOldToken] = useState<boolean>()
    const [showModal, setShowModal] = useState<boolean>(false)
    const { selector } = useWallet();

    const marketId = listings[0]?.market_id;

    const closeModal = () => {
        setShowModal(false)
    }

    // handler function to call the wallet methods to proceed the buy.
    const handleBuy = async () => {
        if (marketId === process.env.NEXT_PUBLIC_marketAddress) {
        setOldToken(true)
            // await oldBuy();
        } else {
            await newBuy();
        }
    };

    const tokenId = listings[0].token.token_id!; //+ ":" + thingId.split(":")[0];

    const oldBuyParams: BuyArgs = {
        contractAddress: listings[0]?.market_id,
        tokenId: listings[0]?.token.id!, // + ":" + thingId.split(":")[0],
        price: listings[0].price 
    };

    const oldBuy = async () => {
        const wallet = await selector.wallet();
        console.log("old");

        // return await execute({ wallet }, {
        //     contractAddress: process.env.NEXT_PUBLIC_STORE_NAME!,
        //     methodName: "buy",
        //     args: oldBuyParams,
        //     gas: "300",
        //     deposit: 0,
        // } );
    };

    const newBuy = async () => {
        console.log("new", tokenId);

        const wallet = await selector.wallet();

        const buyArgs: BuyArgs = {
            // contractAddress: process.env.NEXT_PUBLIC_STORE_NAME!,
            tokenId: tokenId!,
            // marketId: marketId!,
            price: parseNearAmount(price.toString())!,
            // referrerId: process.env.NEXT_PUBLIC_REFERRAL_ID,
        };

        await execute({ wallet },
            buy(buyArgs) 
            // {
            // contractAddress: process.env.NEXT_PUBLIC_STORE_NAME!,
            // methodName: "buy",
            // args: buyArgs,
            // gas: "300",
            // deposit: 0 }
            );
    };


    return (
        <>
        {showModal && <NotConnected closeModal={closeModal} />}
        {oldToken? (
            <div className="text-center flex flex-col lg:flex-row lg:justify-between items-center  border border-primary-color bg-card rounded-lg w-full tokenPriceNumber px-6 py-6 mt-10">This NFT is on the Old Market. Please come back later</div>
        ) : (
            <>
            <div className="flex flex-col lg:flex-row lg:justify-between items-center  border border-primary-color bg-card rounded-lg w-full tokenPriceNumber px-6 py-6 mt-10">
            <div className="flex items-center justify-between gap-2 mb-3 lg:mb-0 font-medium text-lg">
                <div className="font-header text-font-color">Get it at:</div>
                <div className="font-bold text-xl text-font-color">{price}</div>
                <div>
                    <Near className="w-4 h-4" fill="black" />
                </div>
            </div>
            <div className="w-full lg:w-3/5">
                <button
                    onClick={isConnected ? handleBuy : () => setShowModal(true)}
                    className={`w-full py-2 rounded-md text-lg font-bold text-font-color px-5 border border-font-color bg-primary-color`}
                >
                    {isConnected ?'Purchase': 'Connect Wallet'}
                </button>
            </div>
        </div>
            </>
        )}
        </>
    );
};

export default PurchaseNft;