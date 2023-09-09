import { js } from '..'
import { select } from '../../../select'
import { first, pick, pipe } from '../../../util'


describe('js transform rules for exports', () => {
  test('handles export all declarations.', async () => {
    await expect(pipe(
      js('export * from "./foo"'),
      select('export[kind=all]'),
      pick(n => n['from']),
      first(),
    )).resolves.toBe('./foo')
  })

  test('simplifies default exports.', async () => {
    await expect(pipe(
      js('export default function f() {}'),
      select('export[kind=default] > function > id > [name]'),
      pick(n => n['name']),
      first(),
    )).resolves.toBe('f')
  })

  test('simplifies named exports.', async () => {
    await expect(pipe(
      js('export { f as foo } from "./foo"'),
      select('export[kind=named] > specifier > exported > [name]'),
      pick(n => n['name']),
      first(),
    )).resolves.toBe('foo')
  })

  test('handles named exports without a source.', async () => {
    await expect(pipe(
      js('const f = 42; export { f as foo }'),
      select('export[kind=named] > specifier > exported > [name]'),
      pick(n => n['name']),
      first(),
    )).resolves.toBe('foo')
  })
})
