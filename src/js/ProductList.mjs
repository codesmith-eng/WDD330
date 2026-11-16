import { renderListWithTemplate } from "./utils.mjs";



function productCardTemplate(product) {
  return `
    <li class="product-card">
      <a href="/product_pages/?product=${product.Id}">
        <img
          src="${product.Images.PrimaryMedium}"
          srcset="${product.Images.PrimarySmall} 80w,
                  ${product.Images.PrimaryMedium} 160w,
                  ${product.Images.PrimaryLarge} 320w,
                  ${product.Images.PrimaryExtraLarge} 600w"
          sizes="(max-width: 600px) 45vw,
                 (max-width: 1000px) 30vw,
                 200px"
          alt="${product.Name}"
        >
        <h3>${product.Brand.Name}</h3>
        <p>${product.NameWithoutBrand}</p>
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

  
async init() {
  // Get the products from the data source.
  this.products = await this.dataSource.getData(this.category);

  // Display the products in their original order.
  this.renderList(this.products);

  // Display the category title.
  document.querySelector(".title").textContent = this.category;

  // Find the sorting dropdown.
  const sortSelect = document.querySelector("#sort-products");

  // Sort the products whenever the selection changes.
  if (sortSelect) {
    sortSelect.addEventListener("change", () => {
      this.sortList(sortSelect.value);
    });
  }
}


sortList(sortType) {
  // Make a copy so we do not change the original product order.
  const sortedProducts = [...this.products];

  // Check if the user wants to sort names from A to Z.
  if (sortType === "name-asc") {
    sortedProducts.sort((a, b) =>
      `${a.Brand.Name} ${a.NameWithoutBrand}`.localeCompare(
        `${b.Brand.Name} ${b.NameWithoutBrand}`
      )
    );

  // Check if the user wants to sort names from Z to A.
  } else if (sortType === "name-desc") {
    sortedProducts.sort((a, b) =>
      `${b.Brand.Name} ${b.NameWithoutBrand}`.localeCompare(
        `${a.Brand.Name} ${a.NameWithoutBrand}`
      )
    );

  // Check if the user wants the lowest price first.
  } else if (sortType === "price-asc") {
    sortedProducts.sort(
      (a, b) => Number(a.FinalPrice) - Number(b.FinalPrice)
    );

  // Check if the user wants the highest price first.
  } else if (sortType === "price-desc") {
    sortedProducts.sort(
      (a, b) => Number(b.FinalPrice) - Number(a.FinalPrice)
    );
  }

  // Display the sorted products.
  this.renderList(sortedProducts);
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
};