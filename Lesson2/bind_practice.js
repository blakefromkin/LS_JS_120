// What will the following log to the console?
let obj = {
  message: 'JavaScript',
};

function foo() {
  console.log(this.message);
}

foo.bind(obj);
// A: This won't log anything. Line 10 is a statement not an expression. Bind doesn't invoke the function that calls it, unlike call and apply


// What will the following code output?
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
// A: This will output NaN, followed by 5.


// What will the following log to the console?
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
// A: This will log 'Javascript makes sense!' because the the context of bar (and therefore negativity.logMessage) will always be the positivity object.


// What will the below output?
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
// A: This will log 'Amazebulous' because bar is bound to obj, and not even the call method can change that. 
