import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

const dataSource = new ProductData("tents");

const listElement = document.querySelector(".product-list");

const productList = new ProductList("tents", dataSource, listElement);

const searchTerm =
  new URLSearchParams(window.location.search).get("search") || "";

console.log("Search Term:", searchTerm);

productList.init(searchTerm);
