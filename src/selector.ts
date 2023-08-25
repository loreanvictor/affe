import { Node } from './types'
import { BuildSelectableOptions, selectable } from './selectable'


export async function selector(tree: any, options: BuildSelectableOptions = {}) {
  const { select, selectAll } = await import('unist-util-select')
  const source = await selectable(tree, options)

  return {
    select: (query: string) => select(query, source) as Node | undefined,
    selectAll: (query: string) => selectAll(query, source) as Node[],
  }
}
