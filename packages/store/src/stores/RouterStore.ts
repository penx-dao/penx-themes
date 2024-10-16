import { atomWithStorage } from 'jotai/utils'
import { StoreType } from '../store-types'
import { IRouterStore, RouteName } from '../types'

export const routerAtom = atomWithStorage('Router', {
  name: '' as any,
} as IRouterStore)

export class RouterStore {
  constructor(private store: StoreType) {}

  get() {
    return this.store.get(routerAtom)
  }

  getName() {
    return this.store.get(routerAtom).name
  }

  getPostFileName() {
    return this.store.get(routerAtom)?.params?.fileName || ''
  }

  set(state: IRouterStore) {
    this.store.set(routerAtom, state)
  }

  routeTo(name: RouteName, params: Record<string, any> = {}) {
    const current = this.store.get(routerAtom)
    if (name === current.name) return
    return this.store.set(routerAtom, {
      name,
      params,
    })
  }

  isHome() {
    return this.getName() === 'HOME'
  }

  isPOST() {
    return this.getName() === 'POST'
  }
}
