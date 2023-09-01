import { each } from '../../../each'
import { js } from '../index'


describe('EcmaScript', () => {
  test('can select a single node', async () => {
    const { select } = js`
      export default [
        {
          rules: {
              semi: "error",
              "prefer-const": "error"
          }
        }
      ]
    `

    const rule = await select('export[kind=default] property[name=rules] > value > object > property > key > *').node()

    expect(rule).toBeDefined()
    expect(rule!['name']).toEqual('semi')
  })

  test('can select all matching nodes.', async () => {
    const { selectAll } = js`
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
    `

    const selected = await selectAll(`
        export[kind=default]
        property:has(


          > key
          > :is(identifier[name=rules], literal[value=rules])
        )
        > value > object > property > key > *
      `)

    const rules = await each(selected, node => node['name'] ?? node['value'])

    expect(rules).toEqual(['semi', 'prefer-const', 'curly', 'no-unused-var'])
  })
})
