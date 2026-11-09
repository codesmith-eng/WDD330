import { getLocalStorage, setLocalStorage, qs, renderListWithTemplate } from "./utils.mjs";

function renderCartContents() {
  // 1. Pull cart items from localStorage (or seed them if empty for testing)
  let cartItems = getLocalStorage("so-cart");

  // If localStorage is completely empty, automatically seed the two tent products
  if (!Array.isArray(cartItems) || cartItems.length === 0) {
    cartItems = [
      {
        Id: "880RR",
        Name: "Marmot Ajax Tent - 3-Person, 3-Season",
        Image: "../public/images/tents/marmot-ajax-tent-3-person-3-season-in-pale-pumpkin-terracotta~p~880rr_01~320.jpg",
        FinalPrice: 199.99,
        Colors: [{ ColorName: "Pale Pumpkin/Terracotta" }]
      },
      {
        Id: "985RF",
        Name: "The North Face Talus Tent - 4-Person, 3-Season",
        Image: "../public/images/tents/the-north-face-talus-tent-4-person-3-season-in-golden-oak-saffron-yellow~p~985rf_01~320.jpg",
        FinalPrice: 199.99,
        Colors: [{ ColorName: "Golden Oak/Saffron Yellow" }]
      }
    ];
    setLocalStorage("so-cart", cartItems);
  }

  const productListEl = qs(".product-list");

  // 2. Render items using your utility function
  if (productListEl && cartItems.length > 0) {
    renderListWithTemplate(cartItemTemplate, productListEl, cartItems, "afterbegin", true);
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
}
// Run on page load
renderCartContents();
