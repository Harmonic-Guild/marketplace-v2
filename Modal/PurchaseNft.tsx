import React from "react";
import Near from "../icons/near.svg";

const PurchaseNft = ({ buy, price, isConnected }: { buy: any; price: string; isConnected: boolean }) => {
    return (
        <div className="flex flex-col lg:flex-row lg:justify-between items-center  border border-primary bg-secondary rounded-lg w-full tokenPriceNumber px-6 py-6 mt-10">
            <div className="flex items-center text-primary justify-between gap-2 mb-3 lg:mb-0 font-medium text-lg">
                <div className="headerFont">Get it at:</div>
                <div className="font-bold text-xl">{price}</div>
                <div>
                    <Near className="w-4 h-4" fill="white" />
                </div>
            </div>
            <div className="w-full lg:w-3/5">
                <button
                    onClick={buy}
                    className={`w-full py-2 rounded-md text-lg font-bold text-gray-900 px-5 border border-card ${
                        isConnected ? "bg-card hover:bg-primary" : "border border-secondary py-2 cursor-not-allowed"
                    }`}
                >
                    Purchase
                </button>
            </div>
        </div>
    );
};

export default PurchaseNft;
