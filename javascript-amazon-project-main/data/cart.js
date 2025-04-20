export let cart = JSON.parse(localStorage.getItem("cart"));

if (cart === null) {
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

function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(productId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += 1;
  } else {
    cart.push({
      productId: productId,
      quantity: 1,
      deliveryOptionsId: "1", // Default delivery option for new items
    });
  }
  saveToStorage();
}

export function cartItemDeleter(productId) {
  const cart_updated = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      cart_updated.push(cartItem);
    }
  });
  cart = cart_updated;
  saveToStorage();
}

export function deliveryOptionUpdater(productId, deliveryOptionsId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });
  matchingItem.deliveryOptionsId = deliveryOptionsId;

  saveToStorage();
}
