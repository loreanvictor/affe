import { select } from '../../../select'
import { pipe, pick, first, last, nth, all } from '../../../util'
import { js } from '../index'


describe('js transform rules', () => {
  test('program node is simplified.', async () => {
    await expect(pipe(
      js('const a = 1; let b = 42;'),
      select('program>var:last-child'),
      pick(n => n['kind']),
      first(),
    )).resolves.toBe('let')
  })

  test('block node is simplified.', async () => {
    await expect(pipe(
      js(`
      () => {
        let a = 2;
        const b = 3;
      }
      `),
      select('block > var > declarator > id > [name]'),
      pick(n => n['name']),
      last(),
    )).resolves.toBe('b')
  })

  test('expression node is simplified.', async () => {
    await expect(pipe(
      js('42'),
      select('expression > literal'),
      pick(n => n['raw']),
      first(),
    )).resolves.toBe('42')
  })

  test('this expressions are simplified.', async () => {
    await expect(pipe(
      js('this'),
      select('expression > this'),
      first(),
    )).resolves.toBeDefined()
  })

  test('arrays are simplified.', async () => {
    await expect(pipe(
      js('[1, 2, 3]'),
      select('expression > array > literal'),
      pick(n => n['value']),
      nth(2),
    )).resolves.toBe(2)
  })

  test('objects are simplified.', async () => {
    await expect(pipe(
      js('({ a: 1, b: 2 })'),
      select('expression > object > property:has(> key > [name=b]) > value > [value]'),
      pick(n => n['value']),
      all(),
    )).resolves.toEqual([2])
  })
})


