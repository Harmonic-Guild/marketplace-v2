import { gql } from "apollo-boost";

export const FETCH_WEEKLY = gql`
    query GetStoreNfts($offset: Int = 0, $condition: mb_views_nft_metadata_unburned_bool_exp) @cached {
        mb_views_nft_metadata_unburned(offset: $offset, limit: 5, order_by: { minted_timestamp: desc }, where: $condition) {
            createdAt: minted_timestamp
            listed: price
            media
            storeId: nft_contract_id
            metadataId: metadata_id
            media_hash: reference_blob(path: "$.media_hash")
            title
            base_uri
            description
        }
        mb_views_nft_metadata_unburned_aggregate(where: $condition) {
            aggregate {
                count
            }
        }
    }
`;
