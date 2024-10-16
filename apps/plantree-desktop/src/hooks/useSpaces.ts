import { SUBGRAPH_URL } from '@/lib/constants'
import { spacesQuery } from '@/lib/gql'
import { SpaceType } from '@/lib/types'
import { useQuery } from '@tanstack/react-query'
import { gql, request } from 'graphql-request'

export function useSpaces() {
  return useQuery({
    queryKey: ['spaces'],
    queryFn: async () => {
      try {
        const { spaces = [] } = await request<{ spaces: SpaceType[] }>({
          url: SUBGRAPH_URL,
          document: spacesQuery,
        })
        return spaces
      } catch (error) {
        return []
      }
    },
  })
}
