// What will this log?
function func() {
  return this;
}

let context = func();

console.log(context);
/*
This will log the global object.
On line 2, we declare the function `func`, which returns the value of `this` when it is invoked.

On line 6, we assign the return value of invoking `func` to the global variable `context`, which will be the global object since this involves a standalone function invocation.
*/

// What will this output?
let obj = {
  func: function() {
    return this;
  },
};

let context = obj.func();

console.log(context);
/*
This will output the object `obj`.
On line 17, we initialize the global variable `obj` to reference an object which contains a `func` method that returns the current value of `this`.

Since we invoke  `func` as a method call on `obj` on line 23, `obj` is the implicit execution context and `func` returns `obj`. So the `obj` object is logged on line 25.
*/

// What will the following output?
message = 'Hello from the global scope!';

function deliverMessage() {
  console.log(this.message);
}

deliverMessage();

let foo = {
  message: 'Hello from the function scope!',
};

foo.deliverMessage = deliverMessage;

foo.deliverMessage();
/*
This code will log the string `Hello from the global scope!` followed by the string `Hello from the function scope!`

On line 34, we initialize the variable `message` as a property on the global object.
Since the function `deliverMessage` declared on line 36 logs the current value of `this.message`, it will log the value of the `message` property of the global object when invoked as a function on line 40.

We then initialize the global variable `foo` to reference an object with its own `message` property on line 42. On line 46, we initialize this object's `deliverMessage` property to the `deliverMessage` function. 

When we invoke `foo.deliverMessage()` on line 48, we implicitly set the execution context and value of `this` within the method to the `foo` object. And so the value of `foo.message` is logged to the console.
*/
