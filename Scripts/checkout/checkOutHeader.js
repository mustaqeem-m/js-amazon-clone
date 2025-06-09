export const renderCheckoutHeader = (totalQuantity) => {
  console.trace("📍 Called renderCheckoutHeader with:", totalQuantity);

  const checkoutheader = document.querySelector(".js-checkout-hdr");
  if (!checkoutheader) return;

  checkoutheader.innerHTML = `
    Checkout 
    <a class="return-to-home-link" href="amazon.html">
      <div class="js-itemNo">(${totalQuantity} items)</div>
    </a>
  `;
};
