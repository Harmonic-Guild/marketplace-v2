import React from "react";
import { useCallback } from 'react';
import Near from "../icons/near.svg";
import {parseNearAmount } from "near-api-js/lib/utils/format";
import { useWallet } from "../services/providers/MintbaseWalletContext";


const PurchaseNft = ({ buy, tokensData, thingId, price, isConnected }: { buy: any; tokensData: any; thingId: string; price: string; isConnected: boolean }) => {
    

    const { wallet } = useWallet();

    const marketId = tokensData.listings[0]?.market_id;

    // handler function to call the wallet methods to proceed the buy.
    const handleBuy = async () => {
        if(marketId === process.env.NEXT_PUBLIC_marketAddress){
            await buy();
        }   
        else{
            await newBuy();
        }
        
    };


    
    const tokenId = tokensData.listings[0]?.token.id! //+ ":" + thingId.split(":")[0];

    const newBuy = useCallback(async () => {
    
        const txns = [
          {
            receiverId: marketId,
            functionCalls: [
              {
                methodName: 'buy',
                receiverId: marketId,
                gas: '200000000000000',
                args: {
                  nft_contract_id: process.env.NEXT_PUBLIC_STORE_NAME,
                  token_id: tokenId,
                  referrer_id: process.env.NEXT_PUBLIC_REFERRAL_ID
                //     process.env.NEXT_PUBLIC_REFERRAL_ID || TESTNET_CONFIG.referral,
                },
                deposit: parseNearAmount(price.toString()),
              },
            ],
          },
        ];
    
        await wallet!.executeMultipleTransactions({
          transactions: txns as never,
          options: {
            //callbackUrl: `${window.location.origin}/wallet-callback`,
            meta: JSON.stringify({
              type: 'make-offer',
              args: {
                tokenId,
                price: parseNearAmount(price.toString()),
              },
            }),
          },
        });
      }, [price, tokenId, wallet]);
    

    
    
    
    return (
        <div className="flex flex-col lg:flex-row lg:justify-between items-center  border border-primary-color bg-secondary-color rounded-lg w-full tokenPriceNumber px-6 py-6 mt-10">
            <div className="flex items-center justify-between gap-2 mb-3 lg:mb-0 font-medium text-lg">
                <div>Get it at:</div>
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
