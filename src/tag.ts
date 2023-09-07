import { Query } from './types'
import { query, BuildQueryOptions } from './query'


export interface FromCode { code: string }
export type LanguageTag = (str: TemplateStringsArray | string, ...args: any[]) => Query<FromCode>
export interface BuildLanguageTagOptions extends BuildQueryOptions {
  parse: (code: string) => Promise<any>,
}


function _tag(options: BuildLanguageTagOptions): (code: string) => Query<FromCode> {
  return (code: string) => {
    return query(
      () => options.parse(code), {
        ...options,
        meta: { code }
      }
    )
  }
}


export function tag(options: BuildLanguageTagOptions): LanguageTag {
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
