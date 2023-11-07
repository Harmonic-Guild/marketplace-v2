import React from "react";
import { useEffect, useState } from "react";
import NFT from "../components/NFT";
import QueryFilters from "../helpers/getQuery";
import { QUERIES, fetchGraphQl } from "@mintbase-js/data";
import { mbjs } from "@mintbase-js/sdk";
import { ResponseType, Token } from "../constants/interfaces";
import { getData } from "../helpers/fetchSheetsData";
import MakeOffer from "../Modal/MakeOffer";

const explore = () => {
    const [tokens, setTokens] = useState<any>([]);
    const [filterParams, setFilterParams] = useState<any>(null);
    const [showAll, setShowAll] = useState(true);
    const [page, setPage] = useState<number>(0);
    const [data, setData] = useState<{ rows: any }>();

    const fetchAll = async (storesToFetch: string[]) => {
        // const storeNames = JSON.parse(process.env.NEXT_PUBLIC_STORE_ARRAY!) || mbjs.keys.contractAddress;
        const { data, error } = await fetchGraphQl<ResponseType>({
            query: QUERIES.storeNftsQuery,
            variables: {
                condition: {
                    nft_contract_id: { _in: storesToFetch },

                    //    order_by:{createdAT: 'Asc'}
                    //   ...(showOnlyListed && { price: { _is_null: false } }),
                },
                limit: 20,
                offset: page * 20,
            },
        });
        return data?.mb_views_nft_metadata_unburned;
    };

    const fetchListed = async (storesToFetch: string[]) => {
        const { data, error } = await fetchGraphQl<any>({
            query: QUERIES.storeNftsQuery,
            variables: {
                condition: {
                    nft_contract_id: { _in: storesToFetch },
                    price: { _is_null: false },
                },
                limit: 20,
                offset: page * 20,
            },
        });
        return data?.mb_views_nft_metadata_unburned;
    };

    useEffect(() => {
        async function handleFetchTokens() {
            const result = await getData();
            if (!result?.rows?.[2]) return;

            const allStores = result?.rows?.[2].c.map((s: any) => s && s.v) || [];
            const storesToFetch = allStores.filter((s: any) => s);

            let myTokens;
            if (showAll) {
                myTokens = await fetchAll(storesToFetch);
            } else {
                myTokens = await fetchListed(storesToFetch);
            }
            setTokens(myTokens);
        }
        handleFetchTokens();
    }, [showAll, page]);

    // fetching

    const setFilters = (filters: any) => {
        const res = QueryFilters(filters);
        setFilterParams({ ...res });
        console.log(filterParams);
    };

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
                        showAll ? "bg-secondary-color text-white" : "text-secondary-color"
                    }`}
                    onClick={() => selectTab(true)}
                >
                    All
                </button>
                <button
                    className={`border-secondary-color border rounded-md px-4 py-1 w-2/5 lg:px-3 lg:py-2 lg:w-2/5 ${
                        !showAll ? "bg-secondary-color text-white" : "text-secondary-color"
                    }`}
                    onClick={() => selectTab(false)}
                >
                    On Sale
                </button>
            </div>
            <div className="xl:flex block justify-around">
                <div className="grid grid-cols-1 lg:grid-cols-3 w-full pt-4 gap-y-5 gap-x-2 col-span-3">
                    {tokens?.map((token: Token) => (
                        <NFT token={token} key={token.metadata_id} />
                    ))}
                </div>
            </div>
            <div className="flex lg:w-1/3 mx-auto justify-around mt-6">
                <button
                    disabled={page < 2}
                    className={`border-secondary-color disabled:cursor-not-allowed disabled:bg-gray-500 bg-primary-color disabled:text-white border rounded-md px-6 py-1 w-2/5 lg:px-3 lg:py-2 lg:w-2/5 `}
                    onClick={() => setPage(page - 1)}
                >
                    Previous
                </button>
                <button
                    className={`bg-primary-color border-secondary-color border rounded-md px-4 py-1 w-2/5 lg:px-3 lg:py-2 lg:w-2/5 `}
                    onClick={() => setPage(page + 1)}
                >
                    Next
                </button>
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
