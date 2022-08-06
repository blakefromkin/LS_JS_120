// The method franchise.allMovies is supposed to return the following array:
[
  'How to Train Your Dragon 1',
  'How to Train Your Dragon 2',
  'How to Train Your Dragon 3'
]

// Explain why this method will not return the desired object. Try fixing this problem by taking advantage of JavaScript lexical scoping rules.
let franchise = {
  name: 'How to Train Your Dragon',
  allMovies: function() {
    return [1, 2, 3].map(function(number) {
      return this.name + ' ' + number;
    });
  },
};

// A: This will not return the desired object because the callback function is passed as an argument to map. Therefore, the value of 'this' inside the callback is the global object.
// There are a few ways to fix this, but the simplest is to refactor the callback as an arrow function. 
