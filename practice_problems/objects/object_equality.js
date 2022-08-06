// Write a function objectsEqual that accepts two object arguments and returns true or false depending on whether the objects have the same key/value pairs.
// Further exploration: make your function work for objects whos values are other objects
function objectsEqual(obj1, obj2) {
  if (obj1 === obj2) return true; // check for same object

  for (let key in obj1) {
    if (!obj2.hasOwnProperty(key)) return false;

    if (obj1[key] !== obj2[key]) {
      if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
        if (objectsEqual(obj2[key], obj1[key])) continue;
      }
      return false;
    }
  }
  return Object.keys(obj1).length === Object.keys(obj2).length;
}

console.log(objectsEqual({a: 'foo'}, {a: 'foo'}));                      // true
console.log(objectsEqual({a: 'foo', b: 'bar'}, {a: 'foo'}));            // false
console.log(objectsEqual({}, {}));                                      // true
console.log(objectsEqual({a: 'foo', b: undefined}, {a: 'foo', c: 1}));  // false
// Further exploration:
console.log(objectsEqual({a: {z: 'foo'}}, {a: {z: 'foo'}})); // true
console.log(objectsEqual({a: {z: {x: 'foo'}}}, {a: {z: {x: 'bar'}}})); // false
