import { spaceAbi } from '@/lib/abi'
import { getSession } from '@/lib/auth'
import { GateType, SPACE_ID } from '@/lib/constants'
import { getPost, getPosts } from '@/lib/fetchers'
import { loadTheme } from '@/lib/loadTheme'
import { SubscriptionInSession } from '@/lib/types'
import { wagmiConfig } from '@/lib/wagmi'
import { TipTapNode } from '@plantreexyz/types'
import { Post } from '@prisma/client'
import { readContract } from '@wagmi/core'
import { notFound } from 'next/navigation'
import readingTime from 'reading-time'
import { Address } from 'viem'
import { GateCover } from './GateCover'
import { MintPost } from './MintPost/MintPost'

async function checkReadable(post: Post) {
  const session = await getSession()
  if (!session) return post.gateType === GateType.FREE
  console.log('=======session:', session)

  const userId = (session as any).userId as string
  return true
}

function checkMembership(subscriptions: SubscriptionInSession[]) {
  if (!Array.isArray(subscriptions)) return false
  if (!subscriptions.length) return false
  const subscription = subscriptions[0]
  if (Date.now() / 1000 < subscription.startTime + subscription.duration) {
    return true
  }
  return false
}

function getContent(post: Post, isGated = false) {
  const node: TipTapNode = JSON.parse(post.content || '{}')
  if (!isGated) return node
  const len = node.content?.length || 0
  node.content = node.content?.slice(1, parseInt((len * 0.1) as any)) || []
  return node
}

export async function generateStaticParams() {
  const posts = await getPosts()
  return posts.map((post) => ({ slug: [post.slug] }))
}

export default async function Page({ params }: { params: { slug: string[] } }) {
  const slug = decodeURI(params.slug.join('/'))
  const [post, posts] = await Promise.all([getPost(slug), getPosts()])

  const session = await getSession()
  const postIndex = posts.findIndex((p) => p.slug === slug)
  if (postIndex === -1 || !post) {
    return notFound()
  }

  const prev = posts[postIndex + 1]
  const next = posts[postIndex - 1]

  const { PostDetail } = await loadTheme()
  if (!PostDetail) throw new Error('Missing PostDetail component')

  /** No gated */
  if (post?.gateType == GateType.FREE) {
    return (
      <PostDetail
        post={{
          ...post,
          content: getContent(post),
          readingTime: readingTime(post?.content || ''),
        }}
        // MintPost={MintPost}
        readable
        next={next}
        prev={prev}
      />
    )
  }

  /** gated but not login */
  if (!session) {
    return (
      <div className="">
        <PostDetail
          post={{
            ...post,
            content: getContent(post, true),
            readingTime: readingTime(post?.content || ''),
          }}
          readable={false}
          // MintPost={MintPost}
          next={next}
          prev={prev}
        />
        <div className="mx-auto relative">
          <GateCover slug={post.slug} />
        </div>
      </div>
    )
  }

  const hasMembership = checkMembership(session.subscriptions)

  /** gated and login */
  return (
    <div className="">
      <PostDetail
        post={{
          ...post,
          content: hasMembership ? getContent(post) : getContent(post, true),
          readingTime: readingTime(post?.content || ''),
        }}
        readable={hasMembership}
        // MintPost={MintPost}
        next={next}
        prev={prev}
      />
      {!hasMembership && (
        <div className="mx-auto relative">
          <GateCover slug={post.slug} />
        </div>
      )}
    </div>
  )
}
