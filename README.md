# array-each-nonflat
[![Build Status](https://travis-ci.org/elidoran/array-each-nonflat.svg?branch=master)](https://travis-ci.org/elidoran/array-each-nonflat)
[![npm version](https://badge.fury.io/js/array-each-nonflat.svg)](http://badge.fury.io/js/array-each-nonflat)
[![Coverage Status](https://coveralls.io/repos/github/elidoran/array-each-nonflat/badge.svg?branch=master)](https://coveralls.io/github/elidoran/array-each-nonflat?branch=master)

Array 'each' on non-flat arrays via a non-recursive single-loop.

## Install

```sh
$ npm i array-each-nonflat
```


## Usage

Basically, your function will receive each element (first argument) in order as it goes thru the array from beginning to end, including into any sub-arrays it encounters from beginning to end.

The usual index argument (second argument) is the same as you would expect of a flat array. It's where the element would be if the array was flattened. That makes it different than the usual value because it's not the index into the current array (third argument).

The usual array argument (third argument) is the array the element is from, so, it may be an inner array instead of the main outermost array provided to `each`.

A new fourth argument is the index into the current array for the current element.

A new fifth argument is the stack of outer arrays and their next index to process, once we complete the current inner array. Each stack element is an array with two elements. The first is the array and the second is the index in that array to do next, when we get back to that array.

```js
const each = require('array-each-nonflat')

// a non-flat array:
const innerArray1 = [2, 3]
const innerArray3 = [5, 6]
const innerArray2 = [4, innerArray3, 7, 8]
// the below is the same as:
//   [ 1, [2, 3], [4, [5, 6], 7, 8], 9 ]
let array = [ 1, innerArray1, innerArray2, 9 ]

// call a function for each element:
each(array, (e, I, a, i, s) => {
  // e: current array element.
  // I: overall index of the current element.
  // a: the array the current element is from.
  // i: the index into `a` where `e` is from.
  // s: stack of [parentArray, nextIndex] to continue with after this array.
})

// the above variables will have the following values for the above call.
// e=1, I=0, a=array, i=0, s=empty
// e=2, I=1, a=innerArray1, i=0, s=[ [array, 2] ]
// e=3, I=2, a=innerArray1, i=1, s=[ [array, 2] ]
// e=4, I=3, a=innerArray2, i=0, s=[ [array, 3] ]
// e=5, I=4, a=innerArray3, i=0, s=[ [array, 3], [innerArray2, 2] ]
// e=6, I=5, a=innerArray3, i=1, s=[ [array, 3], [innerArray2, 2] ]
// e=7, I=6, a=innerArray2, i=2, s=[ [array, 3] ]
// e=8, I=7, a=innerArray2, i=3, s=[ [array, 3] ]
// e=9, I=8, a=array, i=3, s=[]
```

## [MIT License](LICENSE)
