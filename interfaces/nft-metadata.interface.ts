export interface NftMetadata {
    mb_views_nft_metadata_unburned: NftMetadataUnburned[];
    mb_views_nft_metadata_unburned_aggregate: NftMetadataUnburnedAggregate;
}

export interface NftMetadataUnburned {
    __typename: string;
    base_uri: string;
    createdAt: string;
    description: string;
    listed: any;
    media: string;
    media_hash: string;
    metadataId: string;
    storeId: string;
    title: string;
}


export interface NftMetadataUnburnedAggregate {
    __typename: string;
    aggregate: {
        count: number;
        __typename: string;
    }
}