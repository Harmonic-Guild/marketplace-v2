import { gql } from "apollo-boost";

export const FETCH_WEEKLY = gql`
    query MyQuery($storeId: String!) {
        token(where: { storeId: { _eq: $storeId }, burnedAt: { _is_null: true } }, limit: 5, distinct_on: thingId, order_by: { thingId: desc }) {
            id
            thing {
                id
                metaId
                metadata {
                    media
                }
            }
        }
    }
`;
