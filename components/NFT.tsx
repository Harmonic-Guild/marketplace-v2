import { FC } from "react";
import Link from "next/link";
import Near from "../icons/near.svg";
import { formatNearAmount } from "near-api-js/lib/utils/format";
import Image from "next/image";
import { Token } from '../constants/interfaces';

import styles from "../styles/NFT.module.scss";
import { resolveUrl } from '../helpers/resolveUrl';

interface Props {
    token: Token;
    baseUri?: string | undefined;
}

const NFT: FC<Props> = ({ token }) => {
    // const { thing, lists } = token;
    // const list = lists[0];

    return (
        <Link href={`/thing/${token.metadata_id}`} passHref>
            <a className={`w-[90%] inline-block rounded-2xl cursor-pointer p-5 bg-card bg-opacity-10 border border-solid border-primary-color mx-[5%] my-4 nft_height`}>
                <div className="">
                    <div className="object-contain mx-auto">
                        <Image
                            className="object-contain mx-auto rounded-lg"
                            // src="https://coldcdn.com/api/cdn/bronil/HM9kQpGaqbzqugnArmkC0Dej5U5yKYT4RPvw6r1SELQ"//{media}
                            height={500}
                            width={500}
                            objectFit="cover"
                            src={resolveUrl(token.media)} 
                            alt={"alt"}
                        />
                    </div>

                    <div className="text-sm py-2 text-mp-dark-3 relative">
                     
                        <div className={`font-text ${styles.title}`}>{token.title}</div>
                        <div>
                            <div className="flex gap-2 items-center text-lg">
                                {token.price ? (
                                    
                                        <div className="flex items-center gap-2 whitespace-nowrap">
                                            <div>
                                                Price:{" "}
                                                <span className="font-bold">
                                                    {formatNearAmount(Number(token?.price).toLocaleString("fullwide", { useGrouping: false }), 5)}
                                                </span>
                                            </div>
                                            <div>
                                                <Near className="w-4 h-4" fill="black" />
                                            </div>
                                        </div>
                                    
                                ) : (
                                    <span className="text-transparent">_</span>
                                )}
                            </div>
                        </div>
                        <div className="flex mt-4 justify-between">
                            <button className={`font-header bg-gradient-to-l from-primary-color to-secondary-color hover:bg-gradient-to-r px-4 py-2 text-white flex items-center gap-2 lg:px-5 lg:py-3 font-semibold rounded-lg`}>
                                <div className="">View NFT</div>
                                <span>&rarr;</span>
                            </button>
                        </div>
                    </div>
                </div>
            </a>
        </Link>
    );
};

export default NFT;
