import { gql } from "apollo-boost";

export const FETCH_TOKENS = gql`
query fetchMeta($metadataId: String!) {
    metadata: nft_metadata(where: {id: {_eq: $metadataId}}) {
      contract: nft_contracts {
        id
        baseUri: base_uri
        created_at

      }
      title
      description
      media
      media_hash: reference_blob(path: "$.media_hash")
      animation_hash: reference_blob(path: "$.animation_hash")
      animationUrl: reference_blob(path: "$.animation_url")
    }
    listings: mb_views_active_listings(where: {metadata_id: {_eq: $metadataId}}, limit: 1, order_by: {price: asc}) {
      kind
      price
      market_id
      token {
        id: token_id
        minter
        nft_contract_id
        ownerId: owner
      }
      offers(order_by: {offer_price: asc})  {
        offer_price
        offered_by
        
      }
    }
   
    all: mb_views_nft_tokens_aggregate(where: {metadata_id: {_eq: $metadataId}}) {
        aggregate {
          count
        }
      }
  }
  
  
`;