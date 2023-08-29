import { selector, selectable,
  js
} from '../index'


test('everything is exported.', () => {
  expect(selectable).toBeDefined()
  expect(selector).toBeDefined()

  expect(js).toBeDefined()
})
