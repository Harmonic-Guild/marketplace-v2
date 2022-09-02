export interface Token {
    id: string;
    thingId: string;
    txId: string;
    thing: Thing;
    lists: List[];
    __typename: string;
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
