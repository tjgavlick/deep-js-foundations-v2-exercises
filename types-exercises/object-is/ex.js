Object.is = function (a, b) {
  if (typeof a !== typeof b) {
    return false;
  }

  // numbers, including -0 and NaN
  if (typeof a === 'number') {
    // test NaN (without using isNaN(), per the exercise)
    // NaN is the only number in js that isn't equal to itself, per IEEE 754
    if (a !== a && b !== b) {
      return true;
    }
    // test potential -0s
    if (a === 0 && b === 0) {
      // dividing by zero in js does not throw a division by zero error. Instead, it produces
      // Infinity. Dividing by -0 produces -Infinity, which is the only way to distinguish 0
      // and -0
      return 1 / a === 1 / b;
    }
  }

  // strings, objects, bools, symbols, and undefined
  return a === b;
};

// tests:
console.log(Object.is(42,42) === true);
console.log(Object.is("foo","foo") === true);
console.log(Object.is(false,false) === true);
console.log(Object.is(null,null) === true);
console.log(Object.is(undefined,undefined) === true);
console.log(Object.is(NaN,NaN) === true);
console.log(Object.is(-0,-0) === true);
console.log(Object.is(0,0) === true);

console.log(Object.is(-0,0) === false);
console.log(Object.is(0,-0) === false);
console.log(Object.is(0,NaN) === false);
console.log(Object.is(NaN,0) === false);
console.log(Object.is(42,"42") === false);
console.log(Object.is("42",42) === false);
console.log(Object.is("foo","bar") === false);
console.log(Object.is(false,true) === false);
console.log(Object.is(null,undefined) === false);
console.log(Object.is(undefined,null) === false);
