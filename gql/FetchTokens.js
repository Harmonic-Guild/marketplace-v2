import { gql } from "apollo-boost";

export const fetchTokens = gql`
query FetchTokensByStoreId ($storeId: String!, $order: order_by!, $type:[String!], $lt: numeric, $gt: numeric, $limit: Int, $offset: Int) {
    metadata(
        order_by: {thing: {createdAt: $order}},
        limit: $limit,
        offset: $offset,
        where: {
            animation_type: {
                _in: $type
              },
            thing: {
                storeId: {_eq: $storeId}
                tokens: {
                    list: {
                        removedAt: {_is_null: true},
                        price: {_gte: $gt, _lte: $lt}
                    }
                },
            },
        }
    ){
        id
        title
        media
        media_type
        animation_url
        animation_type
        thing {
            id
            tokens(distinct_on: id, where: {list: {removedAt: {_is_null: true}}}){
                txId
                thingId
                id
                lists(order_by: {createdAt: desc}, limit: 1) {
                    id
                    price
                    autotransfer
                    offer{
                        price
                        timeout
                    }
                }
            }
        }
    }
}
`