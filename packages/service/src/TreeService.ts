import { resolve } from '@tauri-apps/api/path'
import { readTextFile } from '@tauri-apps/plugin-fs'
import { Command } from '@tauri-apps/plugin-shell'
import { Tree, TreeMeta } from '@plantreexyz/model'
import { publishingAtom, store, treesAtom } from '@plantreexyz/store'

const PublishingStage: Record<string, string> = {
  BUILD_STARTED: 'Building...',
  BUILD_COMPLETED: 'Build completed',
  IPFS_UPLOADING: 'IPFS uploading...',
  IPFS_UPLOADED: 'IPFS uploaded',
  IPNS_PUBLISHING: 'IPNS publishing...',
  IPNS_PUBLISHED: 'IPNS published',
  PUBLISHING: 'Publishing',
  PUBLISHED: 'Published',
}

export class TreeService {
  constructor(public tree: Tree) {}

  publish = async () => {
    const treeDir = await resolve(this.tree.treeRootDir, this.tree.name)
    return new Promise<string>((resolve, reject) => {
      store.set(publishingAtom, { isLoading: true, status: 'Publishing' })

      let command = Command.create('spawn-sh', [
        '-c',
        `cd ${treeDir} && npm run publish`,
      ])

      command.stdout.on('data', (line) => {
        console.log('data:', line.trim())
        if (PublishingStage[line.trim()]) {
          store.set(publishingAtom, {
            isLoading: true,
            status: PublishingStage[line.trim()],
          })
        }
      })

      command.stderr.on('data', (line) => {
        console.error('stderr:', line)
      })

      command.on('error', (error) => {
        console.log('error:', error)
        store.set(publishingAtom, {
          isLoading: false,
          status: 'Publish',
        })
        reject('Failed to publish')
      })

      command.on('close', (data) => {
        console.error('close:', data)
        store.set(publishingAtom, {
          isLoading: false,
          status: 'Publish',
        })

        this.refresh()
        resolve('publish successfully! :)')
      })

      command.spawn()
    })
  }

  readPkg = async () => {
    const pkgPath = await resolve(
      this.tree.treeRootDir,
      this.tree.name,
      'package.json',
    )

    const str = await readTextFile(pkgPath)
    const pkg = JSON.parse(str)
    return {
      cid: pkg.cid,
      ipns: pkg.inps,
      key: pkg.key,
    } as TreeMeta
  }

  refresh = async () => {
    this.tree.updateProps(await this.readPkg())
    const trees = store.get(treesAtom)
    console.log('====trees:', trees)

    const index = trees.findIndex((t) => t.cid === this.tree.cid)
    trees[index] = this.tree

    console.log(
      '=trees.map((t) => t),:',
      trees.map((t) => t),
    )

    store.set(
      treesAtom,
      trees.map((t) => t),
    )
  }
}
