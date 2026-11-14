import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter } from "./utils.mjs";

await loadHeaderFooter();

const dataSource = new ProductData("tents");

const element = document.querySelector(".product-list");

const productList = new ProductList("Tents", dataSource, element);

//productList.init();

const searchForm = document.querySelector("#search-form");

searchForm?.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = document.querySelector("#search-input").value.trim();

  console.log("Searching:", searchTerm);

  if (searchTerm) {
    window.location.href =
      `/product_listing/index.html?search=${encodeURIComponent(searchTerm)}`;
  }
});