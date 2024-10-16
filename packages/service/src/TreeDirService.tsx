import { homeDir, join } from '@tauri-apps/api/path'
import {
  BaseDirectory,
  DirEntry,
  exists,
  mkdir,
  readDir,
} from '@tauri-apps/plugin-fs'
import { ASSETS_DIR_NAME } from '@plantreexyz/constants'

export class TreeDirService {
  treeRootDir: string

  entries: DirEntry[]

  static async init() {
    const dirExists = await exists(ASSETS_DIR_NAME, {
      baseDir: BaseDirectory.Home,
    })

    if (!dirExists) {
      await mkdir(ASSETS_DIR_NAME, {
        baseDir: BaseDirectory.AppLocalData,
      })
    }

    const t = new TreeDirService()
    t.treeRootDir = await join(await homeDir(), ASSETS_DIR_NAME)

    t.entries = (
      await readDir(ASSETS_DIR_NAME, {
        baseDir: BaseDirectory.Home,
      })
    ).filter((entry) => entry.isDirectory)

    return t
  }

  get treeNames() {
    return this.entries.map((entry) => entry.name)
  }

  isExists = (name: string) => {
    return this.entries.some((entry) => entry.name === name)
  }

  getTreeDir = async () => {
    return join(await homeDir(), ASSETS_DIR_NAME)
  }
}
