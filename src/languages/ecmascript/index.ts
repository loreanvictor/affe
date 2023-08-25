export * from './rules'

import * as es from 'esprima'
import { selector as S } from '../../selector'
import { transformer as T } from '../../transformer'
import { rules } from './rules'


export const transformer = T(rules)
export const selector = async (code: string) => {
  return await S(es.parseModule(code, { range: true }), { transformer })
}
