
import React from "react";
import { useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import NFT from "../components/NFT";
import QueryFilters from "../helpers/getQuery";
import { fetchTokens } from '../gql/FetchTokens';
import { NftMetadata } from "../interfaces/nft-metadata.interface";

const FETCH_TOKENS = fetchTokens
const explore = () => {
    
    const [index, setIndex] = useState(0);
    const [totalNfts, setTotalNfts] = useState(0);
    const [tokens, setTokens] = useState<any[]>([]);
    const [filterParams, setFilterParams] = useState<any>(null);
    const [showAll, setShowAll] = useState(true)

    const storeName = process.env.NEXT_PUBLIC_STORE_NAME!;

    // fetching
    const [getTokens, { loading: loadingTokensData, data: tokensData }] = useLazyQuery<NftMetadata>(FETCH_TOKENS, {
        variables: {
            condition: {
                nft_contract_id: {
                    _regex: ""
                },
            },
            offset: 0,
        },
    });

    const [getListedTokens, { loading: loadingListedTokensData, data: listedTokensData }] = useLazyQuery(FETCH_TOKENS, {
        variables: {
            condition: {
                nft_contract_id: {
                    _regex: ""
                },
                price: {_is_null: false}
            },
        },
    });

    useEffect(() => {
        
        if(showAll === true){
            
            getTokens({
                variables: {
                    condition: {
                        nft_contract_id: { _regex:storeName } 
                    },
                    offset: index
                },
            })
        } else{
            getListedTokens({
                variables: {
                    condition: {
                        nft_contract_id: { _regex: storeName },
                        price: {_is_null: false}
                    },
                },
            })
        }
        ;
        //  console.log(filterParams.prices);
    }, [showAll, index]);

    useEffect(() => {
        if (!tokensData && !listedTokensData) return;
        let tokens: any = []
        
        setTotalNfts(tokensData?.mb_views_nft_metadata_unburned_aggregate.aggregate.count || 0);
        
        const allTokens = tokensData?.mb_views_nft_metadata_unburned.map((token: any)=> {
            return token;
        });
        
        const listedTokens  = listedTokensData?.mb_views_nft_metadata_unburned.map((token: any)=> {
            return token;
        });

        console.log(listedTokensData);

        if(showAll == true) tokens = allTokens
        else tokens = listedTokens;

        console.log(tokens);

        setTokens((prevState: any[]) => {
            return showAll ? prevState.concat(tokens) : tokens
        })
        
    }, [tokensData, listedTokensData, showAll]);

    const setFilters = (filters: any) => {
        
        const res = QueryFilters(filters);
        setFilterParams({ ...res });
        console.log(filterParams);
    };

    const selectTab = (bool: boolean) => {
        setTokens([]);
        setShowAll(bool);
    }

    return (
        <div className="px-8 w-full xl:w-5/6 mx-auto">
            <div className="text-center">
                <h2 className="text-mp-dark-2 text-4xl font-bold">Explore</h2>
            </div>
            <div className="flex w-1/3 mx-auto justify-around mt-4">
                <button className={`border-secondary-color border rounded-md px-3 py-2 w-2/5 ${showAll? 'bg-secondary-color text-white': 'text-secondary-color'}`} onClick={()=> selectTab(true)}>All</button>
                <button className={`border-secondary-color border rounded-md px-3 py-2 w-2/5 ${!showAll? 'bg-secondary-color text-white': 'text-secondary-color'}`} onClick={()=> selectTab(false)}>On Sale</button>
            </div>
            <div className="xl:flex block justify-around">
                <div className="grid grid-cols-2 lg:grid-cols-3 w-full pt-4 gap-y-5 gap-x-2 col-span-3">
                    {tokens?.map((token: any, i: number) => (
                        <NFT token={token} baseUri={token?.baseUri} key={i} />
                    ))}
                </div>
            </div>
            <div className="flex justify-center items-center my-4">
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
            </div>
        </div>
    );
};

export default explore;
