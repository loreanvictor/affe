import { selector, selectable, each, tag,
  js
} from '../index'


test('everything is exported.', () => {
  expect(selectable).toBeDefined()
  expect(selector).toBeDefined()
  expect(each).toBeDefined()
  expect(tag).toBeDefined()

  expect(js).toBeDefined()
})
