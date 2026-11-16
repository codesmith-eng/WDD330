import { renderListWithTemplate } from "./utils.mjs";


function productCardTemplate(product) {
  return `
    <li class="product-card">
      <a href="/product_pages/?product=${product.Id}">
        <img src="${product.Image}" alt="${product.Name}">
        <h2>${product.Brand.Name}</h2>
        <h3>${product.Name}</h3>
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
    console.log("init called from:");
    console.trace();
    let list = await this.dataSource.getData();

    console.log("Search term:", searchTerm);
    console.log("First product:", list[0]);

    if (searchTerm) {
      list = list.filter(
        (product) =>
          product.Name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.NameWithoutBrand?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    this.renderList(list);
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