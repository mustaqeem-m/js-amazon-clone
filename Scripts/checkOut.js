import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProductsFetch } from "../data/products.js";
import {
  loadCartFromStorage,
  cart,
  cartQuantityUpdater,
  quantityCalculator,
} from "../data/cart.js";
import { renderCheckoutHeader } from "./checkout/checkOutHeader.js";

async function loadPage() {
  try {
    console.log("🛒 load products");
    await loadProductsFetch();

    console.log("🛒 loading cart...");
    loadCartFromStorage(); // check this inside

    console.log("🛒 Cart after loading:", cart);

    if (Array.isArray(cart)) {
      const totalQuantity = quantityCalculator();
      renderCheckoutHeader(totalQuantity);
    } else {
      console.warn("⚠️ Cart data not loaded properly.");
    }

    renderOrderSummary();
    renderPaymentSummary();
  } catch (error) {
    console.error("🔥 loadPage error:", error.stack || error.message || error);
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
