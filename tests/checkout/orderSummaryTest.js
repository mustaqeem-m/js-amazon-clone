import { loadFromStorage, cart } from "../../data/cart.js";
import { renderOrderSummary } from "../../Scripts/checkout/orderSummary.js";
import { loadProductsFetch } from "../../data/products.js";

describe("Order Summary Test Suite", () => {
  const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
  const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";

  // beforeAll((done) => {
  //   loadProductsFetch(() => {
  //     done();
  //   }).catch(done);
  // },10000);

  beforeAll(async () => {
    await loadProductsFetch();
  });

  beforeEach(() => {
    spyOn(localStorage, "setItem");
    document.querySelector(".js-test-container").innerHTML = `
      <div class="js-cartItem-summary"></div>
      <div class="payment-summary"></div>
    `;

    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: productId1,
          quantity: 2,
          deliveryOptionsId: "1",
        },
        {
          productId: productId2,
          quantity: 1,
          deliveryOptionsId: "2",
        },
      ]);
    });

    loadFromStorage();
  });

  it("displays the cart", (done) => {
    renderOrderSummary();

    expect(document.querySelectorAll(".js-cart-item-container").length).toEqual(
      2
    );
    expect(
      document.querySelector(`.js-product-quantity-${productId1}`).innerText
    ).toContain("Quantity: 2");
    expect(
      document.querySelector(`.js-product-quantity-${productId2}`).innerText
    ).toContain("Quantity: 1");

    setTimeout(() => {
      const items = document.querySelectorAll(".cart-item-container");
      expect(items.length).toBe(2);
      done();
    }, 100);
  });

  it("test-delete-link", () => {
    renderOrderSummary();

    document
      .querySelector(`.js-delete-link[data-product-id="${productId1}"]`)
      .click();

    const remainingItems = document.querySelectorAll(".cart-item-container");
    expect(remainingItems.length).toEqual(1);

    expect(
      document.querySelector(`.js-cart-item-container-${productId1}`)
    ).toBeNull();
    expect(
      document.querySelector(`.js-cart-item-container-${productId2}`)
    ).not.toBeNull();

    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(productId2);
  });
});
