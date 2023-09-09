import { js } from '..'
import { select } from '../../../select'
import { all, first, pick, pipe } from '../../../util'


describe('js transform rules for functions', () => {
  test('functions are simplified.', async () => {
    await expect(pipe(
      js('function foo() {}'),
      select('function'),
      first(),
    )).resolves.toBeDefined()
  })

  test('function names are added.', async () => {
    await expect(pipe(
      js('function foo() {}'),
      select('function > id > [name]'),
      pick(n => n['name']),
      first(),
    )).resolves.toBe('foo')
  })

  test('function params are added.', async () => {
    await expect(pipe(
      js('function foo(a, b) {}'),
      select('function > params > [name]'),
      pick(n => n['name']),
      all(),
    )).resolves.toEqual(['a', 'b'])
  })

  test('anonymous functions are handled.', async () => {
    await expect(pipe(
      js('export default function() {}'),
      select('function > id'),
      first(),
    )).resolves.toBeUndefined()
  })

  test('function expressions are handled.', async () => {
    await expect(pipe(
      js('const foo = function(a) {}; function g() { }'),
      select('function[kind=expression] > params > [name]'),
      pick(n => n['name']),
      all(),
    )).resolves.toEqual(['a'])
  })

  test('named function expressions are handled too.', async () => {
    await expect(pipe(
      js('const foo = function bar(a) {}; function g() { }'),
      select('function[kind=expression] > id > [name]'),
      pick(n => n['name']),
      first(),
    )).resolves.toEqual('bar')
  })
})
