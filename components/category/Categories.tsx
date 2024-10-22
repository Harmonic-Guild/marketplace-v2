import React, { useState } from "react";
import Cross from "../../icons/cross.svg";

const Categories = () => {
    const [show, setShow] = useState(false);
    return (
        <div className="px-4 pt-6 pb-8 text-sm border-2 rounded-md w-full mx-0 my-3 cursor-pointer">
            <h3 className="text-xl font-semibold text-mp-dark-1 mb-3" onClick={() => setShow(!show)}>
                Categories
            </h3>
            {show && (
                <div className="flex flex-wrap text-mp-gray-6">
                    <div className="chip">
                        not up for bidding <Cross className="mx-1 my-1"></Cross>
                    </div>
                    <div className="chip">
                        up for bidding <Cross className="mx-1 my-1"></Cross>
                    </div>
                    <div className="chip">
                        purchase direct <Cross className="mx-1 my-1"></Cross>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Categories;
