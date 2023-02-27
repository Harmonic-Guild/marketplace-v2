
import React from "react";
import { useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import NFT from "../components/NFT";
import QueryFilters from "../helpers/getQuery";
import { fetchTokens } from '../gql/FetchTokens'
import { NftMetadata } from "../interfaces/nft-metadata.interface";

const FETCH_TOKENS = fetchTokens
const explore = () => {
    
    const [tokens, setTokens] = useState<any>([]);
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
            }
        },
    });

    const [getListedTokens, { loading: loadingListedTokensData, data: listedTokensData }] = useLazyQuery(FETCH_TOKENS, {
        variables: {
            condition: {
                nft_contract_id: {
                    _regex: ""
                },
                price: {_is_null: false}
            }
        },
    });

    useEffect(() => {
        
        if(showAll === true){
            
            getTokens({
                variables: {
                    condition: {
                        nft_contract_id: { _regex:storeName } 
                    }
                },
            })
        } else{
            getListedTokens({
                variables: {
                    condition: {
                        nft_contract_id: { _regex: storeName },
                        price: {_is_null: false}
                    }
                },
            })
        }
        ;
        //  console.log(filterParams.prices);
    }, [showAll]);

    useEffect(() => {
        if (!tokensData && !listedTokensData) return;
        let tokens: any = []
        console.log('//////////////', tokensData);
        
        const allTokens = tokensData?.mb_views_nft_metadata_unburned.map((token: any)=> {
            return token;
        });
        
        const listedTokens  = listedTokensData?.mb_views_nft_metadata_unburned.map((token: any)=> {
            return token;
        });


        if(showAll == true) tokens = allTokens
        else tokens = listedTokens

        console.log(tokens);

        setTokens(tokens);
        
    }, [tokensData, listedTokensData, showAll]);

    const setFilters = (filters: any) => {
        
        const res = QueryFilters(filters);
        setFilterParams({ ...res });
        console.log(filterParams);
    };

    return (
        <div className="px-8 w-full xl:w-5/6 mx-auto">
            <div className="text-center">
                <h2 className="text-mp-dark-2 text-4xl font-bold">Explore</h2>
            </div>
            <div className="flex w-1/3 mx-auto justify-around mt-4">
                <button className={`border-secondary-color border rounded-md px-3 py-2 w-2/5 ${showAll? 'bg-secondary-color text-white': 'text-secondary-color'}`} onClick={()=> setShowAll(true)}>All</button>
                <button className={`border-secondary-color border rounded-md px-3 py-2 w-2/5 ${!showAll? 'bg-secondary-color text-white': 'text-secondary-color'}`} onClick={()=> setShowAll(false)}>On Sale</button>
            </div>
            <div className="xl:flex block justify-around">
                
                <div className="grid grid-cols-2 lg:grid-cols-3 w-full pt-4 gap-y-5 gap-x-2 col-span-3">
                    {tokens?.map((token: any) => (
                        <NFT token={token} baseUri={token?.baseUri} key={token.metadataId} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default explore;
