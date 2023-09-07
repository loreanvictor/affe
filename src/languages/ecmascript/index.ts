export * from './rules'

import * as es from 'espree'
import { tag } from '../../tag'
import { transformer } from '../../transformer'

import { rules } from './rules'


export const js = tag({
  parse: async (code: string) => es.parse(
    code, {
      range: true,
      ecmaVersion: 'latest',
      sourceType: 'module',
    }
  ),
  transformer: transformer(rules),
  meta: {},
})


export const jsx = tag({
  parse: async (code: string) => es.parse(
    code, {
      range: true,
      ecmaVersion: 'latest',
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true
      },
    }
  ),
  transformer: transformer(rules),
  meta: {},
})
