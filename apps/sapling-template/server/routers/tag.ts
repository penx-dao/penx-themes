import { PostStatus } from '@/lib/constants'
import { prisma } from '@/lib/prisma'
import { redisKeys } from '@/lib/redisKeys'
import { Post } from '@prisma/client'
import { TRPCError } from '@trpc/server'
import Redis from 'ioredis'
import { z } from 'zod'
import { checkPostPermission } from '../lib/checkPostPermission'
import { protectedProcedure, publicProcedure, router } from '../trpc'

const redis = new Redis(process.env.REDIS_URL!)

enum PostType {
  ARTICLE = 'ARTICLE',
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  AUDIO = 'AUDIO',
  NFT = 'NFT',
  FIGMA = 'FIGMA',
}

enum GateType {
  FREE = 'FREE',
  MEMBER_ONLY = 'MEMBER_ONLY',
}

export const tagRouter = router({
  list: protectedProcedure.query(async ({ ctx, input }) => {
    const key = redisKeys.posts()

    const postsStr = await redis.get(key)

    if (postsStr) {
      // const res = JSON.parse(postsStr) as Post[]
      // if (Array.isArray(res)) return res
    }

    const posts = await prisma.post.findMany({
      orderBy: { updatedAt: 'desc' },
    })

    await redis.set(key, JSON.stringify(posts), 'EX', 60 * 60 * 24)
    return posts
  }),

  publishedPosts: publicProcedure.query(async ({ ctx, input }) => {
    const key = redisKeys.publishedPosts()

    const postsStr = await redis.get(key)

    if (postsStr) {
      const res = JSON.parse(postsStr) as Post[]
      if (Array.isArray(res)) return res
    }

    const posts = await prisma.post.findMany({
      where: { postStatus: PostStatus.PUBLISHED },
    })

    await redis.set(key, JSON.stringify(posts), 'EX', 60 * 60 * 24)
    return posts
  }),

  byId: protectedProcedure.input(z.string()).query(async ({ input }) => {
    return prisma.post.findUnique({
      where: { id: input },
    })
  }),

  create: protectedProcedure
    .input(
      z.object({
        postId: z.string(),
        name: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await prisma.$transaction(
        async (tx) => {
          let tag = await tx.tag.findFirst({
            where: { name: input.name },
          })

          if (!tag) {
            tag = await tx.tag.create({
              data: { ...input, userId: ctx.token.uid },
            })
          }

          const postTag = await tx.postTag.findFirst({
            where: { postId: input.postId, tagId: tag.id },
          })

          if (postTag) {
            throw new TRPCError({
              code: 'BAD_REQUEST',
              message: 'Tag already exists',
            })
          }

          await tx.postTag.create({
            data: {
              postId: input.postId,
              tagId: tag.id,
            },
          })
        },
        {
          maxWait: 5000, // default: 2000
          timeout: 10000, // default: 5000
        },
      )
      return true
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().optional(),
        content: z.string().optional(),
        summary: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input
      await checkPostPermission(ctx.token.uid, input.id)
      const post = await prisma.post.update({
        where: { id },
        data: {
          ...data,
        },
      })

      await Promise.all([
        redis.del(redisKeys.posts()),
        redis.del(redisKeys.publishedPosts()),
      ])

      return true
    }),

  updateCover: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        image: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, image } = input
      await checkPostPermission(ctx.token.uid, input.id)
      const post = await prisma.post.update({
        where: { id },
        data: { image },
      })

      await Promise.all([
        redis.del(redisKeys.posts()),
        redis.del(redisKeys.publishedPosts()),
      ])
      return true
    }),

  publish: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        gateType: z.enum([GateType.FREE, GateType.MEMBER_ONLY]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, gateType } = input
      await checkPostPermission(ctx.token.uid, input.id)
      const post = await prisma.post.update({
        where: { id },
        data: {
          postStatus: PostStatus.PUBLISHED,
          publishedAt: new Date(),
          gateType,
        },
      })

      await Promise.all([
        redis.del(redisKeys.posts()),
        redis.del(redisKeys.publishedPosts()),
      ])

      return post
    }),

  delete: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const post = await prisma.post.delete({
        where: { id: input },
      })

      return post
    }),
})
