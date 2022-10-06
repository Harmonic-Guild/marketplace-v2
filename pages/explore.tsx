
import React from "react";
import { gql } from "apollo-boost";
import { useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useWallet } from "../services/providers/MintbaseWalletContext";
import DropDown from "../components/Dropdown-Filters";
import NFT from "../components/NFT";
import { Store } from "../interfaces/wallet.interface";
import QueryFilters from "../helpers/getQuery";
import { GiStarShuriken } from "react-icons/gi";
import Categories from "../components/category/Categories";
import Artists from "../components/category/Artists";
import Color from "../components/category/Color";
import { fetchTokens } from '../gql/FetchTokens'

const FETCH_STORE = gql`
    query FetchStore($storeId: String!) {
        store(where: { id: { _eq: $storeId } }) {
            id
            name
            symbol
            baseUri
            owner
        }
    }
`;

const FETCH_TOKENS = gql`
    query FetchTokensByStoreId($storeId: String!, $lt: numeric, $type: [String!], $order: order_by!, $gt: numeric, $limit: Int, $offset: Int) {
        token(
            order_by: { thingId: $order }
            where: {
                storeId: { _eq: $storeId }
                burnedAt: { _is_null: true }
                list: { _or: { price: { _gte: $gt, _lte: $lt }, removedAt: { _is_null: true } } }
                thing: { metadata: { animation_type: { _in: $type } } }
            }
            limit: $limit
            offset: $offset
            distinct_on: thingId
        ) {
            id
            lists(order_by: { createdAt: desc }, limit: 1) {
                price
                autotransfer
                offer {
                    price
                    timeout
                }
            }
            txId
            thingId
            thing {
                id
                metaId
                metadata {
                    title
                    media
                    media_type
                    animation_url
                    animation_type
                }
            }
        }
    }
`;
const explore = () => {
    const { wallet } = useWallet();
    const [store, setStore] = useState<Store | null>(null);
    // const [things, setThings] = useState<any>([])
    const [tokens, setTokens] = useState<any>([]);
    const [filterParams, setFilterParams] = useState<any>(null);

    const storeName = process.env.NEXT_PUBLIC_STORE_NAME!;

    // fetching
    const [getStore, { loading: loadingStoreData, data: storeData }] = useLazyQuery(FETCH_STORE, {
        variables: {
            storeId: "",
        },
    });

    const [getTokens, { loading: loadingTokensData, data: tokensData }] = useLazyQuery(FETCH_TOKENS, {
        variables: {
            storeId: "",
            limit: 15,
            offset: 0,
            lt: 0,
            gt: 0,
            type: [],
            order: ''
        },
    });

    useEffect(() => {
        getStore({
            variables: {
                storeId: storeName,
            },
        });
    }, []);

    useEffect(() => {
        // console.log(storeData);

        if (!storeData) return;

        if (storeData?.store.length === 0) return;

        setStore({
            ...storeData.store[0],
        });

        getTokens({
            variables: {
                storeId: storeName,
                limit: 15,
                offset: 0,
                lt: filterParams.prices.lt.toString(),
                gt: filterParams.prices.gt.toString(),
                type: filterParams.types,
                order: filterParams.orders
            },
        });
        //  console.log(filterParams.prices);
    }, [storeData, filterParams]);

    useEffect(() => {
        if (!store || !tokensData) return;

        //  const things = tokensData.token.map((token: any) => token.thing)

        //  setThings(things)

        const tokens = tokensData.token.map((token: any) => {
            return token;
        });

        setTokens(tokens);
    }, [tokensData]);

    const setFilters = (filters: any) => {
        
        const res = QueryFilters(filters);
        setFilterParams({ ...res });
        console.log(filterParams);
    };

    return (
        <div className="px-8 w-full xl:w-5/6 mx-auto">
            <div className="text-center">
                {/* <p className="text-secondary">
                    NFTs <GiStarShuriken className="inline w-6 h-5" />
                </p> */}
                <h2 className="text-mp-dark-2 text-4xl font-bold">Explore</h2>
            </div>
            <div>
                <DropDown setFilters={setFilters} />
            </div>
            <div className="xl:flex block justify-around">
                {/* <div className=" order-last pt-4 col-span-1">
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
                    {tokens.map((token: any) => (
                        <NFT token={token} baseUri={store?.baseUri} key={token.thing.id} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default explore;
