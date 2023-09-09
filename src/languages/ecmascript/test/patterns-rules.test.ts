import { js } from '..'
import { select } from '../../../select'
import { all, pick, pipe } from '../../../util'


describe('js transform rules for patterns', () => {
  test('array patterns are simplified.', async () => {
    await expect(pipe(
      js('const [a, b] = [3, 4]'),
      select('declarator > id > pattern > [name]'),
      pick(n => n['name']),
      all(),
    )).resolves.toEqual(['a', 'b'])
  })

  test('object patterns are simplified.', async () => {
    await expect(pipe(
      js('const { a, b } = { a: 3, b: 4 }'),
      select('declarator > id > pattern > [name]'),
      pick(n => n['name']),
      all(),
    )).resolves.toEqual(['a', 'b'])
  })
})
