import { BuildSelectableOptions } from './selectable'
import { selector, wrap, SelectableTree } from './selector'


//
// TODO: this could expand beyond a selectable tree,
//       to a modifable and a serialisable tree.
//       this is expanding the scope of affe, but might be a good idea.
//       note that for serialization, its better to NOT use some codegen
//       or whatever tool, but instead update original string using
//       location info and update the tree accordingly. to keep the styling
//       and format of the original code intact as much as possible.
//
export interface SelectableCode extends SelectableTree {
  code: () => Promise<string>,
}

export type LanguageTag = (str: TemplateStringsArray | string, ...args: any[]) => SelectableCode


export interface BuildLanguageTagOptions extends BuildSelectableOptions{
  parse: (code: string) => Promise<any>,
}


function _tag(options: BuildLanguageTagOptions): (code: string) => SelectableCode {
  return (code: string) => {
    const tree = options.parse(code)
    const selectable = tree.then(t => selector(t, options))

    return {
      code: async () => code,
      node: async () => (await selectable).node(),
      select: (query: string) => wrap(async() => (await selectable).select(query).node()),
      selectAll: async (query: string) => (await selectable).selectAll(query),
    } as SelectableCode
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
