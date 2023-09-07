import { Node, Query } from './types'


export function select(selector: string): <Meta>(query: Query<Meta>) => Query<Meta> {
  return <Meta>(query: Query<Meta>) => {
    return {
      meta: query.meta,
      resolve: async () => {
        const selectAll = (await import('unist-util-select')).selectAll
        const nodes = await query.resolve()

        return nodes.map(node => selectAll(selector, node) as Node[]).flat()
      }
    }
  }
}
