import { Node } from './types'
import { BuildSelectableOptions, selectable } from './selectable'


export interface SelectableTree {
  tree: () => Promise<Node>
  select: (query: string) => Promise<Node | undefined>
  selectAll: (query: string) => Promise<Node[]>
}


export function selector(tree: any, options: BuildSelectableOptions = {}): SelectableTree {
  const mod = import('unist-util-select')
  const source = selectable(tree, options)

  return {
    tree: async () => source,
    select: async (query: string) => (await mod).select(query, await source) as Node | undefined,
    selectAll: async (query: string) => (await mod).selectAll(query, await source) as Node[],
  }
}
