// What does the following code log to the console? Why?
let RECTANGLE = {
  area: function() {
    return this.width * this.height;
  },
  perimeter: function() {
    return 2 * (this.width + this.height);
  },
};

function Rectangle(width, height) {
  this.width = width;
  this.height = height;
  this.area = RECTANGLE.area();
  this.perimeter = RECTANGLE.perimeter();
}

let rect1 = new Rectangle(2, 3);

console.log(rect1.area);
console.log(rect1.perimeter);
// A: This will log NaN twice. The reason is the constructor sets the area and perimeter values to the return value of calling those two methods on RECTANGLE, which has no width or height properties. So the methods perform mathematical operations with undefined, resulting in NaN.

// How would you fix the above code?
// Change lines 13/14 to this.area = RECTANGLE.area.call(this) etc



// Write a constructor function called Circle that takes a radius as an argument. You should be able to call an area method on any objects created by the constructor to get the circle's area. Test your implementation with the following code:

// A:
function Circle(radius) {
  this.radius = radius;
}

Circle.prototype.area = function() {
  return Math.PI * (this.radius ** 2);
}

// Below is the code provided
let a = new Circle(3);
let b = new Circle(4);

a.area().toFixed(2); // => 28.27
b.area().toFixed(2); // => 50.27
a.hasOwnProperty('area'); // => false



// What will the following log and why?
function Ninja() {
  this.swung = true;
}

let ninja = new Ninja();

Ninja.prototype.swingSword = function() {
  return this.swung;
};

console.log(ninja.swingSword());
// A: This will log true. swingSord is a method on ninja's prototype object, eventhough we create that method after we create ninja.


// What will the following output and why?
function Ninja() {
  this.swung = true;
}

let ninja = new Ninja();

Ninja.prototype = {
  swingSword: function() {
    return this.swung;
  },
};

console.log(ninja.swingSword());
// A: This will throw a TypeError because line 72 reassigns the Ninja constructor's prototype to a new object. ninja's prototype objext remains empty.



// Implement the method described in the comments below:
function Ninja() {
  this.swung = false;
}

// Add a swing method to the Ninja prototype which
// modifies `swung` and returns the calling object
Ninja.prototype.swing = function() {
  this.swung = true;
  return this;
} // NOTE THAT ^RETURNING THE CALLING OBJECT LETS YOU CHAIN METHODS LIKE BELOW

let ninjaA = new Ninja();
let ninjaB = new Ninja();

console.log(ninjaA.swing().swung);      // logs `true`
console.log(ninjaB.swing().swung);      // logs `true`



// Create a new instance of an object, without having direct access to the constructor function:
let ninjaA;

{
  const Ninja = function() {
    this.swung = false;
  };

  ninjaA = new Ninja();
}

// create a `ninjaB` object here; don't change anything else
let ninjaB = new ninjaA.constructor();

ninjaA.constructor === ninjaB.constructor // => true



 // Write a constructor function that you can use with or without the new operator (called a SCOPE-SAFE CONSTRUCTOR). The function should return the same result with either form. Use the code below to check your solution:
function User(first, last){
  if (!(this instanceof User)) {
    return new User(first, last);
  }

  this.name = first + ' ' + last;
}

// Provided code below. Solution above.
let name = 'Jane Doe';
let user1 = new User('John', 'Doe');
let user2 = User('John', 'Doe');

console.log(name);         // => Jane Doe
console.log(user1.name);   // => John Doe
console.log(user2.name);   // => John Doe
