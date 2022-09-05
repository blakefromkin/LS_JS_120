// What will the following log to the console?
let qux = { foo: 1 };
let baz = Object.create(qux);
console.log(baz.foo + qux.foo);

/*
This code will log the number `2` to the console.
On line 2, we initialize the global variable `qux` to reference the object `{foo: 1}`.
Then on line 3, we initialize the global variable `baz` to the return value of calling `Object.create()` with `qux` as its argument. This stores a new object whose prototype is `qux` in `baz`. So, the two `foo` properties referenced on line 4 both have the value `1`, and the sum of those two `2` is logged to the console.

This example demonstrates the notion of an object delegating its property access to its prototype.
*/

// What will the following log and why?
let qux = { foo: 1 };
let baz = Object.create(qux);
baz.foo = 2;

console.log(baz.foo + qux.foo);

/*
This code will log the number `3` to the console.
On line 15, we initialize the global variable `qux` to reference the object `{foo: 1}`.
Then we initialize the global variable `baz` to the return value of calling `Object.create()` on `qux`, which is a new object whose prototype is `qux`.
At this point, both `qux.foo` and `baz.foo` hold the value `1`.

But on line 17, we reassign `baz.foo` to the value `2`. So when we add `baz.foo` and `qux.foo` on line 19, the number `3` is logged.

This demonstrates the way that JS accesses property values by first checking any own properties in an object.
*/

// What will this log and why?
let qux = { foo: 1 };
let baz = Object.create(qux);
qux.foo = 2;

console.log(baz.foo + qux.foo);

/*
This code will log the number `4` to the console.
On line 33, we initialize `qux` to reference the object `{foo: 1}`. We then initialize `baz` to the return value of calling `Object.create` on `qux`, which is a new object whose prototype is `qux`.

At this point, both `qux.foo` and `baz.foo` hold the value `1`. But on line 35, we update the value of the `foo` property that both of those expressions reference to the number `2`. So on line 37, we log the result of 2 + 2 to the console, which is the number `4`. 
*/
