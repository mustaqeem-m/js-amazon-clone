import { cart,addToCart } from "../data/cart.js";
import { products } from "../data/products.js";
import { currencyFormatter } from "./utils/money.js";
import { saveToStorage } from '../data/cart.js'// named Exports from utils/money.js
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js"; //default export from dayjs library
let productsHTML = ``;

const today = dayjs(); // Display current date and time using dayjs library


const deliverydate = today.add(7,'days').format('dddd, MMMM D');

cartQuantityUpdater();
products.forEach((product) => {
  productsHTML += `<div class="product-container">
          <div class="product-image-container">
            <img
              class="product-image"
              src=${product.image}
            />
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img
              class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png"
            />
            <div class="product-rating-count link-primary">${
              product.rating.count
            }</div>
          </div>    

          <div class="product-price">
            $${currencyFormatter(product.priceCents)}
            </div>

          <div class="product-quantity-container">
            <select>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png" />
            Added
          </div>

          <button class="add-to-cart-button button-primary"
          data-product-id="${product.id}">Add to Cart</button>
        </div>`;
});

document.querySelector(".js-products-grid").innerHTML = productsHTML;



function cartQuantityUpdater() {
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  document.querySelector(".js-cart-quantity").innerText = cartQuantity;
  saveToStorage();
}




document.querySelectorAll(".add-to-cart-button").forEach((button) => {
  button.addEventListener("click", () => {
    const productId = button.dataset.productId;
    addToCart(productId);
    cartQuantityUpdater();
  });
});


export function cartItemDeleter(productId) {
  const cart_updated = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      cart_updated.push(cartItem);
    }
  });
};