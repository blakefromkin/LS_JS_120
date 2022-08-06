// A grocery store uses a JavaScript function to calculate discounts on various items. They are testing out various percentage discounts but are getting unexpected results. Go over the code, and identify the reason why they aren't getting the expected discounted prices from the function. Then, modify the code so that it produces the correct results.
// let item = {
//   name: 'Foo',
//   description: 'Fusce consequat dui est, semper.',
//   price: 50,
//   quantity: 100,
//   discount: function(percent) {
//     let discount = this.price * percent / 100;
//     this.price -= discount;
//
//     return this.price;
//   },
// };
//
// item.discount(20)   // should return 40, does
// item.discount(50)   // should return 25, returns 20
// item.discount(25)   // should return 37.5, returns 15

// A: The reason is that each time we call the discount method, we are changing the value of the price property. So after the first call, each subsequent call will return an incorrect value. Solution below:
let item = {
  name: 'Foo',
  description: 'Fusce consequat dui est, semper.',
  price: 50,
  quantity: 100,
  discount: function(percent) {
    let discount = this.price * percent / 100;
    return this.price - discount;
  },
};

item.discount(20)   // 40
item.discount(50)   // 25
item.discount(25)   // 37.5
