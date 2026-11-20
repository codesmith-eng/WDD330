import { getLocalStorage, renderListWithTemplate } from "./utils.mjs";

function cartItemTemplate(item) {
  const imageSrc = item.Images?.PrimaryMedium || item.Image;
  const colorName = item.Colors?.[0]?.ColorName || "Standard";
  const quantity = item.quantity || 1;

  return `<li class="cart-card divider">
    <a href="/product_pages/index.html?product=${item.Id}" class="cart-card__image">
      <img src="${imageSrc}" alt="${item.Name}" />
    </a>
    <a href="/product_pages/index.html?product=${item.Id}">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${colorName}</p>
    <p class="cart-card__quantity">qty: ${quantity}</p>
    <p class="cart-card__price">$${(item.FinalPrice * quantity).toFixed(2)}</p>
  </li>`;
}

export default class ShoppingCart {
  constructor(key, parentSelector) {
    this.key = key;
    this.parentSelector = parentSelector;
    this.total = 0;
  }

  init() {
    const list = getLocalStorage(this.key) || [];
    this.calculateListTotal(list);
    this.renderCartContents(list);
  }

  calculateListTotal(list) {
    this.total = list.reduce(
      (sum, item) => sum + Number(item.FinalPrice) * (item.quantity || 1),
      0
    );
  }

  renderCartContents(list) {
    const parentElement = document.querySelector(this.parentSelector);
    if (!parentElement) return;

    if (list.length === 0) {
      parentElement.innerHTML = "<p>Your cart is currently empty.</p>";
      this.displayTotal(false);
      return;
    }

    renderListWithTemplate(cartItemTemplate, parentElement, list, "afterbegin", true);
    this.displayTotal(true);
  }

  displayTotal(show) {
    const footerElement = document.querySelector(".list-footer");
    const totalElement = document.querySelector(".list-total");

    if (!footerElement || !totalElement) return;

    if (show) {
      footerElement.classList.remove("hide");
      totalElement.textContent = `$${this.total.toFixed(2)}`;
    } else {
      footerElement.classList.add("hide");
    }
  }
}