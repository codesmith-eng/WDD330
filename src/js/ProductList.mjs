import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  const finalPrice = Number(product.FinalPrice);
  const retailPrice = Number(product.SuggestedRetailPrice);

  // Check whether the product has a discount
  const isDiscounted =
    retailPrice > 0 && finalPrice < retailPrice;

  // Calculate discount percentage
  const discountPercentage = isDiscounted
    ? Math.round(((retailPrice - finalPrice) / retailPrice) * 100)
    : 0;

  return `
    <li class="product-card">
      <a href="/product_pages/?product=${product.Id}">
        <img
          src="${product.Images.PrimaryMedium}"
          srcset="${product.Images.PrimarySmall} 80w,
                  ${product.Images.PrimaryMedium} 160w,
                  ${product.Images.PrimaryLarge} 320w,
                  ${product.Images.PrimaryExtraLarge} 600w"
          sizes="212px"
          alt="${product.Name}"
          loading="lazy">

        <h3>${product.Brand.Name}</h3>

        <p>${product.NameWithoutBrand}</p>

        ${
          isDiscounted
            ? `
              <span class="discount-flag">
                ${discountPercentage}% OFF
              </span>

              <p class="original-price">
                $${retailPrice.toFixed(2)}
              </p>
            `
            : ""
        }

        <p class="product-card__price final-price">
          $${finalPrice.toFixed(2)}
        </p>
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
    const list = await this.dataSource.getData(this.category);

    this.renderList(list);

    document.querySelector(".title").textContent = this.category;
  }

  renderList(list) {
    renderListWithTemplate(
      productCardTemplate,
      this.listElement,
      list
    );
  }
}