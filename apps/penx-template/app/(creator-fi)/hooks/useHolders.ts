import { RESPACE_SUBGRAPH_URL } from '@/lib/constants'
import { Holder } from '@/lib/types'
import { useQuery } from '@tanstack/react-query'
import { gql, request } from 'graphql-request'
import { useSpace } from './useSpace'

export function useHolders() {
  const { space } = useSpace()

  const query = gql`
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

  const { data, ...rest } = useQuery<{
    holders: Holder[]
  }>({
    queryKey: ['holders', space.address],
    async queryFn() {
      return request({
        url: RESPACE_SUBGRAPH_URL,
        document: query,
        variables: {
          spaceAddress: space.address!?.toLowerCase(),
        },
      })
    },
  })

  const holders: Holder[] = data?.holders || []

  return { holders, ...rest }
}
