import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts } from "../data/products.js";
import { loadCart } from "../data/cart.js";

// import "../data/cart-oop.js";
// import '../data/cart-class.js';
// import '../data/backend_sample.js';

Promise.all([
  new Promise((resolve) => {
    loadProducts(() => {
      resolve("value1"); // whatever we give as a parameter to resolve it can be accessed by using 'vlaue' keyword in .then
    });
  }),
  new Promise((resolve) => {
    loadCart(() => {
        resolve("value2");
      });
      
  })

]).then((values) => {
  renderOrderSummary();
  renderPaymentSummary();
  console.log(values);
});

/*

new Promise((resolve) => {
  loadProducts(() => {
    resolve("value1"); // whatever we give as a parameter to resolve it can be accessed by using 'vlaue' keyword in .then
  });
})
  .then((value) => {
    console.log(value);
    return new Promise((resolve) => {
      laodCart();
      resolve();
    });
  })
  .then(() => {
    renderOrderSummary();
    renderPaymentSummary();
  });

  */


/*

loadProducts(() => {
  renderOrderSummary();
  renderPaymentSummary();
});

*/
