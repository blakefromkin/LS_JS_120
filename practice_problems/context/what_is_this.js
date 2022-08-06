// What will this log?
let person = {
  firstName: 'Rick ',
  lastName: 'Sanchez',
  fullName: this.firstName + this.lastName,
};

console.log(person.fullName);

// A: This will log NaN (undefined + undefined). Anywhere outside a function, the keyword this is bound to the global object. 
