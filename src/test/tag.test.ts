import { tag } from '../tag'


describe(tag, () => {
  test('creates a language tag.', async () => {
    const raw = tag({
      parse: async code => JSON.parse(code),
      meta: {},
    })

    await expect(raw`{ "a": ${42} }`.resolve()).resolves.toEqual([{ type: 'node', a: 42, children: [] }])
  })

  test('the language tag is also a function.', async () => {
    const raw = tag({
      parse: async code => JSON.parse(code),
      meta: {},
    })

    await expect(raw('{ "a": 42 }').resolve()).resolves.toEqual([{ type: 'node', a: 42, children: [] }])
  })
})
