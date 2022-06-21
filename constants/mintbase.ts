const mintbase = (network: string) => {

  if(network=="mainnet"){
    return ["https://mintbase-mainnet.hasura.app/v1/graphql","wss://mintbase-mainnet.hasura.app/v1/graphql"]
  }
  else{
    return ["https://mintbase-testnet.hasura.app/v1/graphql","wss://mintbase-testnet.hasura.app/v1/graphql"]
  }

}
export default mintbase