export interface Token {
    base_uri: string;
    media: string
    metadata_id: string;
    minted_timestamp: string
    nft_contract_id: string
    price: number |null
    title: string
    }
 export interface ResponseType {
        mb_views_nft_metadata_unburned: Token[] | [];
        mb_views_nft_metadata_unburned_aggregate: {aggregate: {count: number}}
    }

export interface Thing {
    id: string;
    metaId: string;
    media_type: string;
    metadata: MetaData;
    __typename: string;
}

export interface MetaData {
    animation_type: string | null;
    animation_url: string | null;
    media: string;
    title: string;
    media_type: string;
    __typename: string;
}

export interface List {
    autotransfer: boolean;
    offer: any;
    price: number;
    __typename: string;
}
