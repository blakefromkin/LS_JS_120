// What are two disadvantages of working with factory functions?
// A: You copy the methods every time (rather than using prototypes) which can tax memory. And you also can't immedately tell the "type" of an object made from a factory function.


// Rewrite the following code to use object-literal syntax to generate the returned object:
// function makeObj() {
//   let obj = {};
//   obj.propA = 10;
//   obj.propB = 20;
//   return obj;
// }

// A:
// function makeObj() {
//   return {
//     propA: 10,
//     propB: 20
//   };
// }

// In this problem and the remaining problems, we'll build a simple invoice processing program. To get you started, here's the code to process a single invoice:
// let invoice = {
//   phone: 3000,
//   internet: 6500
// };
//
// let payment = {
//   phone: 1300,
//   internet: 5500
// };
//
// let invoiceTotal = invoice.phone + invoice.internet;
// let paymentTotal = payment.phone + payment.internet;
// let remainingDue = invoiceTotal - paymentTotal;
//
// console.log(paymentTotal);         // => 6800
// console.log(remainingDue);         // => 2700


// First, create a factory function to generate invoices. Requirements:
// It returns an invoice object, with phone and internet properties, and a total method.
// The default value for the phone service is 3000, and the internet service is 5500 (in cents, of course!).
// The function takes an object argument whose attributes override the default values.
// It should work with the following code:

// function createInvoice(services={}) {
//   return {
//     phone: services.phone || 3000,
//     internet: services.internet || 5500,
//
//     total() {
//       return this.phone + this.internet;
//     }
//   };
// }
//
// function invoiceTotal(invoices) {
//   let total = 0;
//
//   for (let index = 0; index < invoices.length; index += 1) {
//     total += invoices[index].total();
//   }
//
//   return total;
// }
//
// let invoices = [];
// invoices.push(createInvoice());
// invoices.push(createInvoice({ internet: 6500 }));
// invoices.push(createInvoice({ phone: 2000 }));
// invoices.push(createInvoice({
//   phone: 1000,
//   internet: 4500,
// }));
//
// console.log(invoiceTotal(invoices)); // 31000


// Now, create a factory function for payments: Can take an arg in 3 forms:
// Payment for one service, e.g., { internet: 1000 } or { phone: 1000 }.
// Payment for both services, e.g., { internet: 2000, phone: 1000 }.
// Payment with just an amount property, e.g., { amount: 2000 }.

// The function should return an object that has the amount paid for each service and a total method that returns the payment total
// It should work with the following code:

function createPayment(services = {}) {
  let payment = {
    phone: services.phone || 0,
    internet: services.internet || 0,
    amount: services.amount,
  };

  payment.total = function() {
    return this.amount || (this.phone + this.internet);
  };

  return payment;
}

function paymentTotal(payments) {
  return payments.reduce((sum, payment)  => sum + payment.total(), 0);
}

let payments = [];
payments.push(createPayment());
payments.push(createPayment({
  internet: 6500,
}));

payments.push(createPayment({
  phone: 2000,
}));

payments.push(createPayment({
  phone: 1000,
  internet: 4500,
}));

payments.push(createPayment({
  amount: 10000,
}));

// console.log(paymentTotal(payments));      // => 24000


// Update the createInvoice function so that it can add payment(s) to invoices. Use the following code as a guideline:
let invoice = createInvoice({
  phone: 1200,
  internet: 4000,
});

let payment1 = createPayment({ amount: 2000 });
let payment2 = createPayment({
  phone: 1000,
  internet: 1200
});

let payment3 = createPayment({ phone: 1000 });

invoice.addPayment(payment1);
invoice.addPayments([payment2, payment3]);
console.log(invoice.amountDue());       // this should return 0


// A:
function createInvoice(services={}) {
  return {
    phone: services.phone || 3000,
    internet: services.internet || 5500,
    payments: [],

    total() {
      return this.phone + this.internet;
    },

    addPayment(payment) {
      this.payments.push(payment);
    },

    addPayments(paymentsArr) {
      paymentsArr.forEach(this.addPayment, this); // note syntax here
    },

    amountDue() {
      let paid = this.payments.reduce((sum, pment) => sum + pment.total(), 0);
      return this.total() - paid;
    }
  };
}
