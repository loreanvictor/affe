import {
  select, selectable, pipe, tag, pick, first, all,
  js, jsx,
} from '../index'


test('everything is exported.', () => {
  expect(selectable).toBeDefined()
  expect(select).toBeDefined()
  expect(tag).toBeDefined()
  expect(pipe).toBeDefined()
  expect(pick).toBeDefined()
  expect(first).toBeDefined()
  expect(all).toBeDefined()

  expect(js).toBeDefined()
  expect(jsx).toBeDefined()
})
