export type TreeProps = TreeMeta & DirEntry

export interface TreeMeta {
  cid: string
  ipns: string
  key: string
}

interface DirEntry {
  name: string
  isDirectory: boolean
  isFile: boolean
  isSymlink: boolean
}

export class Tree {
  props: TreeProps

  constructor(
    public treeRootDir: string,
    raw: TreeProps,
  ) {
    this.props = raw
  }

  get name() {
    return this.props.name
  }

  get cid() {
    return this.props.cid
  }

  get ipns() {
    return this.props.ipns
  }

  updateProps(newProps: Partial<TreeProps>) {
    this.props = { ...this.props, ...newProps }
  }
}
