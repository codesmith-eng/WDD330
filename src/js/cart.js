import { loadHeaderFooter, getLocalStorage } from "./utils.mjs";
//import ShoppingCart from "./ShoppingCart.mjs";

loadHeaderFooter();

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  console.log(cartItems);
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  addRemoveListeners();
  addQuantityListeners();
  calculateCartTotal();
}

function cartItemTemplate(item) {
  return `
<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Images.PrimaryMedium}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <div class="cart-card__quantity">
  <label for="qty-${item.Id}">Qty:</label>
  <input
    type="number"
    id="qty-${item.Id}"
    class="quantity-input"
    data-id="${item.Id}"
    min="1"
    value="${item.quantity || 1}">
  </div>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  <button class="remove-btn" data-id="${item.Id}">
    Remove
  </button>
</li>`;
}

function addRemoveListeners() {
  const buttons = document.querySelectorAll(".remove-btn");

  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const id = e.target.dataset.id;
      removeItem(id);
    });
  });
}

function removeItem(id) {
  let cartItems = getLocalStorage("so-cart") || [];

  cartItems = cartItems.filter((item) => item.Id !== id);

  localStorage.setItem("so-cart", JSON.stringify(cartItems));

  renderCartContents();
}

renderCartContents();

function addQuantityListeners() {
  const inputs = document.querySelectorAll(".quantity-input");

  inputs.forEach((input) => {
    input.addEventListener("change", (e) => {
      const id = e.target.dataset.id;
      const quantity = parseInt(e.target.value);

      updateQuantity(id, quantity);
    });
  });
}

function updateQuantity(id, quantity) {
  const cartItems = getLocalStorage("so-cart") || [];

  const item = cartItems.find((product) => product.Id === id);

  if (item) {
    item.quantity = quantity > 0 ? quantity : 1;
  }

  localStorage.setItem("so-cart", JSON.stringify(cartItems));

  renderCartContents();
}

function calculateCartTotal() {
  const cartItems = getLocalStorage("so-cart") || [];

  const total = cartItems.reduce(
    (sum, item) =>
      sum + Number(item.FinalPrice) * (item.quantity || 1),
    0
  );

  const footer = document.querySelector(".list-footer");
  const totalElement = document.querySelector(".list-total");

  if (cartItems.length > 0) {
    footer.classList.remove("hide");
    totalElement.textContent = `Total: $${total.toFixed(2)}`;
  } else {
    footer.classList.add("hide");
  }
}