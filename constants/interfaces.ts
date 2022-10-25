export interface Token {
    metadataId: string;
    createdAt: string;
    listed: string;
    media: string;
    storeId: string;
    base_uri: string;
    description: string;
    title: string;
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
