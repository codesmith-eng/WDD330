import {
  getLocalStorage,
  setImageFallback,
  setLocalStorage,
} from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.dataSource = dataSource;
    this.product = {};
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    if (!this.product) {
      throw new Error(`Product not found: ${this.productId}`);
    }

    this.renderProductDetails();

    const addToCartButton = document.getElementById("addToCart");
    if (!addToCartButton) {
      throw new Error("Add to Cart button was not rendered");
    }
    addToCartButton.addEventListener("click", this.addProductToCart.bind(this));
  }

  addProductToCart() {
    const storedCart = getLocalStorage("so-cart");
    const cartItems = Array.isArray(storedCart)
      ? storedCart
      : storedCart
        ? [storedCart]
        : [];

    cartItems.push(this.product);
    setLocalStorage("so-cart", cartItems);
  }

  renderProductDetails() {
    const mainElement = document.querySelector("main");
    if (!mainElement) {
      throw new Error("Could not find the main element for product details");
    }

    mainElement.insertAdjacentHTML(
      "afterbegin",
      productDetailsTemplate(this.product),
    );
    setImageFallback(mainElement);
  }
}

function productDetailsTemplate(product) {
  return `<section class="product-detail">
      <h3>${product.Brand.Name}</h3>
      <h2 class="divider">${product.NameWithoutBrand}</h2>
      <img class="divider" src="${product.Image}" alt="${product.Name}" />
      <p class="product-card__price">$${product.FinalPrice}</p>
      <p class="product__color">${product.Colors[0].ColorName}</p>
      <p class="product__description">${product.DescriptionHtmlSimple}</p>
      <div class="product-detail__add">
        <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
      </div>
    </section>`;
}
