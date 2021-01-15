const getValue = require('../js/get-value.js')

const obj = { a: { b: { c: { d: { e: { f: 'f' } } } } } },
  arr = [[[3]]],
  errArr = [undefined, null, 0, '']

errArr.forEach(e => {
  test('error', () => {
    expect(getValue(e, 'a.b.c')).toBe(null)
  })
})

test('get "f" in obj', () => {
  expect(getValue(obj, 'a.b.c.d.e.f')).toBe('f')
})

test('the value in obj does not exist', () => {
  expect(getValue(obj, 'a.b.c.f')).toBe(null)
})

test('get 3 value in arr', () => {
  expect(getValue(arr, '0.0.0')).toBe(3)
})

test('the value in arr does not exist', () => {
  expect(getValue(arr, '0.0.0.0')).toBe(null)
})
