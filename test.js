'use strict'

const tap = require('tap')

const each = require('./index.js')

tap.test('empty inner arrays', t => {
  const array = [ 0, 1, 2, [[], [[[]]]], 4, 5, 6, 7 ]

  const visitor = (_, __, ___, i, ____) => {
    t.not(i, 3, 'should skip over index 3')
  }

  each(array, visitor)

  t.end()
})

tap.test('depth=1', t => {
  let index = 0
  const array = [ 0, 1, 2, 3, 4, 5, 6, 7 ]

  const visitor = (e, I, a, i, s) => {
    t.equal(e, index, 'element should equal index')
    t.equal(i, index, 'is should equal index')
    t.equal(a, array, 'a should equal the array')
    t.equal(s.length, 0, 'stack should be empty')
    index++
  }

  each(array, visitor)

  t.end()
})

tap.test('depth=2', t => {
  const inner1 = [1, 2]
  const inner2 = [4, 5, 6]
  const array = [0, inner1, 3, inner2, 7 ]

  const values = []

  const visitor = (e, I, a, i, s) => {
    values.push([e, I, a, i, s.length])
  }

  each(array, visitor)

  t.same(values, [
    [0, 0, array, 0, 0],
    [1, 1, inner1, 0, 1],
    [2, 2, inner1, 1, 1],
    [3, 3, array, 2, 0],
    [4, 4, inner2, 0, 1],
    [5, 5, inner2, 1, 1],
    [6, 6, inner2, 2, 1],
    [7, 7, array, 4, 0],
  ])

  t.end()
})

tap.test('depth=3', t => {
  // [0, [[1, 2, 3, 4], 5, [6, 7, 8]], 9, 10]
  const inner1_2 = [1, 2, 3, 4]
  const inner1_3 = [6, 7, 8]
  const inner1_1 = [inner1_2, 5, inner1_3]
  const array = [0, inner1_1, 9, 10]

  const values = []

  const visitor = (e, I, a, i, s) => {
    values.push([e, I, a, i, s.length])
  }

  each(array, visitor)

  t.same(values, [
    [0, 0, array, 0, 0],
    [1, 1, inner1_2, 0, 2],
    [2, 2, inner1_2, 1, 2],
    [3, 3, inner1_2, 2, 2],
    [4, 4, inner1_2, 3, 2],
    [5, 5, inner1_1, 1, 1],
    [6, 6, inner1_3, 0, 2],
    [7, 7, inner1_3, 1, 2],
    [8, 8, inner1_3, 2, 2],
    [9, 9, array, 2, 0],
    [10, 10, array, 3, 0],
  ])

  t.end()
})
