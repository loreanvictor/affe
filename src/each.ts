import { Node } from './types'
import { SelectableTree } from './selector'


export async function each<T>(list: SelectableTree[], handle: (node: Node) => T | Promise<T>): Promise<T[]> {
  const resolved = await Promise.all(list.map(async (selected) => selected.node()))

  return await Promise.all(resolved.filter(r => !!r).map(node => handle(node!)))
}
