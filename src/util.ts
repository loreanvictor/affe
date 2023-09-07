import P from 'callbag-pipe'
import { Node, Query } from './types'


export const pipe = P

export function pick<T>(fn: (n: Node) => T): <Meta>(q: Query<Meta>) => Promise<T[]> {
  return async <Meta>(q: Query<Meta>) => {
    const nodes = await q.resolve()

    return nodes.map(fn)
  }
}

export async function first<Meta>(query: Query<Meta>) {
  const resolved = await query.resolve()

  return resolved[0]
}

export function all<T>(query: Query<T>) {
  return query.resolve()
}
