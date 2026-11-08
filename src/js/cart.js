import {
  getLocalStorage,
  setImageFallback,
  setLocalStorage,
} from "./utils.mjs";

function getCartItems() {
  const storedCart = getLocalStorage("so-cart");
  if (Array.isArray(storedCart)) {
    return storedCart;
  }
  return storedCart ? [storedCart] : [];
}

function renderCartContents(listElement) {
  const cartItems = getCartItems();
  if (cartItems.length === 0) {
    listElement.innerHTML = "<li class=\"cart-empty\">Your cart is empty.</li>";
    return;
  }

  const productsById = new Map();
  for (const item of cartItems) {
    if (!item || !item.Id) {
      throw new Error("The cart contains an invalid product");
    }

    const current = productsById.get(item.Id);
    productsById.set(item.Id, {
      product: item,
      quantity: (current?.quantity ?? 0) + 1,
    });
  }

  const htmlItems = [...productsById.values()].map(({ product, quantity }) =>
    cartItemTemplate(product, quantity),
  );
  listElement.innerHTML = htmlItems.join("");
  setImageFallback(listElement);
}

renderCartContents();
function cartItemTemplate(item, quantity) {
  return `<li class="cart-card divider">
    <a href="/product_pages/?product=${item.Id}" class="cart-card__image">
      <img src="${item.Image}" alt="${item.Name}" />
    </a>
    <a href="/product_pages/?product=${item.Id}">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: ${quantity}</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
    <button class="remove-btn" type="button" data-id="${item.Id}" aria-label="Remove ${item.Name} from cart">
      Remove
    </button>
  </li>`;
}

const productList = document.querySelector(".product-list");
if (!productList) {
  throw new Error("Could not find the cart product list");
}

productList.addEventListener("click", (event) => {
  const removeButton = event.target.closest(".remove-btn");
  if (!removeButton || !productList.contains(removeButton)) {
    return;
  }

  const remainingItems = getCartItems().filter(
    (item) => item.Id !== removeButton.dataset.id,
  );
  setLocalStorage("so-cart", remainingItems);
  renderCartContents(productList);
});

renderCartContents(productList);
