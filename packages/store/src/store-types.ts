import { Atom, WritableAtom } from 'jotai'
import type { AppStore } from './stores/AppStore'
import type { RouterStore } from './stores/RouterStore'

export type StoreType = {
  get: <Value>(atom: Atom<Value>) => Value
  set: <Value_1, Args extends unknown[], Result>(
    atom: WritableAtom<Value_1, Args, Result>,
    ...args: Args
  ) => Result
}
