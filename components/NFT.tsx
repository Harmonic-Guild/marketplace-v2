import { FC } from "react";
import Link from "next/link";
import Near from "../icons/near.svg";
import { formatNearAmount } from "near-api-js/lib/utils/format";
import Image from "next/image";
import { AiOutlineRight } from "react-icons/ai";
import { BiShareAlt } from "react-icons/bi";
import { BsCircle, BsPlayCircle } from "react-icons/bs";
import { Token } from "../constants/interfaces";

import styles from "../styles/NFT.module.scss";

interface Props {
    token: Token;
    baseUri?: string | undefined;
}

const NFT: FC<Props> = ({ token }) => {
    const { thing, lists } = token;
    const list = lists[0];

    return (
        <Link href={`/thing/${thing.id}`} passHref>
            <a className={`${styles.container} nft_height`}>
                <div className="">
                    {thing.metadata.animation_type !== null ||
                    thing.metadata.animation_type !== "image/jpeg" ||
                    thing.metadata.animation_type !== "image/png" ||
                    thing.metadata.animation_type !== "image/gif" ? (
                        // <video controls className='object-contain mx-auto rounded-lg' poster={metadata.media} controlsList="nodownload" muted>
                        //     <source src={metadata.animation_url} ></source>
                        // </video>
                        <div className="object-contain mx-auto rounded-lg relative">
                            <Image
                                className="object-contain mx-auto rounded-lg"
                                // src="https://coldcdn.com/api/cdn/bronil/HM9kQpGaqbzqugnArmkC0Dej5U5yKYT4RPvw6r1SELQ"//{media}
                                height={500}
                                width={500}
                                objectFit="cover"
                                src={thing.metadata.media}
                                alt={"alt"}
                            />

                            <div style={{ top: "40%", left: "45%" }} className="absolute text-white cursor-pointer">
                                <BsPlayCircle className="w-10 h-10" />
                            </div>
                        </div>
                    ) : (
                        <div className="object-contain mx-auto">
                            <Image
                                className="object-contain mx-auto rounded-lg"
                                // src="https://coldcdn.com/api/cdn/bronil/HM9kQpGaqbzqugnArmkC0Dej5U5yKYT4RPvw6r1SELQ"//{media}
                                height={500}
                                width={500}
                                objectFit="cover"
                                src={thing.metadata.media}
                                alt={"alt"}
                            />
                        </div>
                    )}
                    <div className="text-sm py-2 text-mp-dark-3 relative">
                        {/* {list?.autotransfer && (
                            <div className="timer sm:flex hidden">timeout :{new Date(list?.offer?.timeout).toLocaleDateString()}</div>
                        )} */}
                        {/* <div className="flex md:hidden absolute text-white rounded-md px-2 py-1 -top-4 left-16">
                                <div className='bg-red-700 rounded-full h-7 w-7 absolute right-12 p-1 text-white'>MZ</div>
                                <div className='bg-blue-700 rounded-full h-7 w-7 absolute right-7 text-white p-1'>RR</div>
                                <div className='bg-green-700 rounded-full h-7 w-7 absolute right-2 text-white p-1'>SM</div>
                            </div> */}
                        <div className={styles.title}>{thing.metadata.title}</div>
                        <div>
                            <div className="flex gap-2 items-center text-lg">
                                {list ? (
                                    !list?.autotransfer ? (
                                        <div className="flex items-center gap-2">
                                            <div>
                                                Last Bid:{" "}
                                                <span className="font-bold">
                                                    {formatNearAmount(
                                                        Number(list?.offer?.price || 0).toLocaleString("fullwide", { useGrouping: false }),
                                                        5
                                                    )}
                                                </span>
                                            </div>
                                            <div>
                                                <Near className="w-4 h-4" fill="black" />
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2 whitespace-nowrap">
                                            <div>
                                                Price:{" "}
                                                <span className="font-bold">
                                                    {formatNearAmount(Number(list?.price).toLocaleString("fullwide", { useGrouping: false }), 5)}
                                                </span>
                                            </div>
                                            <div>
                                                <Near className="w-4 h-4" fill="black" />
                                            </div>
                                        </div>
                                    )
                                ) : (
                                    `Not Available`
                                )}
                            </div>
                            {/* <div className="md:flex hidden relative">
                                    <div className='bg-red-700 rounded-full h-7 w-7 absolute right-12 p-1 text-white'>MZ</div>
                                    <div className='bg-blue-700 rounded-full h-7 w-7 absolute right-7 text-white p-1'>RR</div>
                                    <div className='bg-green-700 rounded-full h-7 w-7 absolute right-2 text-white p-1'>SM</div>
                                </div> */}
                        </div>
                        <div className="flex mt-4 justify-between">
                            <button className={styles["buy-button"]}>
                                <div className="">{list ? (!list?.autotransfer ? "Bid" : "Buy") : "N/A"}</div>
                                <span>&rarr;</span>
                            </button>
                            {/* <button className='flex action-btn'>
                                    <div className='pr-3'>
                                    {
                                    list? !list?.autotransfer ? 'Bid': 'Get Details' : 'N/A' 
                                    }
                                    </div> 
                                     <div className='border-l border-black pl-3'><AiOutlineRight className=' w-5 h-5'/></div> 
                                </button> */}
                            {/* <button className='text-yellow-500'>
                                    <BiShareAlt className='w-6 h-6 absolute ml-2 mt-2'/>
                                    <BsCircle className='w-10 h-10'/>
                                </button> */}
                        </div>
                    </div>
                </div>
            </a>
        </Link>
    );
};

export default NFT;
