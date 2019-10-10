function findAll(val, arr) {
  let result = [];
  for (let el of arr) {
    if (testLooseEquality(val, el)) {
      result.push(el);
    }
  }
  return result;
}

function testLooseEquality(a, b) {
  // strict equality that covers NaN and -0
  if (Object.is(a, b)) {
    return true;
  }

  // otherwise, strictly unmatch everything else with -0
  // NaN will take care of itself
  if (Object.is(a, -0) || Object.is(b, -0)) {
    return false;
  }

  // null should be equal to only null or undefined. == matches null to both null and undefined
  if (a == null && b == null) {
    return a == b;
  } else if (a == null || b == null) {
    return false;
  }

  // conditions for strict equality
  if (
    (typeof a == 'string' && a.trim() === '') ||
    (typeof b === 'string' && b.trim() === '') ||
    (typeof a == 'boolean' || typeof b == 'boolean')
  ) {
    return a === b;
  }

  // finally, fall back to standard coercive test
  return a == b;
}


// tests:
var myObj = { a: 2 };

var values = [
	null, undefined, -0, 0, 13, 42, NaN, -Infinity, Infinity,
	"", "0", "42", "42hello", "true", "NaN", true, false, myObj
];

console.log(setsMatch(findAll(null,values),[null,undefined]) === true, findAll(null,values));
console.log(setsMatch(findAll(undefined,values),[null,undefined]) === true, findAll(undefined,values));
console.log(setsMatch(findAll(0,values),[0,"0"]) === true, findAll(0,values));
console.log(setsMatch(findAll(-0,values),[-0]) === true, findAll(-0,values));
console.log(setsMatch(findAll(13,values),[13]) === true, findAll(13,values));
console.log(setsMatch(findAll(42,values),[42,"42"]) === true, findAll(42,values));
console.log(setsMatch(findAll(NaN,values),[NaN]) === true, findAll(NaN,values));
console.log(setsMatch(findAll(-Infinity,values),[-Infinity]) === true, findAll(-Infinity,values));
console.log(setsMatch(findAll(Infinity,values),[Infinity]) === true, findAll(Infinity,values));
console.log(setsMatch(findAll("",values),[""]) === true, findAll("",values));
console.log(setsMatch(findAll("0",values),[0,"0"]) === true, findAll("0",values));
console.log(setsMatch(findAll("42",values),[42,"42"]) === true, findAll("42",values));
console.log(setsMatch(findAll("42hello",values),["42hello"]) === true, findAll("42hello",values));
console.log(setsMatch(findAll("true",values),["true"]) === true, findAll("true",values));
console.log(setsMatch(findAll(true,values),[true]) === true, findAll(true,values));
console.log(setsMatch(findAll(false,values),[false]) === true, findAll(false,values));
console.log(setsMatch(findAll(myObj,values),[myObj]) === true, findAll(myObj,values));

console.log(setsMatch(findAll(null,values),[null,0]) === false, findAll(null,values));
console.log(setsMatch(findAll(undefined,values),[NaN,0]) === false, findAll(undefined,values));
console.log(setsMatch(findAll(0,values),[0,-0]) === false, findAll(0,values));
console.log(setsMatch(findAll(42,values),[42,"42hello"]) === false, findAll(42,values));
console.log(setsMatch(findAll(25,values),[25]) === false, findAll(25,values));
console.log(setsMatch(findAll(Infinity,values),[Infinity,-Infinity]) === false, findAll(Infinity,values));
console.log(setsMatch(findAll("",values),["",0]) === false, findAll("",values));
console.log(setsMatch(findAll("false",values),[false]) === false, findAll("false",values));
console.log(setsMatch(findAll(true,values),[true,"true"]) === false, findAll(true,values));
console.log(setsMatch(findAll(true,values),[true,1]) === false, findAll(true,values));
console.log(setsMatch(findAll(false,values),[false,0]) === false, findAll(false,values));

// ***************************

function setsMatch(arr1,arr2) {
	if (Array.isArray(arr1) && Array.isArray(arr2) && arr1.length == arr2.length) {
		for (let v of arr1) {
			if (!arr2.includes(v)) return false;
		}
		return true;
	}
	return false;
}
