// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

// get the product id from the query string
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
}

export function renderListWithTemplate(
  template,
  parentElement,
  list,
  position = "afterbegin",
  clear = false
) {
  const htmlStrings = list.map(template);
  // if clear is true we need to clear out the contents of the parent.
  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;
  if (callback) {
    callback(data);
  }
}

export function updateCartCount() {
  const cartItems = getLocalStorage("so-cart") || [];
  const totalCount = cartItems.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0
  );
  const countElement = qs(".cart-count");
  if (countElement) {
    countElement.textContent = totalCount > 0 ? totalCount : "";
    countElement.style.display = totalCount > 0 ? "flex" : "none";
  }
}

// play a short bounce animation on the cart icon in the header
export function animateCart() {
  const cartIcon = qs(".cart");
  // the header loads asynchronously, so the icon may not exist yet
  if (!cartIcon) return;

  // remove the class first so the animation can replay on repeated clicks
  cartIcon.classList.remove("cart--adding");
  // reading offsetWidth forces a reflow, which commits the removal before
  // the class is added back. Without it the browser batches both changes
  // into one frame and the animation never restarts.
  void cartIcon.offsetWidth;
  cartIcon.classList.add("cart--adding");
}

async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
}

export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate("/partials/header.html");
  const footerTemplate = await loadTemplate("/partials/footer.html");

  const headerElement = qs("#main-header");
  const footerElement = qs("#main-footer");

  renderWithTemplate(headerTemplate, headerElement);
  renderWithTemplate(footerTemplate, footerElement);
  updateCartCount();
}