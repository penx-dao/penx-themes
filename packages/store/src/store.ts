import { atom, createStore } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { Post } from '@plantreexyz/model'
import { AppStore } from './stores/AppStore'
import { RouterStore } from './stores/RouterStore'
import { TreesStore } from './stores/TreesStore'
import { PublishingState } from './types'

const baseStore = createStore()

export const selectedTreeNameAtom = atomWithStorage<string>(
  'SELECTED_TREE_NAME',
  '',
)

export const postsAtom = atom<Post[]>([])

export const publishingAtom = atom<PublishingState>({
  isLoading: false,
  status: 'Publish',
})

export const store = Object.assign(baseStore, {
  get: baseStore.get,
  set: baseStore.set,

  get app() {
    return new AppStore(this)
  },

  get router() {
    return new RouterStore(this)
  },

  get trees() {
    return new TreesStore(this)
  },
})
