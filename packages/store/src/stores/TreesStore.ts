import { atom } from 'jotai'
import { Tree } from '@plantreexyz/model'
import { StoreType } from '../store-types'

export const treesAtom = atom<Tree[]>([])

export class TreesStore {
  constructor(private store: StoreType) {}

  get() {
    return this.store.get(treesAtom)
  }
}
