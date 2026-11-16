import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  return `
    <li class="product-card">
      <a href="/product_pages/?product=${product.Id}">
        <img src="${product.Images.PrimaryMedium}" alt="${product.Name}">
        <h2>${product.Brand.Name}</h2>
        <h3>${product.NameWithoutBrand}</h3>
        <p class="product-card__price">$${product.FinalPrice}</p>
      </a>
    </li>
  `;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init(searchTerm = "") {
    let list = await this.dataSource.getData(this.category);

    if (searchTerm) {
      list = list.filter(
        (product) =>
          product.Name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.NameWithoutBrand?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    this.renderList(list);

    const titleElement = document.querySelector(".title");
    if (titleElement) {
      titleElement.textContent = this.category
        .replace("-", " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());
    }
  }

  renderList(list) {
    renderListWithTemplate(
      productCardTemplate,
      this.listElement,
      list,
      "afterbegin",
      true
    );
  }
}