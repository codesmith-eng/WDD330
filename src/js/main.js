import { loadHeaderFooter } from "./utils.mjs";

await loadHeaderFooter();

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