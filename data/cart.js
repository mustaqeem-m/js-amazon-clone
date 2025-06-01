export let cart;

// loadFromStorage();

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

export function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

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

export function cartItemDeleter(productId) {
  const index = cart.findIndex((cartItem) => cartItem.productId === productId);
  if (index !== -1) {
    cart.splice(index, 1); // in-place removal
  }
  saveToStorage();
}

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

export function cartQuantityUpdater() {
  if (!Array.isArray(cart)) {
    console.warn("cart is not loaded yet!");
    return;
  }

  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  document.querySelector(".js-cart-quantity").innerText = cartQuantity;
  saveToStorage();
};

// for practise pusrpose we loading cart its response is just "load-cart"
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
