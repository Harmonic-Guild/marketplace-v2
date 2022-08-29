export interface Store {
    id: string
    name: string
    symbol: string
    baseUri: string
    owner: string
}

export interface Thing {
    id: string
    metaId: string
    memo: string
    metadata: any
}
