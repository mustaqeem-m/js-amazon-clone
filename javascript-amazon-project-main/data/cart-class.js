class Cart {
  // cartItem = undefined;
  // localStorageKey = undefined;

  cartItem;
  localStorageKey;

  cart;

  constructor(localStorageKey) {
    // ! constructor have the set up code which ruen everytime when a new object is created using this class.
    this.localStorageKey = localStorageKey;

    this.loadFromStorage();
  }

  loadFromStorage() {
    this.cartItem = JSON.parse(localStorage.getItem(this.localStorageKey));

    if (this.cartItem === null) {
      this.cartItem = [
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

  saveToStorage() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItem));
  }

  addTocart(productId) {
    let matchingItem;

    this.cartItem.forEach((Item) => {
      if (productId === Item.productId) {
        matchingItem = Item;
      }
    });

    if (matchingItem) {
      matchingItem.quantity += 1;
    } else {
      this.cartItem.push({
        productId: productId,
        quantity: 1,
        deliveryOptionsId: "1", // Default delivery option for new items
      });
    }

    this.saveToStorage();
  }

  cartItemDeleter(productId) {
    const index = this.cartItem.findIndex(
      (cartItem) => cartItem.productId === productId
    );
    if (index !== -1) {
      this.cartItem.splice(index, 1); // in-place removal
    }
    this.saveToStorage();
  }

  deliveryOptionUpdater(productId, deliveryOptionsId) {
    let matchingItem;

    this.cartItem.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });

    if (matchingItem) {
      matchingItem.deliveryOptionsId = deliveryOptionsId;
    }

    this.saveToStorage();
  }

  updateQuantity(productId, newQuantity) {
    let matchingItem;

    this.cartItem.forEach((Item) => {
      if (productId === Item.productId) {
        matchingItem = Item;
      }
    });

    if (matchingItem) {
      matchingItem.quantity = newQuantity;
    }

    this.saveToStorage();
  }
}

const cart = new Cart("cart-oop");

const buisnessCart = new Cart("buisness-cart-oop");

// cart.addTocart("54e0eccd-8f36-462b-b68a-8182611d9add");

console.log(cart);
console.log(buisnessCart);
