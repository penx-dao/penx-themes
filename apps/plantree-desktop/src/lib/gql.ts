import { gql, request } from 'graphql-request'

export const spaceQuery = gql`
  query space($id: String!) {
    space(id: $id) {
      id
      spaceId
      address
      founder
      symbol
      name
      preBuyEthAmount
      ethVolume
      tokenVolume
      tradeCreatorFee
      memberCount
      uri
      members {
        id
        account
      }
    }
  }
`

export const spacesQuery = gql`
  {
    spaces(first: 100) {
      id
      spaceId
      address
      founder
      symbol
      name
      preBuyEthAmount
      ethVolume
      tokenVolume
      tradeCreatorFee
      uri
      memberCount
      members {
        id
        account
      }
    }
  }
`

export const appsQuery = gql`
  {
    apps(first: 100, orderBy: "timestamp", orderDirection: "asc") {
      id
      creator
      uri
      feeReceiver
      feePercent
      timestamp
    }
  }
`

export const holdersQuery = gql`
  query getHolders($spaceAddress: String!) {
    holders(
      first: 100
      orderBy: "balance"
      orderDirection: "desc"
      where: { space: $spaceAddress }
    ) {
      id
      account
      balance
    }
  }
`

export const tradesQuery = gql`
  query getTrades($spaceAddress: String!) {
    trades(
      first: 100
      orderBy: "timestamp"
      orderDirection: "desc"
      where: { space: $spaceAddress }
    ) {
      id
      account
      type
      tokenAmount
      ethAmount
      creatorFee
      protocolFee
      space {
        id
        address
      }
    }
  }
`

export const subscriptionRecordsQuery = gql`
  query getSubscriptionRecords($spaceAddress: String!) {
    subscriptionRecords(first: 100, where: { space: $spaceAddress }) {
      id
      planId
      type
      account
      duration
      amount
      timestamp
      space {
        id
        address
      }
    }
  }
`
