import { cart, addToCart } from "../data/cart.js";
import { products, loadProductsFetch } from "../data/products.js";
import { currencyFormatter } from "./utils/money.js";
import { saveToStorage } from "../data/cart.js"; // named Exports from utils/money.js
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js"; //default export from dayjs library
import { cartQuantityUpdater } from "../data/cart.js";
import { loadCartFromStorage } from "../data/cart.js";
// loadProducts(renderProductsGrid);
loadProductsFetch().then(() => {
  loadCartFromStorage(); 
  renderProductsGrid();
});


function renderProductsGrid() {
  const addToCart_btn = document.querySelector(".add-to-cart-button");
  let productsHTML = ``;

  const today = dayjs(); // Display current date and time using dayjs library

  const deliverydate = today.add(7, "days").format("dddd, MMMM D");

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
              src="${product.getStarsUrl()}"
            />
            <div class="product-rating-count link-primary">${
              product.rating.count
            }</div>
          </div>    

          <div class="product-price">
            ${product.getPrice()}
            </div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${product.id}">
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

          ${product.extraInfoHTML()}
          
          <div class="product-spacer"></div>

          <div class="product-action"s>
           <div class="added-to-cart-${product.id} js-added" data-product-id=${
      product.id
    } style="display: none;">
            <img class='check-img' src="images/icons/checkmark.png" />
            Added
          </div>

          <button class="add-to-cart-button button-primary"
          data-product-id="${product.id}">Add to Cart</button>
        </div>
        </div>`;
  });

  document.querySelector(".js-products-grid").innerHTML = productsHTML;

  function cartItemDeleter(productId) {
    const cart_updated = [];

    cart.forEach((cartItem) => {
      if (cartItem.productId !== productId) {
        cart_updated.push(cartItem);
      }
    });
  }
};

const addedTimeouts = {};
document.querySelector(".js-products-grid").addEventListener("click", (e) => {
  if (e.target.classList.contains("add-to-cart-button")) {
    const { productId } = e.target.dataset;

    const quantitySelector = document.querySelector(
      `.js-quantity-selector-${productId}`
    );
    const selectedQuantity = Number(quantitySelector.value);

    addToCart(productId, selectedQuantity);
    cartQuantityUpdater();

    const addedEl = document.querySelector(
      `.js-added[data-product-id="${productId}"]`
    );
    addedEl.style.display = "block";
    addedEl.classList.add("visible");

    if (addedTimeouts[productId]) {
      clearTimeout(addedTimeouts[productId]);
    }

    addedTimeouts[productId] = setTimeout(() => {
      addedEl.classList.remove("visible");
      addedEl.style.display = "none";
    }, 2000);
  }
});
