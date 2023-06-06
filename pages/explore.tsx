import React from "react";
import { useEffect, useState } from "react";
// import QueryFilters from "../helpers/getQuery";
import { QUERIES, fetchGraphQl } from "@mintbase-js/data";
import { mbjs } from "@mintbase-js/sdk";
import { ResponseType, Token } from "../constants/interfaces";
import dynamic from "next/dynamic";

const NFT = dynamic(() => import("../components/NFT"));

const explore = () => {
    const [tokens, setTokens] = useState<any>([]);
    // const [filterParams, setFilterParams] = useState<any>(null);
    const [showAll, setShowAll] = useState(true);

    const fetchAll = async () => {
        const { data, error } = await fetchGraphQl<ResponseType>({
            query: QUERIES.storeNftsQuery,
            variables: {
                condition: {
                    nft_contract_id: { _in: mbjs.keys.contractAddress },
                    //   ...(showOnlyListed && { price: { _is_null: false } }),
                },
                limit: 20,
                offset: 0,
            },
        });
        return data?.mb_views_nft_metadata_unburned;
    };

    const fetchListed = async () => {
        const { data, error } = await fetchGraphQl<ResponseType>({
            query: QUERIES.storeNftsQuery,
            variables: {
                condition: {
                    nft_contract_id: { _in: mbjs.keys.contractAddress },
                    price: { _is_null: false },
                },
                limit: 20,
                offset: 0,
            },
        });
        return data?.mb_views_nft_metadata_unburned;
    };

    const handleFetchTokens = async () => {
        let myTokens;
        if (showAll) {
            myTokens = await fetchAll();
        } else {
            myTokens = await fetchListed();
        }
        setTokens(myTokens);
    };

    useEffect(() => {
        handleFetchTokens();
    }, [showAll]);

    // fetching

    // const setFilters = (filters: any) => {

    //     const res = QueryFilters(filters);
    //     setFilterParams({ ...res });
    //     console.log(filterParams);
    // };

    const selectTab = (bool: boolean) => {
        setTokens([]);
        setShowAll(bool);
    };

    return (
        <div className="px-8 w-full xl:w-5/6 mx-auto">
            <div className="text-center">
                <h2 className="text-mp-dark-2 text-4xl font-bold font-header">Explore</h2>
            </div>
            <div className="flex lg:w-1/3 mx-auto justify-around mt-6">
                <button
                    className={`border-secondary-color border rounded-md px-6 py-1 w-2/5 lg:px-3 lg:py-2 lg:w-2/5 ${
                        showAll ? "bg-secondary-color text-white" : "text-font-color"
                    }`}
                    onClick={() => selectTab(true)}
                >
                    All
                </button>
                <button
                    className={`border-secondary-color border rounded-md px-4 py-1 w-2/5 lg:px-3 lg:py-2 lg:w-2/5 ${
                        !showAll ? "bg-secondary-color text-white" : "text-font-color"
                    }`}
                    onClick={() => selectTab(false)}
                >
                    On Sale
                </button>
            </div>
            <div className="xl:flex block justify-around">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 w-full pt-4 gap-y-5 gap-x-2 col-span-3">
                    {tokens?.map((token: Token) => (
                        <NFT token={token} key={token.metadata_id} />
                    ))}
                </div>
            </div>
            {/* <div className="flex justify-center items-center my-4">
                {
                    (showAll && tokens?.length < totalNfts) && (
                        <button 
                            className="rounded-lg bg-gradient-to-l hover:bg-gradient-to-r from-primary-color to-secondary-color text-white px-4 py-2"
                            onClick={() => setIndex(index + 10)}
                        >
                            {loadingTokensData ? 'Loading...' : 'Load More'}
                        </button>
                    )
                }
            </div> */}
        </div>
    );
};

export default explore;
