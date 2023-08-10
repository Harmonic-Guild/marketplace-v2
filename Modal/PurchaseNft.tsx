import React from "react";
import { useCallback } from 'react';
import Near from "../icons/near.svg";
import {parseNearAmount } from "near-api-js/lib/utils/format";
// import { useWallet } from "../services/providers/MintbaseWalletContext";
import {useWallet } from '@mintbase-js/react'
import { ContractCall, NearContractCall, NearExecuteOptions, buy, execute } from '@mintbase-js/sdk'


const PurchaseNft = ({ args, tokensData, thingId, price, isConnected }: { args: any; tokensData: any; thingId: string; price: string; isConnected: boolean }) => {
  const { selector }  = useWallet();

  // const { wallet } = useWallet();
  
  const marketId = tokensData.listings &&  tokensData.listings[0]?.market_id;

    // handler function to call the wallet methods to proceed the buy.
    const handleBuy = async () => {
        if(marketId === process.env.NEXT_PUBLIC_marketAddress){
            
            await oldBuy();
        }   
        else{
          await newBuy();
        }
        
    };


    
    const tokenId = tokensData && tokensData[0].token.token_id! //+ ":" + thingId.split(":")[0];

    const oldBuyParams: any = {
        contractAddress: args.marketAddress,
        methodName: 'make_offer',
        args: {token_id: args.token_id, price: args.price},
    }

    const oldBuy = async () => {
        console.log('old');
        
        const wallet = await selector.wallet();

        return await execute({wallet}, oldBuyParams);
    }
    
    const newBuy = async () => {
        
        const wallet = await selector.wallet();
    
        console.log('new', tokenId);
        
      
        const buyArgs = {contractAddress: process.env.NEXT_PUBLIC_STORE_NAME!, tokenId: tokenId!, marketId: marketId!, price: parseNearAmount(price.toString())! , referrerId: process.env.NEXT_PUBLIC_REFERRAL_ID}
      
        await execute({wallet}, buy(buyArgs));

    }

    // const newBuy = useCallback(async () => {
    
    //     const txns = [
    //       {
    //         receiverId: marketId,
    //         functionCalls: [
    //           {
    //             methodName: 'buy',
    //             receiverId: marketId,
    //             gas: '200000000000000',
    //             args: {
    //               nft_contract_id: process.env.NEXT_PUBLIC_STORE_NAME,
    //               token_id: tokenId,
    //               referrer_id: process.env.NEXT_PUBLIC_REFERRAL_ID
    //             //     process.env.NEXT_PUBLIC_REFERRAL_ID || TESTNET_CONFIG.referral,
    //             },
    //             deposit: parseNearAmount(price.toString()),
    //           },
    //         ],
    //       },
    //     ];
    
    //     await wallet!.executeMultipleTransactions({
    //       transactions: txns as never,
    //       options: {
    //         //callbackUrl: `${window.location.origin}/wallet-callback`,
    //         meta: JSON.stringify({
    //           type: 'make-offer',
    //           args: {
    //             tokenId,
    //             price: parseNearAmount(price.toString()),
    //           },
    //         }),
    //       },
    //     });
    //   }, [price, tokenId, wallet]);
    

    
    
    
    return (
        <div className="flex flex-col lg:flex-row lg:justify-between items-center  border border-primary-color bg-secondary-color rounded-lg w-full tokenPriceNumber px-6 py-6 mt-10">
            <div className="flex items-center justify-between gap-2 mb-3 lg:mb-0 font-medium text-lg">
                <div className="font-header text-primary-color">Get it at:</div>
                <div className="font-bold text-xl">{price}</div>
                <div>
                    <Near className="w-4 h-4" fill="white" />
                </div>
            </div>
            <div className="w-full lg:w-3/5">
                <button
                    onClick={handleBuy}
                    className={`w-full py-2 rounded-md text-lg font-bold text-white border-white px-5 border ${
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
