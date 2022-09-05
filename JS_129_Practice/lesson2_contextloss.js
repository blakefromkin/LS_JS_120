// What will this output?
let turk = {
  firstName: 'Christopher',
  lastName: 'Turk',
  occupation: 'Surgeon',
  getDescription() {
      return this.firstName + ' ' + this.lastName + ' is a '
                                  + this.occupation + '.';
  }
};

function logReturnVal(func) {
  let returnVal = func();
  console.log(returnVal);
}

logReturnVal(turk.getDescription);
/*
This will log the string `'undefined undefined is a undefined'`.
This is because on line 6, the definition of the `getDescription` method in the `turk` object's return statement includes several instances of the `this` keyword.

When we pass the `getDescription` method to `logReturnVal` as an argument in line 17's function invocation, `this` is implicitly references the global object. And since the global object has no `firstName`, `lastName`, or `occupation` properties, the relevant expressions each return `undefined`.
*/

// What will this output and why?
const TESgames = {
  titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
  seriesTitle: 'The Elder Scrolls',
  listGames: function() {
    this.titles.forEach(function(title) {
      console.log(this.seriesTitle + ': ' + title);
    });
  }
};

TESgames.listGames();
/*
This will log `'undefined:'` followed by a title in the array referenced by the `titles` property 5 times.
This is because on line 30, we pass an anonymous function to `forEach`. This implicitly sets the execution context of the callback function to the global object, and so `this.seriesTitle` will always return `undefined`.
However, since `this.titles.forEach` is a method call, the implicit execution context of `forEach` is `TESgames`. And so `title` will return the expect values from the array referened by the `titles` property.
*/

// What will the value of foo.a be after this code runs?
let foo = {
  a: 0,
  incrementA: function() {
    function increment() {
      this.a += 1;
    }

    increment();
  }
};

foo.incrementA();
foo.incrementA();
foo.incrementA();
/*
The value of `foo.a` will be `0` after this code runs.
This is because within the definition of the `incrementA` method of `foo`, we define a nested `increment` function which contains the expression `this.a += 1`. We then invoke `increment` as a standalone function on line 51. This invocation implicitly sets the execution context to the global object, and so we initialize and increment an `a` property on the global object rather than `foo`.

Thus, `foo.a` maintains its initial value `0`. 
*/
