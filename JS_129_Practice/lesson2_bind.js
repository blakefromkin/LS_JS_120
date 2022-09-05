// What will the following log?
let obj = {
  message: 'JavaScript',
};

function foo() {
  console.log(this.message);
}

foo.bind(obj);
/*
This will not log anything to the console. The `bind` method does not invoke the function or method that calls it.
*/

// What will the following output?
let obj = {
  a: 2,
  b: 3,
};

function foo() {
  return this.a + this.b;
}

let bar = foo.bind(obj);

console.log(foo());
console.log(bar());
/*
This will log `NaN` followed by the number `5`.
On line 21, we declare the function `foo` which returns the sum of the values stored by the properties `this.a` and `this.b`. When `foo` is invoked as a function on line 27, the value of `this` is the global object, and so the values at those two properties are both `undefined`. Adding those two values together returns `NaN`.

But on line 25, we initialize the global variable `bar` to the return value of permanently binding the `foo` function to the execution context of `obj`. When `bar` is then invoked on line 28, `this.a` and `this.b` reference the `a` and `b` properties of `obj.` So the sum of 2 + 3 (5) is logged.
*/

// What will the following log?
let positivity = {
  message: 'JavaScript makes sense!',
};

let negativity = {
  message: 'JavaScript makes no sense!',
};

function foo() {
  console.log(this.message);
}

let bar = foo.bind(positivity);

negativity.logMessage = bar;
negativity.logMessage();
/*
This will log the string `Javascript makes sense!`. This is because on line 49, we invoke the `bind` method on `foo` to permanently bind the new function to the `positivity` object.

On line 51, we then initialize a new `logMessage` property in the `negativity` object to the function referenced by the `bar` variable. Since `bar` has been permanently bound to `positivity`, that is the execution context even in the expression `negativity.logMessage()` on line 52. And so, the value referenced by the `message` property of `positivity` is logged.
*/

// What will the following output?
let obj = {
  a: 'Amazebulous!',
};
let otherObj = {
  a: "That's not a real word!",
};

function foo() {
  console.log(this.a);
}

let bar = foo.bind(obj);

bar.call(otherObj);
/*
This code will log the string `Amazebulous!` to the console.
This is because on line 71, we permanently bind the function referenced by the `bar` variable to the `obj` object. This is not affected by the invocation of `call` on `bar` on line 73. `bar` will still log `this.a` with `obj` as the value of `this`, and so `Amazebulous!` is logged to the console.
*/
