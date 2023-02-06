
import React from "react";
import { gql } from "apollo-boost";
import { useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import DropDown from "../components/Dropdown-Filters";
import NFT from "../components/NFT";
import { Store } from "../interfaces/wallet.interface";
import QueryFilters from "../helpers/getQuery";
// import { GiStarShuriken } from "react-icons/gi";
// import Categories from "../components/category/Categories";
// import Artists from "../components/category/Artists";
// import Color from "../components/category/Color";
import { fetchTokens } from '../gql/FetchTokens'
import { FETCH_STORE } from "../queries/explore";

const FETCH_TOKENS = fetchTokens
const explore = () => {
    const [store, setStore] = useState<Store | null>(null);
    // const [things, setThings] = useState<any>([])
    const [tokens, setTokens] = useState<any>([]);
    const [filterParams, setFilterParams] = useState<any>(null);
    const [showAll, setShowAll] = useState(true)

    const storeName = process.env.NEXT_PUBLIC_STORE_NAME!;

    // fetching

    const [getTokens, { loading: loadingTokensData, data: tokensData }] = useLazyQuery(FETCH_TOKENS, {
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

        //  const things = tokensData.token.map((token: any) => token.thing)

        //  setThings(things)
        const allTokens = tokensData?.mb_views_nft_metadata_unburned.map((token: any)=> {
            return token;
        });
        
        const listedTokens  = listedTokensData?.mb_views_nft_metadata_unburned.map((token: any)=> {
            return token;
        });


        if(showAll == true) tokens = allTokens
        else tokens = listedTokens

        

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
                {/* <p className="text-secondary-color">
                    NFTs <GiStarShuriken className="inline w-6 h-5" />
                </p> */}
                <h2 className="text-mp-dark-2 text-4xl font-bold">Explore</h2>
            </div>
            <div>
                {/* <DropDown setFilters={setFilters} /> */}
            </div>
            <div className="flex w-1/3 mx-auto justify-around mt-4">
                    <button className={`border-secondary-color border rounded-md px-3 py-2 w-2/5 ${showAll? 'bg-secondary-color text-white': 'text-secondary-color'}`} onClick={()=> setShowAll(true)}>All</button>
                    <button className={`border-secondary-color border rounded-md px-3 py-2 w-2/5 ${!showAll? 'bg-secondary-color text-white': 'text-secondary-color'}`} onClick={()=> setShowAll(false)}>On Sale</button>
                </div>
            <div className="xl:flex block justify-around">
                {/* <div className=" order-last pt-4 col-span-1">()
                    <div className="hidden lg:block w-full">
                        <Categories />
                        <Artists />
                        <Color />
                    </div>
                    <div className="block sm:flex lg:hidden">
                        <span className="order-last">
                            <span className="pb-4">
                                <Color />
                            </span>
                            <span>
                                <Categories />
                            </span>
                        </span>
                        <span>
                            <Artists />
                        </span>
                    </div>
                </div> */}
                
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
