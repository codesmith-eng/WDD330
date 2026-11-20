import { getLocalStorage, setLocalStorage, updateCartCount } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails();
    document
      .getElementById("add-to-cart")
      .addEventListener("click", this.addProductToCart.bind(this));
  }

  addProductToCart() {
    const cartItems = getLocalStorage("so-cart") || [];
    cartItems.push(this.product);
    setLocalStorage("so-cart", cartItems);
    updateCartCount();
  }

  renderProductDetails() {
    productDetailsTemplate(this.product);
  }
}

function formatEuro(amount) {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(Number(amount) * 0.85);
}

function productDetailsTemplate(product) {
  document.querySelector("h2").textContent =
    product.Category.charAt(0).toUpperCase() + product.Category.slice(1);
  document.querySelector("#p-brand").textContent = product.Brand.Name;
  document.querySelector("#p-name").textContent = product.NameWithoutBrand;

  const productImage = document.querySelector("#p-image");
  productImage.src = product.Images.PrimaryExtraLarge;
  productImage.alt = product.NameWithoutBrand;

  const finalPrice = Number(product.FinalPrice);
  const retailPrice = Number(product.SuggestedRetailPrice);
  const priceElement = document.querySelector("#p-price");

  if (retailPrice > finalPrice) {
    const discountAmount = retailPrice - finalPrice;
    const discountPercent = Math.round((discountAmount / retailPrice) * 100);

    priceElement.innerHTML = `
      <span class="discount-flag">Save ${formatEuro(discountAmount)} (${discountPercent}% OFF)</span>
      <span class="original-price">${formatEuro(retailPrice)}</span>
      <span class="final-price">${formatEuro(finalPrice)}</span>
    `;
  } else {
    priceElement.textContent = formatEuro(finalPrice);
  }

  document.querySelector("#p-color").textContent = product.Colors[0].ColorName;
  document.querySelector("#p-description").innerHTML =
    product.DescriptionHtmlSimple;

  document.querySelector("#add-to-cart").dataset.id = product.Id;
}