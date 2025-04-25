
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts } from "../data/products.js"; // ADD this line
// import "../data/cart-oop.js";
// import '../data/cart-class.js';
// import '../data/backend_sample.js';

// renderOrderSummary();

// renderPaymentSummary();

loadProducts(() => {
  renderOrderSummary();
  renderPaymentSummary();
});
