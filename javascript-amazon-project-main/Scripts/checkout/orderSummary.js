import {
  cart,
  cartItemDeleter,
  deliveryOptionUpdater,
  updateQuantity,
} from "../../data/cart.js";
import { products, getProductById } from "../../data/products.js";
import { currencyFormatter } from "../utils/money.js";
import {
  deliveryOptions,
  getDeliveryOption,
} from "../../data/deliveryOptions.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { renderPaymentSummary } from "./paymentSummary.js"; // named Exports from paymentSummary.jss'; // named Exports from paymentSummary.js

export function renderOrderSummary() {
  let cartHTML = ``;

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    let matchingProduct = getProductById(productId);

    const deliveryOptionsId = cartItem.deliveryOptionsId;

    const deliveryOption = getDeliveryOption(deliveryOptionsId);

    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
    const dateString = deliveryDate.format("dddd, MMMM D");

    cartHTML += `<div class="cart-item-container 
          js-cart-item-container 
          js-cart-item-container-${matchingProduct.id} ">
              <div class="delivery-date">Delivery date:${dateString}</div>

              <div class="cart-item-details-grid">
                <img
                  class="product-image"
                  src="${matchingProduct.image}"
                />

                <div class="cart-item-details">
                  <div class="product-name">
                    ${matchingProduct.name}
                  </div>
                  <div class="product-price">${matchingProduct.getPrice()}
                  </div>
                  <div class="product-quantity 
                  js-product-quantity-${matchingProduct.id}
                  ">
                    <span> Quantity: <span class="quantity-label">${
                      cartItem.quantity
                    }</span> </span>
                    <span class="update-quantity-link link-primary js-update-link"
                    data-product-id="${matchingProduct.id}">
                      Update
                    </span>
                    <input class="quantity-input js-quantity-input-${
                      matchingProduct.id
                    }">
                  <span class="save-quantity-link link-primary js-save-link
                  js-delete-link-${matchingProduct.id}" 
                    data-product-id="${matchingProduct.id}">
                    Save
                  </span>
                    <span class="delete-quantity-link link-primary js-delete-link"
                    data-product-id = "${matchingProduct.id}"
                    >Delete
                    </span>
                  </div>
                </div>

                <div class="delivery-options">
                  <div class="delivery-options-title">
                    Choose a delivery option:
                  </div>
                ${deliveryOptionsHTML(matchingProduct, cartItem)}
                </div>
              </div>
            </div>
      
      `;
  });

  function deliveryOptionsHTML(matchingProduct, cartItem) {
    let html = "";
    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
      const dateString = deliveryDate.format("dddd, MMMM D");

      const priceString =
        deliveryOption.priceCents === 0
          ? "FREE"
          : `$${currencyFormatter(deliveryOption.priceCents)}`;

      const isChecked = deliveryOption.id === cartItem.deliveryOptionsId;

      html += `
    <div 
      class="delivery-option js-delivery-option"
      data-product-id="${matchingProduct.id}"
      data-delivery-options-id="${deliveryOption.id}">
      
      <input
        type="radio"
        ${isChecked ? "checked" : ""}
        class="delivery-option-input"
        name="delivery-option-${matchingProduct.id}"
      />
      
      <div>
        <div class="delivery-option-date">${dateString}</div>
        <div class="delivery-option-price">${priceString} - Shipping</div>
      </div>
    </div>
  `;
    });
    return html;
  }

  document.querySelector(".js-cartItem-summary").innerHTML = cartHTML;

  document.querySelectorAll(".delete-quantity-link").forEach((deleteLink) => {
    deleteLink.addEventListener("click", () => {
      const productId = deleteLink.dataset.productId;
      cartItemDeleter(productId);

      document.querySelector(`.js-cart-item-container-${productId}`).remove();
      renderPaymentSummary(); // named Exports from paymentSummary.jss'; // named Exports from paymentSummary.js
    });
  });

  document.querySelectorAll(".js-delivery-option").forEach((element) => {
    element.addEventListener("click", () => {
      const productId = element.dataset.productId;
      const deliveryOptionsId = element.dataset.deliveryOptionsId;

      deliveryOptionUpdater(productId, deliveryOptionsId);

      renderOrderSummary();
      renderPaymentSummary();
      // Optional: re-render the cart or reload to reflect the change
      // location.reload(); // use this if re-rendering manually is too messy
    });
  });

  document.querySelectorAll(".js-update-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;

      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      container.classList.add("is-editing-quantity");
    });
  });

  document.querySelectorAll(".js-save-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;

      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      container.classList.remove("is-editing-quantity");

      const quantityInput = document.querySelector(
        `.js-quantity-input-${productId}`
      );
      const newQuantity = Number(quantityInput.value);
      updateQuantity(productId, newQuantity);

      // renderCheckoutHeader();
      renderOrderSummary();
      renderPaymentSummary();

      // We can delete the code below (from the original solution)
      // because instead of using the DOM to update the page directly
      // we can use MVC and re-render everything. This will make sure
      // the page always matches the data.

      // const quantityLabel = document.querySelector(
      //   `.js-quantity-label-${productId}`
      // );
      // quantityLabel.innerHTML = newQuantity;

      // updateCartQuantity();
    });
  });
}
