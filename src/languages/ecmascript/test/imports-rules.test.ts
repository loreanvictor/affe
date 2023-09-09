import { js } from '..'
import { select } from '../../../select'
import { first, all, pick, pipe } from '../../../util'


describe('js transform rules for imports', () => {
  test('handles import declarations.', async () => {
    await expect(pipe(
      js('import { f as foo } from "./foo"'),
      select('import > specifier > imported > [name]'),
      pick(n => n['name']),
      first(),
    )).resolves.toBe('f')
  })

  test('handles default specifiers.', async () => {
    await expect(pipe(
      js('import f, {g} from "./foo"'),
      select('import > specifier local [name]'),
      pick(n => n['name']),
      all(),
    )).resolves.toEqual(['f', 'g'])

    await expect(pipe(
      js('import f, {g} from "./foo"'),
      select('import > specifier[kind=default] local [name]'),
      pick(n => n['name']),
      all(),
    )).resolves.toEqual(['f'])
  })

  test('handles namespace imports.', async () => {
    await expect(pipe(
      js('import * as foo from "foo"; import { bar } from "bar"'),
      select('import:has(specifier[kind=namespace]) source [value]'),
      pick(n => n['value']),
      all(),
    )).resolves.toEqual(['foo'])

    await expect(pipe(
      js('import * as foo from "foo"; import { bar } from "bar"'),
      select('import source [value]'),
      pick(n => n['value']),
      all(),
    )).resolves.toEqual(['foo', 'bar'])
  })
})
