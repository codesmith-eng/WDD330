import { loadHeaderFooter, getParam } from "./utils.mjs";
import ProductData from "./ExternalServices.mjs";
//import ProductList from "./ProductList.mjs";
import ProductDetails from "./ProductDetails.mjs";

loadHeaderFooter();

//const category = getParam("category");
const dataSource = new ProductData();
//const element = document.querySelector(".product-list");
//const listing = new ProductList(category, dataSource, element);
const productID = getParam("product");
const product = new ProductDetails(productID, dataSource);

//listing.init();
product.init();
