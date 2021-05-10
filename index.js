'use strict'

// traverse a non-flat array without full-depth flattening first.
module.exports = (mainArray, visitor) => {
  const stack = []  // store array+index info as we move to inner arrays.
  let a = mainArray // our first array is the main one.
  let i = 0         // we start at zero, of course, obviously.
  let I = 0         // the overall index of elements encountered.
  let e             // the current "element" in the array.

  while (i < a.length) {
    // 1. get the element.
    e = a[i]

    // 2. if it's an array, stack.
    // repeatedly stack until we get a non-array element.
    while (Array.isArray(e)) {
      if (e.length > 0) { // non-empty array means stack.
        stack.push([a, i + 1]) // remember where to continue in the current array.
        a = e    // start on this new array.
        i = 0    // restart at the beginning of this new array.
      } else {   // empty array gets skipped over.
        i += 1   // move passed this empty array.
      }

      e = a[i] // get new element for our loop to check for stacking.
    }

    // 3. call the visitor with the usual trio of values plus our stack.
    visitor(e, I, a, i, stack)

    // 4. the usual increment, plus increment the overall index.
    i += 1
    I += 1

    // 5. check if it's time to unstack.
    // loop on it in case we've completed multiple stacked arrays.
    // Note, the '>=' is just precautionary, we could do 'i === a.length'.
    while (i >= a.length && stack.length > 0) {
      // pop the most recent array and its index.
      [a, i] = stack.pop()
    }
  } // end main while-loop
} // end function
