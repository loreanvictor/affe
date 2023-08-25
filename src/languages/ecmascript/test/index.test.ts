import { selector } from '../index'


describe('EcmaScript', () => {
  test('can select a single node', async () => {
    const { select } = await selector(`
      export default [
        {
          rules: {
              semi: "error",
              "prefer-const": "error"
          }
        }
      ]
    `)

    const rule = select('export[kind=default] property[name=rules] > value > object > property > key > *')

    expect(rule).toBeDefined()
    expect(rule!['name']).toEqual('semi')
  })

  test('can select all matching nodes.', async () => {
    const { selectAll } = await selector(`
      export default [
        {
          rules: {
              semi: "error",
              "prefer-const": "error"
          }
        },
        {
          rules: {
            curly: "error",
            "no-unused-var": "warn"
          }
        }
      ]
    `)

    const rules = selectAll(`
      export[kind=default]
      property:has(
        > key
        > :is(id[name=rules], literal[value=rules])
      )
      > value > object > property > key > *
    `).map(node => node['value'] ?? node['name'])

    expect(rules).toEqual(['semi', 'prefer-const', 'curly', 'no-unused-var'])
  })
})
