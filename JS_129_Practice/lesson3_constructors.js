// What does the following code log to the console?
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
/*
This logs `'NaN'` 'NaN' because we invoke `RECTANGLE.area()` and `RECTANGLE.perimeter()` as method calls, implicitly setting their context to `RECTANGLE` which has no `width` or `height` properties. Thus those methods perform operations on `undefined`, returning `NaN`.
*/


// What will the following log to the console?
function Ninja() {
  this.swung = true;
}

let ninja = new Ninja();

Ninja.prototype.swingSword = function() {
  return this.swung;
};

console.log(ninja.swingSword());
/*
This will log `true`. The `ninja.swingSword()` expression on line 38 delegates the method invocation to the `ninja` object's prototype, which is equivalent to `Ninja.prototype`.
*/

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
/*
This would result in an error. When we initialize `ninja` to reference a new instance of `Ninja` on line 48, we set its prototype to the object referenced by `Ninja.prototype`. But on line 50, we reassign `Ninja.prototype` to a new object. This object is not `ninja`'s prototype, so `ninja.swingSword()` results in an error. 
*/
