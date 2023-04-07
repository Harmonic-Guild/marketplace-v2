import React from "react";
import Near from "../icons/near.svg";
import {parseNearAmount } from "near-api-js/lib/utils/format";
import {useWallet } from '@mintbase-js/react'
import {TransactionSuccessEnum, buy, execute } from '@mintbase-js/sdk'

const PurchaseNft = ({ args, tokensData, thingId, price, isConnected }: { args: any; tokensData: any; thingId: string; price: string; isConnected: boolean }) => {
  const { selector }  = useWallet();
  
  const marketId = tokensData &&  tokensData[0]?.market_id;

    const handleBuy = async () => {
        if(marketId === process.env.NEXT_PUBLIC_marketAddress){
            
            await oldBuy();
        }   
        else{
          await newBuy();
        }
        
    };

    const tokenId = tokensData && tokensData[0].token.token_id! //+ ":" + thingId.split(":")[0];
    const oldBuy = async () => {

        console.log('old');

        const oldBuyParams: any = {
            contractAddress: args.marketAddress,
            methodName: 'make_offer',
            args: {token_id: args.token_id, price: args.price,}
        }
        
        const wallet = await selector.wallet();

        const callbackArgs = {args: {}, type: TransactionSuccessEnum.MAKE_OFFER}

        return await execute({wallet, callbackUrl:'https://www.mintbase.xyz/success'}, [oldBuyParams]);
    }

    const newBuy = async () => {
        console.log('new');
        
        const wallet = await selector.wallet();
      
        const buyArgs = {contractAddress: process.env.NEXT_PUBLIC_STORE_NAME!, tokenId: tokenId!, marketId: marketId!, price: parseNearAmount(price.toString())!,}
      
        await execute({wallet}, buy(buyArgs));

    }
    
    return (
        <div className="flex flex-col lg:flex-row lg:justify-between items-center  border border-primary-color bg-secondary-color rounded-lg w-full tokenPriceNumber px-6 py-6 mt-10">
            <div className="flex items-center justify-between gap-2 mb-3 lg:mb-0 font-medium text-lg">
                <div className="font-header">Get it at:</div>
                <div className="font-bold text-xl">{price}</div>
                <div>
                    <Near className="w-4 h-4" fill="black" />
                </div>
            </div>
            <div className="w-full lg:w-3/5">
                <button
                    onClick={handleBuy}
                    className={`w-full py-2 rounded-md text-lg font-bold text-gray-900 px-5 border border-card ${
                        isConnected ? "bg-card hover:bg-primary-color" : "border border-secondary-color py-2 cursor-not-allowed"
                    }`}
                >
                    Purchase
                </button>
            </div>
        </div>
    );
};

export default PurchaseNft;

