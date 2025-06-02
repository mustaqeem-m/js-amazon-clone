export let cart;

//! cartloader from storage
export function loadCartFromStorage() {
  cart = JSON.parse(localStorage.getItem("cart"));

  if (!Array.isArray(cart)) {
    cart = [
      {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2,
        deliveryOptionsId: "1",
      },
      {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1,
        deliveryOptionsId: "2",
      },
    ];
  }
}

//! storage saver 
export function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}


//! item adder to cart
export function addToCart(productId, quantity = 1) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += quantity;
  } else {
    cart.push({
      productId,
      quantity,
      deliveryOptionsId: "1",
    });
  }

  saveToStorage();
}

//! cart item deleter
export function cartItemDeleter(productId) {
  const index = cart.findIndex((cartItem) => cartItem.productId === productId);
  if (index !== -1) {
    cart.splice(index, 1); // in-place removal
  }
  saveToStorage();
}

//! delivery option updater
export function deliveryOptionUpdater(productId, deliveryOptionsId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    matchingItem.deliveryOptionsId = deliveryOptionsId;
  }

  saveToStorage();
}


//! cartQuantityUpdater
export function cartQuantityUpdater() {
  if (!Array.isArray(cart)) {
    console.warn("cart is not loaded yet!");
    return;
  }
  let cartQuantity = quantityCalculator();
  
  if (cartQuantity === 0) {
    document.querySelector(".js-cart-quantity").innerText = "";
  } else {
    document.querySelector(".js-cart-quantity").innerText = cartQuantity;
  }

  saveToStorage();
}

export function updateQuantity(productId, newQuantity) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    matchingItem.quantity = newQuantity;
  }
  if (Array.isArray(cart)) {
    let totalQuantity = quantityCalculator();

    document.querySelector(".js-itemNo").innerHTML = `(${totalQuantity} items)`;
  } else {
    console.warn("Cart data not loaded properly.");
  }

  saveToStorage();
}

//! cart quantity calculator
export function quantityCalculator() {
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  return cartQuantity;
}

// for practise pusrpose we loading cart its response is just "load-cart"
//! loading cart from backend
export function loadCart(callback) {
  const xhr = new XMLHttpRequest();
  xhr.addEventListener("load", () => {
    console.log(xhr.response);

    if (typeof callback === "function") {
      callback(); // ✅ Safe call
    }
  });
  xhr.open("GET", "https://supersimplebackend.dev/cart");
  xhr.send();
}

