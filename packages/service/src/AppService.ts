import { resolve } from '@tauri-apps/api/path'
import { exists, readDir, readTextFile } from '@tauri-apps/plugin-fs'
import { Post, Tree } from '@plantreexyz/model'
import {
  postsAtom,
  selectedTreeNameAtom,
  store,
  treesAtom,
} from '@plantreexyz/store'
import { TreeDirService } from './TreeDirService'

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))

export class AppService {
  constructor() {}

  init = async () => {
    store.app.setAppLoading(true)
    const treeDir = await TreeDirService.init()
    // await sleep(1000)

    const trees = await this.readTrees(treeDir)
    let name = store.get(selectedTreeNameAtom)

    const tree = trees.find((t) => t.name === name)
    if (!tree) {
      name = trees[0].name
      store.set(selectedTreeNameAtom, name)
    }

    const posts = await this.readPosts(treeDir.treeRootDir, name)

    store.set(treesAtom, trees)
    store.set(postsAtom, posts)
    store.app.setAppLoading(false)
  }

  readTrees = async (treeDir: TreeDirService) => {
    const trees: Tree[] = []

    for (const item of treeDir.entries) {
      const pkgPath = await resolve(
        treeDir.treeRootDir,
        item.name,
        'package.json',
      )
      if (!(await exists(pkgPath))) continue
      const str = await readTextFile(pkgPath)
      const pkg = JSON.parse(str)
      trees.push(
        new Tree(treeDir.treeRootDir, {
          ...item,
          cid: pkg.cid,
          ipns: pkg.ipns,
          key: pkg.key,
        }),
      )
    }
    return trees
  }

  readPosts = async (treeRootDir: string, name: string) => {
    const entries = await readDir(`${treeRootDir}/${name}/src/content/blog`)
    const posts: Post[] = []
    for (const item of entries) {
      if (!item.isFile || !/\.mdx?$/.test(item.name)) continue

      const postPath = await resolve(
        treeRootDir,
        name,
        'src/content/blog',
        item.name,
      )

      const content = await readTextFile(postPath)
      posts.push(new Post(postPath, content))
    }
    return posts
  }

  reloadPosts = async (name: string) => {
    const treeDir = await TreeDirService.init()
    const posts = await this.readPosts(treeDir.treeRootDir, name)
    store.set(postsAtom, posts)
  }
}
