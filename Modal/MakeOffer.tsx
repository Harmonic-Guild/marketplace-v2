import React, { useState } from "react";
import Near from "../icons/near.svg";
import NotConnected from "./NotConnected";
import { formatNearAmount } from "near-api-js/lib/utils/format";

import styles from "../styles/MakeOffer.module.scss";
import PlaceBid from "./PlaceBid";

const MakeOffer = ({ buy, isConnected, bidInfo }: any) => {
    const [showModal, setShowModal] = useState(false);
    const [showNotConnectedModal, setShowNotConnectedModal] = useState(false);

    const handleCLick = () => {
        if (isConnected) {
            setShowModal(true);
        } else {
            setShowNotConnectedModal(true);
        }
    };

    const closeModal = (state: boolean) => {
        setShowNotConnectedModal(state)
        setShowModal(false);
    }

    return (
        <>
            {showModal && <PlaceBid buy={buy} closeModal={closeModal} />}
            {showNotConnectedModal && <NotConnected closeModal={closeModal} />}
            
            <div className={styles.container}>
                <div className="flex flex-col justify-center items-center w-full lg:w-1/2">
                    <div className="flex flex-wrap justify-center items-center gap-2 text-font-color">
                        <span className="font-bold text-lg">Latest bidder - </span>
                        <span className=" text-lg">{bidInfo?.offers[0]?.offered_by || "No Bidder"}</span>
                    </div>

                    <div className="flex flex-row gap-2 mt-3 mb-3 lg:mb-0">
                        <div className="font-medium text-lg">Latest bid: </div>
                        <div className=" text-xl flex items-center gap-2">
                            {bidInfo?.offers[0]?.offer_price ? (
                                <div className="flex items-center gap-1">
                                    {formatNearAmount(Number(bidInfo?.offers[0]?.offer_price || 0).toLocaleString("fullwide", { useGrouping: false }), 5)}
                                    <Near className="w-4 h-4" fill="black" />
                                </div>
                            ) : (
                                "none"
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col flex-grow w-full lg:w-1/2">
                    <div className={styles["button-cont"]}>
                        <button onClick={handleCLick} className={styles["connect-btn"]}>
                            {isConnected ? "Make an offer" : "connect wallet"}
                        </button>
                    </div>

                    <div className="text-center flex flex-col lg:flex-row justify-center items-center mt-3">
                        <p className="font-bold">Owned by - @ {bidInfo?.listed_by ? bidInfo?.listed_by : "None"}</p>
                        <div className="flex"></div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MakeOffer;
