import { gql } from "apollo-boost";

export const FETCH_STORE = gql`
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
