
import React from "react";
import { useEffect, useState } from "react";
import DropDown from "../components/Dropdown-Filters";
import NFT from "../components/NFT";
import QueryFilters from "../helpers/getQuery";
import { QUERIES, fetchGraphQl } from "@mintbase-js/data";
import { mbjs } from '@mintbase-js/sdk';
import { ResponseType, Token } from '../constants/interfaces';

const explore = () => {
    const [tokens, setTokens] = useState<any>([]);
    const [filterParams, setFilterParams] = useState<any>(null);
    const [showAll, setShowAll] = useState(true)



    const fetchAll = async () => {
        const { data, error } = await fetchGraphQl<ResponseType>({
          query: QUERIES.storeNftsQuery,
          variables: {
            condition: {
              nft_contract_id: { _in: mbjs.keys.contractAddress },
            //   ...(showOnlyListed && { price: { _is_null: false } }),
            },
            limit: 20,
            offset:  0,
          }
        });
        return data?.mb_views_nft_metadata_unburned;
      }

      const fetchListed = async () => {
        const { data, error } = await fetchGraphQl<any>({
          query: QUERIES.storeNftsQuery,
          variables: {
            condition: {
              nft_contract_id: { _in: mbjs.keys.contractAddress },
               price: { _is_null: false },
            },
            limit: 20,
            offset:  0,
          }
        });
        return data?.mb_views_nft_metadata_unburned;
      }

      useEffect( ()=> {
        async function handleFetchTokens () {
            let myTokens;
            if(showAll){
                myTokens = await fetchAll()
            }else{
                myTokens = await fetchListed()
            }
            setTokens(myTokens)

        }
        handleFetchTokens()
        
      }, [showAll])

    // fetching


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
                
                
                <div className="grid grid-cols-2 lg:grid-cols-3 w-full pt-4 gap-y-5 gap-x-2 col-span-3">
                    {tokens?.map((token: Token) => (
                        <NFT token={token}  key={token.metadata_id} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default explore;
