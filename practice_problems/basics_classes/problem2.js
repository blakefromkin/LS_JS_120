// Create an empty class named Cat.
// class Cat {}

// add a constructor method that logs to the console I'm a cat! when a new Cat object is initialized.
// add a parameter to constructor that provides a name for the Cat object. Assign this parameter to a property called name and use it to log a greeting with the provided name.
// move the greeting from the constructor method to an instance method named greet that logs a greeting to the console when invoked.
// add an instance method named rename that renames kitty when invoked


class Cat {
  constructor(name) {
    this.name = name;
  }

  personalGreeting() {
    console.log(`Hello! My name is ${this.name}!`);
  }

  rename(name) {
    this.name = name;
  }

  static genericGreeting() {
    console.log("Hello! I'm a cat!")
  }
}

// create an instance of Cat and assign it to a variable named kitty.
let kitty = new Cat('Sophie');
// kitty.greet();
// console.log(kitty.name); // Sophie
// kitty.rename('Chloe');
// console.log(kitty.name); // Chloe

// Add code to Cat so that Hello! I'm a cat! is logged when Cat.genericGreeting is invoked. Then make a personalGreeting instance method to log a custom greeting.
Cat.genericGreeting();
kitty.personalGreeting();



// Create a class Person. Person should accept one argument for "name" when instantiated. If no arguments are given, person object should instantiate with a "name" of "John Doe".
class Person {
  constructor(name = "John Doe") {
    this.name = name;
  }
}

let person1 = new Person();
let person2 = new Person("Pepe");

console.log(person1.name); // John Doe
console.log(person2.name); // Pepe
