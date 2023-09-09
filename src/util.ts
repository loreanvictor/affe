import P from 'callbag-pipe'
import { Node, Query } from './types'


export const pipe = P

export function pick<T>(fn: (n: Node) => T): <Meta>(q: Query<Meta>) => Query<Meta, T> {
  return <Meta>(q: Query<Meta>) => ({
    ...q,
    resolve: async () => {
      const resolved = await q.resolve()

      return resolved.map(fn)
    }
  })
}

export function first() {
  return async <Meta, Out>(query: Query<Meta, Out>) => {
    const resolved = await query.resolve()

    return resolved[0]
  }
}

export function last() {
  return async <Meta, Out>(query: Query<Meta, Out>) => {
    const resolved = await query.resolve()

    return resolved[resolved.length - 1]
  }
}

export function nth(n: number) {
  return async <Meta, Out>(query: Query<Meta, Out>) => {
    const resolved = await query.resolve()

    if (n < 0) {
      return resolved[resolved.length + n]
    } else {
      return resolved[n - 1]
    }
  }
}

export function all() {
  return async <Meta, Out>(query: Query<Meta, Out>) => {
    return query.resolve()
  }
}
