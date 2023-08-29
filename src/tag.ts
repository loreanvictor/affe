import { BuildSelectableOptions } from './selectable'
import { selector, SelectableTree } from './selector'


//
// TODO: this could expand beyond a selectable tree,
//       to a modifable and a serialisable tree.
//       this is expanding the scope of affe, but might be a good idea.
//
export type LanguageTag = (str: TemplateStringsArray | string, ...args: any[]) => SelectableTree


export interface BuildLanguageTagOptions extends BuildSelectableOptions{
  parse: (code: string) => Promise<any>,
}


function _tag(options: BuildLanguageTagOptions) {
  return (code: string) => {
    const tree = options.parse(code)
    const selectable = tree.then(t => selector(t, options))

    return {
      tree: async () => (await selectable).tree(),
      select: async (query: string) => (await selectable).select(query),
      selectAll: async (query: string) => (await selectable).selectAll(query),
    }
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
