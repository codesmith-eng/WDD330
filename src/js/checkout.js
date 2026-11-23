import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./checkoutProcess.mjs";

const checkout = new CheckoutProcess("so-cart", ".order__summary");
checkout.init();


document.querySelector("#zip").addEventListener("blur", () => {
  checkout.calculateOrderTotal();
});

loadHeaderFooter();

const order = new CheckoutProcess("so-cart", ".checkout-summary");
order.init();

// Add event listeners to fire calculateOrderTotal when the user changes the zip code
document
  .querySelector("#zip")
  .addEventListener("blur", order.calculateOrderTotal.bind(order));

// listening for click on the button
/*document.querySelector("#checkoutSubmit").addEventListener("click", (e) => {
  e.preventDefault();

  order.checkout();
});*/

//form validation
document
.querySelector("#checkoutSubmit")
.addEventListener("click", (e) => {
  e.preventDefault();

  const myForm = document.forms["checkout"];

  const isValid = myForm.checkValidity();

  myForm.reportValidity();

  if (isValid) {
    order.checkout();
  }
});