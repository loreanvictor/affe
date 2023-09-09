import { pipe, first, pick, all } from '../../../util'
import { select } from '../../../select'
import { js, jsx } from '../index'


describe('EcmaScript', () => {
  test('can select a single node', async () => {
    const rule = await pipe(
      js`
        export default [
          {
            rules: {
                semi: "error",
                "prefer-const": "error"
            }
          }
        ]
      `,
      select('export[kind=default] property[name=rules] > value > object > property > key > *'),
      first(),
    )

    expect(rule).toBeDefined()
    expect(rule!['name']).toEqual('semi')
  })

  test('can select all matching nodes.', async () => {
    const rules = await pipe(
      js`
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
      `,
      select(`
        export[kind=default]
        property:has(
          > key
          > :is(identifier[name=rules], literal[value=rules])
        )
        > value > object > property > key > *
      `),
      pick(node => node['name'] ?? node['value']),
      all(),
    )

    expect(rules).toEqual(['semi', 'prefer-const', 'curly', 'no-unused-var'])
  })

  test('works with jsx', async () => {
    const params = await pipe(
      jsx`
        export default ({name, style}) => (
          <div className={style}>{name}</div>
        )
      `,
      select('export params property key *'),
      pick(node => node['name'] ?? node['value']),
      all(),
    )

    expect(params).toEqual(['name', 'style'])
  })
})
