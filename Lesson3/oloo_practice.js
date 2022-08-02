// Use a factory function to create pet objects. The factory should let us create and use pets like this:
// let pudding = createPet("Cat", "Pudding");
// console.log(`I am a ${pudding.animal}. My name is ${pudding.name}.`);
// pudding.sleep(); // I am sleeping
// pudding.wake();  // I am awake
//
// // A:
// function createPet(animal, name) {
//   return {
//     animal,
//     name,
//
//     sleep: function() {
//       console.log('I am sleeping');
//     },
//     wake: function() {
//       console.log('I am awake');
//     }
//   };
// }


// Use the OLOO pattern to create an object prototype that we can use to create pet objects. The prototype should let us create and use pets like this:
let pudding = Object.create(PetPrototype).init("Cat", "Pudding");
console.log(`I am a ${pudding.animal}. My name is ${pudding.name}.`);
pudding.sleep(); // I am sleeping
pudding.wake();  // I am awake

// A:
const PetPrototype = {
  init(animal, name) {
    this.animal = animal;
    this.name = name;
    return this;
  },

  sleep: function() {
    console.log('I am sleeping');
  },
  wake: function() {
    console.log('I am awake');
  }
};
