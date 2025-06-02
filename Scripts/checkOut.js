import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProductsFetch } from "../data/products.js";
import {
  loadCartFromStorage,
  cart,
  cartQuantityUpdater,
  quantityCalculator,
} from "../data/cart.js";

async function loadPage() {
  try {
    console.log("load products");
    await loadProductsFetch();

    console.log("next-step");
    loadCartFromStorage(); // ✅ <-- This actually sets `cart`

    if (Array.isArray(cart)) {
      let totalQuantity = quantityCalculator();

      document.querySelector(
        ".js-itemNo"
      ).innerHTML = `(${totalQuantity} items)`;
    } else {
      console.warn("Cart data not loaded properly.");
    }

    renderOrderSummary();
    renderPaymentSummary();
  } catch (error) {
    console.log("error: " + error);
  }
}

loadPage();

/*

Promise.all([
  loadProductsFetch(),
  new Promise((resolve) => {
    loadCart(() => {
      resolve("value2");
    });
  }),
]).then((values) => {
  renderOrderSummary();
  renderPaymentSummary();
  console.log(values);
});

*/

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
