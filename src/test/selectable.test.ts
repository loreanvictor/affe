import { selectable } from '../selectable'


describe(selectable, () => {
  test('transforms objects into selectable trees.', async () => {
    await expect(selectable({
      x: 42,
      y: ['hi', 'there'],
      z: {
        a: false,
        b: 'what is up?'
      }
    })).resolves.toEqual({
      type: 'node',
      x: 42,
      children: [
        {
          type: 'y',
          children: [
            { type: 'node', value: 'hi' },
            { type: 'node', value: 'there' }
          ]
        },
        {
          type: 'z',
          a: false,
          b: 'what is up?',
          children: []
        }
      ]
    })
  })

  test('can keep some fields.', async () => {
    await expect(selectable({
      x: 42,
      y: ['hi', 'there'],
      z: {
        a: false,
        b: 'what is up?'
      }
    }, {
      keep: () => ['y']
    })).resolves.toEqual({
      type: 'node',
      x: 42,
      y: ['hi', 'there'],
      children: [
        {
          type: 'z',
          a: false,
          b: 'what is up?',
          children: []
        }
      ]
    })
  })
})
