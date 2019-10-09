function isValidName(name) {
  if (typeof name === 'string' && name.trim().length >= 3) {
    return true;
  }
  return false;
}


function hoursAttended(attended, length) {
  // only strings and numbers allowed
  if ((typeof attended !== 'number' && typeof attended !== 'string') ||
      (typeof length !== 'number' && typeof length !== 'string')) {
    return false;
  }

  // the empty string is not a valid number for our purposes, even though it coerces to one
  if ((typeof attended === 'string' && attended === '') ||
      (typeof length === 'string' && length === '')) {
    return false;
  }

  attended = Number(attended);
  length = Number(length);

  // args must be 0 or higher
  if (attended < 0 || length < 0) {
    return false;
  }

  // args must be whole numbers
  if (!Number.isInteger(attended) || !Number.isInteger(length)) {
    return false;
  }

  // `attended` cannot exceed `length`
  if (attended > length) {
    return false;
  }

  // all failure cases passed
  return true;
}


// tests:
console.log(isValidName("Frank") === true);
console.log(hoursAttended(6,10) === true);
console.log(hoursAttended(6,"10") === true);
console.log(hoursAttended("6",10) === true);
console.log(hoursAttended("6","10") === true);

console.log(isValidName(false) === false);
console.log(isValidName(null) === false);
console.log(isValidName(undefined) === false);
console.log(isValidName("") === false);
console.log(isValidName("  \t\n") === false);
console.log(isValidName("X") === false);
console.log(hoursAttended("",6) === false);
console.log(hoursAttended(6,"") === false);
console.log(hoursAttended("","") === false);
console.log(hoursAttended("foo",6) === false);
console.log(hoursAttended(6,"foo") === false);
console.log(hoursAttended("foo","bar") === false);
console.log(hoursAttended(null,null) === false);
console.log(hoursAttended(null,undefined) === false);
console.log(hoursAttended(undefined,null) === false);
console.log(hoursAttended(undefined,undefined) === false);
console.log(hoursAttended(false,false) === false);
console.log(hoursAttended(false,true) === false);
console.log(hoursAttended(true,false) === false);
console.log(hoursAttended(true,true) === false);
console.log(hoursAttended(10,6) === false);
console.log(hoursAttended(10,"6") === false);
console.log(hoursAttended("10",6) === false);
console.log(hoursAttended("10","6") === false);
console.log(hoursAttended(6,10.1) === false);
console.log(hoursAttended(6.1,10) === false);
console.log(hoursAttended(6,"10.1") === false);
console.log(hoursAttended("6.1",10) === false);
console.log(hoursAttended("6.1","10.1") === false);
