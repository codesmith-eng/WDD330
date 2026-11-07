export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function setClick(selector, callback) {
  const element = qs(selector);
  if (!element) {
    throw new Error(`Could not find element for selector: ${selector}`);
  }

  element.addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  element.addEventListener("click", callback);
}

export function getParam(param) {
  return new URLSearchParams(window.location.search).get(param);
}

export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = false,
) {
  if (!parentElement) {
    throw new Error("Could not find the list element to render");
  }

  if (clear) {
    parentElement.innerHTML = "";
  }
  const htmlStrings = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

export function setImageFallback(parentElement) {
  parentElement.querySelectorAll("img").forEach((image) => {
    image.addEventListener(
      "error",
      () => {
        image.src = "/images/noun_Tent_2517.svg";
      },
      { once: true },
    );
  });
}
