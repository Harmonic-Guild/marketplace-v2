const mintbase = (network: string) => {

  if(network=="mainnet"){
    return ["https://interop-mainnet.hasura.app/v1/graphql","wss://interop-mainnet.hasura.app/v1/graphql"]
  }
  else{
    return ["https://interop-testnet.hasura.app/v1/graphql","wss://interop-testnet.hasura.app/v1/graphql"]
  }

}
export default mintbase