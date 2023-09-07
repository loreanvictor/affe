import { Query } from './types'
import { selectable, BuildSelectableOptions } from './selectable'


export interface BuildQueryOptions<Meta = {}> extends BuildSelectableOptions {
  meta: Meta
}


export function query<Meta>(
  source: () => Promise<any>,
  options: BuildQueryOptions<Meta> = {} as any
): Query<Meta> {
  return {
    resolve: async () => [await selectable(await source(), options)],
    meta: options.meta
  }
}
