import React from "react";
import Near from "../icons/near.svg";
import { parseNearAmount } from "near-api-js/lib/utils/format";
import { useWallet } from "@mintbase-js/react";
import { ContractCall, NearContractCall, NearExecuteOptions, buy, execute } from "@mintbase-js/sdk";

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
    const { selector } = useWallet();

    const marketId = listings[0]?.market_id;
    
    // handler function to call the wallet methods to proceed the buy.
    const handleBuy = async () => {
        if (marketId === process.env.NEXT_PUBLIC_marketAddress) {
            await oldBuy();
        } else {
            await newBuy();
        }
    };

    const tokenId = listings[0].token.token_id!; //+ ":" + thingId.split(":")[0];
    

    const oldBuyParams: any = {
        contractAddress: listings[0]?.market_id,
        methodName: "make_offer",
        args: { token_id: listings[0]?.token.id! + ":" + thingId.split(":")[0], price: listings[0].price },
    };

    const oldBuy = async () => {
        console.log("old");

        // return await execute({ wallet }, oldBuyParams);
    };

    const newBuy = async () => {

        console.log("new", tokenId);

        const wallet = await selector.wallet();

        const buyArgs = {
            // contractAddress: process.env.NEXT_PUBLIC_STORE_NAME!,
            tokenId: tokenId!,
            // marketId: marketId!,
            price: parseNearAmount(price.toString())!,
            // referrerId: process.env.NEXT_PUBLIC_REFERRAL_ID,
        };

        
        await execute({ wallet }, buy(buyArgs));
    };

    return (
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
                    onClick={handleBuy}
                    className={`w-full py-2 rounded-md text-lg font-bold text-font-color px-5 border border-font-color bg-primary-color`}
                >
                    Purchase
                </button>
            </div>
        </div>
    );
};

export default PurchaseNft;
