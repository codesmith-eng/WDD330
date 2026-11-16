import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

await loadHeaderFooter();

const category = getParam("category") || "tents";
const searchTerm = getParam("search") || "";

const dataSource = new ProductData();
const listElement = document.querySelector(".product-list");

const productList = new ProductList(category, dataSource, listElement);

console.log("Category:", category, "Search Term:", searchTerm);

productList.init(searchTerm);