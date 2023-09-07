import { Query } from './types'
import { query, BuildQueryOptions } from './query'


export interface FromCode { code: string }
export type LanguageTag<Meta> = (str: TemplateStringsArray | string, ...args: any[]) => Query<FromCode & Meta>
export interface BuildLanguageTagOptions<Meta={}> extends BuildQueryOptions<Meta> {
  parse: (code: string) => Promise<any>,
}


function _tag<Meta>(options: BuildLanguageTagOptions<Meta>): (code: string) => Query<FromCode & Meta> {
  return (code: string) => {
    return query(
      () => options.parse(code), {
        ...options,
        meta: { ...options.meta, code }
      }
    )
  }
}


export function tag<Meta={}>(options: BuildLanguageTagOptions<Meta>): LanguageTag<Meta> {
  const factory = _tag(options)

  return (str: TemplateStringsArray | string, ...args: any[]) => {
    if (typeof str === 'string') {
      return factory(str)
    } else {
      const code = str.reduce((acc, cur, idx) => {
        return acc + cur + (args[idx] || '')
      }, '')

      return factory(code)
    }
  }
}
