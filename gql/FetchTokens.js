import { gql } from "apollo-boost";

export const fetchTokens = gql`
query FetchStore($storeId: String!, $limit: Int = 20, $offset: Int = 0){
    store(where: { id: { _eq: $storeId } }){
        id
        baseUri
        owner
        tokens(
            order_by: { thingId: asc }
            where: { storeId: { _eq: $storeId }, burnedAt: { _is_null: true } }
            limit: $limit
            offset: $offset
            distinct_on: thingId
          ){
              id
              lists(
                order_by: {createdAt: desc}, limit: 1
              ){
                  price
                  autotransfer
                  offer{
                    price
                    timeout
                  }
              }
              txId
              thingId
              thing{
                id
                metaId
                metadata{
                    title
                    media
                    media_type
                    animation_url
                    animation_type
                }
              }
          }
    }
}
`