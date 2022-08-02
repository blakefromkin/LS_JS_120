// Consider the code:
function Greeting() {}

Greeting.prototype.greet = function(message) {
  console.log(message);
};

function Hello() {}

Hello.prototype = Object.create(Greeting.prototype);

Hello.prototype.hi = function() {
  this.greet('Hello!');
};

function Goodbye() {}

Goodbye.prototype = Object.create(Greeting.prototype);

Goodbye.prototype.bye = function() {
  this.greet("Goodbye");
};


// Q1: What happens here?
let hello = new Hello();
hello.hi();
// A: This will log 'Hello!' since hello inherits the hi method from Hello.prototype

// Q2: What happens here?
let hello = new Hello();
hello.bye();
// A: This throws a TypeError since bye is not accessible to hello.

// Q3: What happens here?
let hello = new Hello();
hello.greet();
// A: This logs undefined. The greet method is accessible to hello since Greeting.prototype is Hello.prototype's prototype. But we don't provide an argument to greet.

// Q4: What happens here?
let hello = new Hello();
hello.greet('Goodbye');
// A: This logs Goodbye. For the reasons in the above answer^.

// Q5: What happens here?
Hello.hi();
// A: This throws a TypeError since the Hello constructor does not have a hi method.
