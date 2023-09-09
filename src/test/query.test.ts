import { query } from '../query'
import { select } from '../select'
import { pipe, all } from '../util'


describe(query, () => {
  test('can query an object with it.', async () => {
    const res = await pipe(
      query(async () => ({ a: { b: 42 }, c: { d: 43 }})),
      select('[b]'),
      all,
    )

    expect(res).toEqual([{ type: 'a', b: 42, children: [] }])
  })
})
