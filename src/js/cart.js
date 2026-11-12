import { getLocalStorage, setLocalStorage, qs, renderListWithTemplate, loadHeaderFooter, updateCartCount } from "./utils.mjs";

loadHeaderFooter();

function renderCartContents() {
  // 1. Pull cart items from localStorage (default to an empty array if none exist)
  const cartItems = getLocalStorage("so-cart") || [];

  const productListEl = qs(".product-list");

  // 2. Render items using your utility function (or clear the list if empty)
  if (productListEl) {
    if (cartItems.length > 0) {
      renderListWithTemplate(cartItemTemplate, productListEl, cartItems, "afterbegin", true);
    } else {
      productListEl.innerHTML = "";
    }
  }

  // 3. Handle total and footer visibility
  const cartFooter = qs(".cart-footer");
  const cartTotal = qs(".cart-total");

  if (cartItems.length > 0) {
    const total = cartItems.reduce((sum, item) => sum + Number(item.FinalPrice || 0), 0);

    if (cartTotal) {
      cartTotal.textContent = `Total: $${total.toFixed(2)}`;
    }
    if (cartFooter) {
      cartFooter.classList.remove("hide");
    }
  } else {
    if (cartFooter) {
      cartFooter.classList.add("hide");
    }
  }

  // 4. Add event listener to the remove item from cart
  document.querySelectorAll(".remove-btn").forEach((button) => {
    button.addEventListener("click", (event) => {
      const productId = event.target.dataset.id;
      removeFromCart(productId);
    });
  });    
}

function cartItemTemplate(item) {
  const colorName = item.Colors && item.Colors[0] ? item.Colors[0].ColorName : "";

  return `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${item.Image}" alt="${item.Name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${colorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
    <button class="remove-btn" data-id="${item.Id}">Remove</button>
  </li>`;
}

function removeFromCart(productId) {
  const cartItems = getLocalStorage("so-cart") || [];

  const cart = cartItems.filter((item) => item.Id !== productId);

  setLocalStorage("so-cart", cart);

  renderCartContents();
  updateCartCount();
}

// Run on page load
renderCartContents();