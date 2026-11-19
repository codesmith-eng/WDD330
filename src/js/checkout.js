import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./checkoutProcess.mjs";

const checkout = new CheckoutProcess("so-cart", ".order__summary");
checkout.init();


document.querySelector("#zip").addEventListener("blur", () => {
  checkout.calculateOrderTotal();
});

loadHeaderFooter();
