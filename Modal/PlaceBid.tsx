import { useState } from 'react'
import Near from '../icons/near.svg'
import { AiOutlineClose } from 'react-icons/ai';

import styles from "../styles/MakeOffer.module.scss";

const PlaceBid = ({buy, closeModal}: any) => {

    const [bid, setBid] = useState("0")

    const handleChange = (e: any) => {
        setBid(e.target.value);
    };

  return (
    <div className={`${styles["modal-cont"]} glass-morphism`}>
                    <div className={`mx-auto w-4/5 relative top-80 lg:top-52 rounded-xl bg-white ${styles["inner-cont"]}`}>
                        <div className="flex w-full justify-between">
                            <p className="text-xl font-bold">Buster character color</p>
                            <span
                                className="text-gray-400 border border-mp-brown-1 rounded-full p-2 cursor-pointer"
                                onClick={() => closeModal(false)}
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
                                onClick={() => buy(bid)}
                                className="border-2 rounded-xl outline-none btnColor py-2 font-medium px-6 lg:px-12 text-gray-800"
                            >
                                Place bid
                            </button>
                        </div>
                    </div>
                </div>
  )
}

export default PlaceBid