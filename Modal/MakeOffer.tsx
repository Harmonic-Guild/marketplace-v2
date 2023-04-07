import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Near from "../icons/near.svg";
import NotConnected from "./NotConnected";
import { formatNearAmount, parseNearAmount } from 'near-api-js/lib/utils/format';

import styles from '../styles/MakeOffer.module.scss';
import { execute } from "@mintbase-js/sdk";
import { useWallet } from "@mintbase-js/react";
// import { useWallet } from '../services/providers/MintbaseWalletContext';

const MakeOffer = ({ args, isConnected, latestBid, bidder, owner }: any) => {
    const [showModal, setShowModal] = useState(false);
    const [bid, setBid] = useState("0");
    const [showNotConnectedModal, setShowNotConnectedModal] = useState(false);

    const { selector } = useWallet();

    const handleChange = (e: any) => {
        setBid(e.target.value);
    };

    const oldBid = async (bid: string) => {

        const oldBidParams: any = {
            contractAddress: args.marketAddress,
            methodName: 'make_offer',
            args: {token_id: args.token_id},
        }
        const wallet = await selector.wallet();
        oldBidParams['args'].price = bid;

        return await execute({wallet}, { ...oldBidParams });
    }

    return (
        <div className={styles.container}>
            <div className="flex flex-col justify-center items-center w-full lg:w-1/2">
                <div className="flex flex-wrap justify-center items-center gap-2">
                    <span className="font-bold text-lg">Latest bidder - </span>
                    <span className="font-bold text-lg">{bidder}</span>
                </div>

                <div className="flex flex-row gap-2 mt-3 mb-3 lg:mb-0">
                    <div className="font-medium text-lg">Latest bid: </div>
                    <div className="font-bold text-xl flex items-center gap-2">
                        {latestBid ? (
                            <div className="flex items-center gap-1">
                                {formatNearAmount(Number(latestBid || 0).toLocaleString("fullwide", { useGrouping: false }), 5)}
                                <Near className="w-4 h-4" fill="black" />
                            </div>
                        ) : (
                            "none"
                        )}
                    </div>
                </div>
            </div>

            {/* <span className="border-b border-mp-brown-1 lg:hidden flex py-2 "></span> */}
            <div className="flex flex-col flex-grow w-full lg:w-1/2">
                <div className={styles["button-cont"]}>
                    <button
                        onClick={() => (isConnected ? setShowModal(true) : setShowNotConnectedModal(true))}
                        className={isConnected ? styles["connected-btn"] : styles["not-connected-btn"]}
                    >
                        Make an offer
                    </button>
                </div>

                <div className="text-center flex flex-col lg:flex-row justify-center items-center mt-3">
                    <p className="font-bold">Owned by - @ {owner ? owner : "None"}</p>
                    <div className="flex">
                    </div>
                </div>
            </div>
            {showModal ? (
                <div className={`${styles["modal-cont"]} glass-morphism`}>
                    <div className={`mx-auto w-4/5 relative top-80 lg:top-52 rounded-xl bg-white ${styles["inner-cont"]}`}>
                        <div className="flex w-full justify-between">
                            <p className="text-xl font-bold">Buster character color</p>
                            <span
                                className="text-gray-400 border border-mp-brown-1 rounded-full p-2 cursor-pointer"
                                onClick={() => setShowModal(false)}
                            >
                                <AiOutlineClose />
                            </span>
                        </div>
                        <div className="flex font-bold justify-between w-full lg:w-3/5 my-4">
                            <div className="bg-gray-900 text-white rounded-md px-2 py-1">16:12:56 hrs</div>
                            <span className="lg:text-sm text-lg">Time remaining</span>
                        </div>
                        <div className="flex my-4 justify-between w-full lg:w-3/5 border border-gray-400 rounded-lg">
                            <input type="number" className="w-full outline-none" min={0} value={bid} onChange={handleChange} />
                            <span className="border-l border-gray-400 p-2">
                                <Near className="w-4 h-4" fill="black" />
                            </span>
                        </div>

                        <div className="">
                            <button
                                onClick={() => oldBid(parseNearAmount(bid.toString())!.toString())}
                                className="border-2 rounded-xl outline-none btnColor py-2 font-medium px-6 lg:px-12 text-gray-800"
                            >
                                Place bid
                            </button>
                        </div>
                    </div>
                </div>
            ) : null}
            {showNotConnectedModal && <NotConnected />}
        </div>
    );
};

export default MakeOffer;
