// What will the following log to the console?
let qux = { foo: 1 };
let baz = Object.create(qux);
console.log(baz.foo + qux.foo);
// A: This will log 2 to the console since both baz.foo and qux.foo === 2

// What will the following log to the console?
let qux = { foo: 1 };
let baz = Object.create(qux);
baz.foo = 2;

console.log(baz.foo + qux.foo);
// A: This will log 3 to the console, since assigning baz.foo assigns a new "own" property foo to baz. 1 + 2 = 3

// What will the following log?
let qux = { foo: 1 };
let baz = Object.create(qux);
qux.foo = 2;

console.log(baz.foo + qux.foo);
// A: This will log 4 to the console. Both baz.foo and qux.foo === 2.

/*
Write a function that searches the prototype chain of an object for a given property and assigns it a new value. If the property does not exist in any of the prototype objects, the function should do nothing.
*/
function assignProperty(obj, prop, val) {
  while (obj !== null) {
    if (obj.hasOwnProperty(prop)) {
      obj[prop] = val;
      break;
    } else {
      obj = Object.getPrototypeOf(obj);
    }
  }
}

let fooA = { bar: 1 };
let fooB = Object.create(fooA);
let fooC = Object.create(fooB);

assignProperty(fooC, "bar", 2);
console.log(fooA.bar); // 2
console.log(fooC.bar); // 2

assignProperty(fooC, "qux", 3);
console.log(fooA.qux); // undefined
console.log(fooC.qux); // undefined
console.log(fooA.hasOwnProperty("qux")); // false
console.log(fooC.hasOwnProperty("qux")); // false


// Consider the following 2 loops:
for (let property in foo) {
  console.log(`${property}: ${foo[property]}`);
}

Object.keys(foo).forEach(property => {
  console.log(`${property}: ${foo[property]}`);
});

// If foo is an arbitrary object, will these loops always log the same results to the console? Explain why they do or do not. If they don't always log the same information, show an example of when the results differ.
// A: These will not always log the same results. for/in iterates over prototype chain properties in addition to own properties, while Object.keys only iterates over own properties.


// How do you create an object that doesn't have a prototype? How can you determine whether an object has a prototype?
// A: You can create an object without a prototype by explicitly setting its prototype to null. For example: let a = Object.create(null);
// You can determine whether an object has a prototype with code like Object.getPrototypeOf(obj)... since a prototype of null would return false 
