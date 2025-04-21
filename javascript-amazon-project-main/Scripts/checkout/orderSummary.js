import { cart, cartItemDeleter, deliveryOptionUpdater } from "../../data/cart.js";
import { products } from "../../data/products.js";
import { currencyFormatter } from "../utils/money.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";

export function RerunOrRenderOrderSummary() {
  let cartHTML = ``;

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    let matchingProduct;

    products.forEach((product) => {
      if (productId === product.id) {
        matchingProduct = product;
      }
    });
    const deliveryOptionsId = cartItem.deliveryOptionsId;

    let deliveryOption;

    deliveryOptions.forEach((Option) => {
      if (Option.id === deliveryOptionsId) {
        deliveryOption = Option;
      }
    });

    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
    const dateString = deliveryDate.format("dddd, MMMM D");

    cartHTML += `<div class="cart-item-container 
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
                  <div class="product-price">$${currencyFormatter(
                    matchingProduct.priceCents
                  )}</div>
                  <div class="product-quantity">
                    <span> Quantity: <span class="quantity-label">${
                      cartItem.quantity
                    }</span> </span>
                    <span class="update-quantity-link link-primary">
                      Update
                    </span>
                    <span class="delete-quantity-link link-primary js-delete-link"
                    data-product-id = "${matchingProduct.id}">
                      Delete
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
    });
  });

  document.querySelectorAll(".js-delivery-option").forEach((element) => {
    element.addEventListener("click", () => {
      const productId = element.dataset.productId;
      const deliveryOptionsId = element.dataset.deliveryOptionsId;

      deliveryOptionUpdater(productId, deliveryOptionsId);

      RerunOrRenderOrderSummary();
      // Optional: re-render the cart or reload to reflect the change
      // location.reload(); // use this if re-rendering manually is too messy
    });
  });
}

