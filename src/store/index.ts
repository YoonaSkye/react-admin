import { create, StateCreator, StoreMutatorIdentifier } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { CombinedState } from './types/type';
import createUserSlice from './modules/user';

type MyMiddlewares = <
  T,
  Mps extends [StoreMutatorIdentifier, unknown][] = [],
  Mcs extends [StoreMutatorIdentifier, unknown][] = []
>(
  f: StateCreator<
    T,
    [...Mps, ['zustand/devtools', never], ['zustand/persist', unknown]],
    Mcs
  >
) => StateCreator<
  T,
  Mps,
  [['zustand/devtools', never], ['zustand/persist', T], ...Mcs]
>;

const myMiddlewares = ((f) =>
  devtools(persist(f, { name: 'bound-store' }), {
    name: 'prefix',
  })) as MyMiddlewares;

export const useCombinedStore = create<CombinedState>()(
  myMiddlewares((...a) => ({
    ...createUserSlice(...a),
  }))
);
