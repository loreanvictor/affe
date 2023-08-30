import { Node } from './types'
import { BuildSelectableOptions, selectable } from './selectable'


export interface SelectableTree {
  node: () => Promise<Node | undefined>
  select: (query: string) => SelectableTree
  selectAll: (query: string) => Promise<SelectableTree[]>
}


export function wrap(node: () => Promise<Node | undefined>): SelectableTree {
  const mod = import('unist-util-select')

  return {
    node,
    select: (query: string) => wrap(async () => (await mod).select(query, await node()) as Node | undefined),
    selectAll: async (query: string) => {
      return (await mod).selectAll(query, await node()).map((n) => wrap(async () => n as Node))
    },
  }
}


export function selector(tree: any, options: BuildSelectableOptions = {}): SelectableTree {
  return wrap(() => selectable(tree, options))
}

