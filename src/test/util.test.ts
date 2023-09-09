import { query } from '../query'
import { select } from '../select'
import { first, last, nth, all, pick, pipe } from '../util'


describe(first, () => {
  test('returns the first element of a query', async () => {
    await expect(pipe(
      query(async () => ({ a: { value: 'a'}, b: { value: 'b' }, c: { value: 'c' }})),
      select(':not(node)'),
      pick(n => n['value']),
      first(),
    )).resolves.toBe('a')
  })
})

describe(last, () => {
  test('returns the last element of a query', async () => {
    await expect(pipe(
      query(async () => ({ a: { value: 'a'}, b: { value: 'b' }, c: { value: 'c' }})),
      select(':not(node)'),
      pick(n => n['value']),
      last(),
    )).resolves.toBe('c')
  })
})

describe(nth, () => {
  test('returns the nth element of a query', async () => {
    await expect(pipe(
      query(async () => ({ a: { value: 'a'}, b: { value: 'b' }, c: { value: 'c' }})),
      select(':not(node)'),
      pick(n => n['value']),
      nth(2),
    )).resolves.toBe('b')
  })

  test('returns the nth element of a query from the end', async () => {
    await expect(pipe(
      query(async () => ({ a: { value: 'a'}, b: { value: 'b' }, c: { value: 'c' }})),
      select(':not(node)'),
      pick(n => n['value']),
      nth(-1),
    )).resolves.toBe('c')
  })
})

describe(all, () => {
  test('returns all elements of a query', async () => {
    await expect(pipe(
      query(async () => ({ a: { value: 'a'}, b: { value: 'b' }, c: { value: 'c' }})),
      select(':not(node)'),
      pick(n => n['value']),
      all(),
    )).resolves.toEqual(['a', 'b', 'c'])
  })
})
