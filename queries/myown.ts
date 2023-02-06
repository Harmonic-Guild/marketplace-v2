import { gql } from "apollo-boost";

export const FETCH_TOKENS = gql`
    query FetchTokensByStoreId($ownerId: String!) {
        mb_views_nft_owned_tokens(where: { owner: { _eq: $ownerId } }, order_by: { metadata_id: asc }, distinct_on: metadata_id) {
            metadata_id
            title
            token_id
            media_hash
            media
            base_uri
            nft_contract_id
            description
            animation_type: reference_blob(path: "$.animation_type")
            animation_hash: reference_blob(path: "$.animation_hash")
        }
    }
`;

export const FETCH_LISTING = gql`
    query FetchActiveListings($metaId: String!) {
        mb_views_active_listings(where: { metadata_id: { _eq: $metaId } }) {
            price
            title
        }
    }
`;
