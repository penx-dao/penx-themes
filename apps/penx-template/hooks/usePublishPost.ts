import { useState } from 'react'
import { useCheckChain } from '@/hooks/useCheckChain'
import { Post } from '@/hooks/usePost'
import { usePosts } from '@/hooks/usePosts'
import { useWagmiConfig } from '@/hooks/useWagmiConfig'
import { creationFactoryAbi } from '@/lib/abi'
import { addressMap } from '@/lib/address'
import { extractErrorMessage } from '@/lib/extractErrorMessage'
import { precision } from '@/lib/math'
import { INode, IObjectNode } from '@/lib/model'
import { revalidateMetadata } from '@/lib/revalidateTag'
import { nodeToSlate } from '@/lib/serializer'
import { api } from '@/lib/trpc'
import { store } from '@/store'
import { GateType, PostType } from '@prisma/client'
import { readContract, waitForTransactionReceipt } from '@wagmi/core'
import { toast } from 'sonner'
import { Address } from 'viem'
import { useAccount, useWriteContract } from 'wagmi'
import { useSiteContext } from '../components/SiteContext'

export function usePublishPost() {
  const { spaceId } = useSiteContext()
  const { address } = useAccount()
  const [isLoading, setLoading] = useState(false)
  const checkChain = useCheckChain()
  const { writeContractAsync } = useWriteContract()
  const wagmiConfig = useWagmiConfig()

  return {
    isLoading,
    publishPost: async (
      node: IObjectNode,
      gateType: GateType,
      collectable: boolean,
    ) => {
      setLoading(true)

      const nodes = store.node.getNodes()
      const content = nodeToSlate({
        node: node,
        nodes,
        isOutliner: false,
        isOutlinerSpace: false,
      })

      // console.log('======>>>>>content:', content)
      // console.log('======>>>>>node:', node)
      const post = await api.post.bySlug.query(node.id)

      let creationId: number | undefined
      try {
        if (spaceId && typeof post?.creationId !== 'number' && collectable) {
          await checkChain()
          const hash = await writeContractAsync({
            address: addressMap.CreationFactory,
            abi: creationFactoryAbi,
            functionName: 'create',
            args: [node.id, precision.token(0.0001024), spaceId as Address],
          })

          await waitForTransactionReceipt(wagmiConfig, { hash })

          const creation = await readContract(wagmiConfig, {
            address: addressMap.CreationFactory,
            abi: creationFactoryAbi,
            functionName: 'getUserLatestCreation',
            args: [address!],
          })
          creationId = Number(creation.id)
        }

        await api.post.publish.mutate({
          type: node.props?.objectType || PostType.ARTICLE,
          nodeId: node.id,
          gateType,
          collectable,
          creationId,
          image: node.props?.imageUrl,
          content: JSON.stringify(content),
        })

        await store.node.updateNode(node.id, {
          props: {
            ...node.props,
            gateType,
            collectable,
          },
        } as IObjectNode)

        setLoading(false)
        revalidateMetadata(`posts`)
        // revalidateMetadata(`posts-${post.slug}`)
        toast.success('Post published successfully!')
      } catch (error) {
        console.log('========error:', error)
        const msg = extractErrorMessage(error)
        toast.error(msg)
      }

      setLoading(false)
    },
  }
}
