// What will this output?
function func() {
  return this;
}

let context = func();

console.log(context);
// A: It would output the global object. Since line 6 calls func() "as a function" (with parentheses).


// What will this output? Is there a difference between this and the previous problem?
let obj = {
  func: function() {
    return this;
  },
};

let context = obj.func();

console.log(context);
// A: This will output the literal representation of obj, or {func: [Function: func]} Here, we are calling func as a method on obj, implicitly binding this to obj.


// What will this output?
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
// A: Line 32 would output the string on line 26, while line 40 would output the string on line 35. The binding of this changes with each context.


// Take a look at the following code snippet. Use call to invoke the add method but with foo as execution context. What will this return?
let foo = {
  a: 1,
  b: 2,
};

let bar = {
   a: 'abc',
   b: 'def',
   add: function() {
     return this.a + this.b;
   },
};
//A:
bar.add.call(foo); // Returns 3
