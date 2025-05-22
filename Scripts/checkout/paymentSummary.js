import { cart } from "../../data/cart.js";
import { getProductById } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { currencyFormatter } from "../utils/money.js";
import { addOrder } from "../../data/orders.js";
export function renderPaymentSummary() {
  let productPriceCents = 0;
  let shippingPriceCents = 0;
  cart.forEach((cartItem) => {
    const product = getProductById(cartItem.productId);
    productPriceCents += product.priceCents * cartItem.quantity;

    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionsId);
    shippingPriceCents += deliveryOption.priceCents;
  });
  const totalBeforeTax = productPriceCents + shippingPriceCents;
  const estimateTax = totalBeforeTax * 0.1;
  const totalPriceCents = totalBeforeTax + estimateTax;

  const paymentSummaryHTML = `
        <div class="payment-summary">
          <div class="payment-summary-title js-payment-summary-title">Order Summary</div>

          <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">$${currencyFormatter(
              productPriceCents
            )}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${currencyFormatter(
              shippingPriceCents
            )}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${currencyFormatter(
              totalBeforeTax
            )}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${currencyFormatter(
              estimateTax
            )}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${currencyFormatter(
              totalPriceCents
            )}</div>
          </div>

          <button class="place-order-button button-primary
          js-place-order">
            Place your order
          </button>
    `;

  document.querySelector(".payment-summary").innerHTML = paymentSummaryHTML;

  document
    .querySelector(".js-place-order")
    .addEventListener("click", async () => {
      try {
        const response = await fetch("https://supersimplebackend.dev/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cart: cart,
          }),
        });

        const order = await response.json();
        addOrder(order);
      } catch (error) {
        console.error("Error Detected" + error);
      }

      window.location.href = 'orders.html' // window.location change the checkout.html to order.html when we click place your order
    });

  // renderPaymentSummary();
}
