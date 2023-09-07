import { Node } from './types'
import { Transformer } from './selectable'


export type TransformerRule = [RegExp, (node: any) => Node]


export function transformer(rules: TransformerRule[]): Transformer {
  return (node: any) => rules.reduce((acc, [pattern, transform]) => {
    if (pattern.test(acc.type)) {
      return transform(acc)
    }
    else {
      return acc
    }
  }, node)
}
