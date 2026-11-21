import { getLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();

function formDataToJSON(formElement) {
  const formData = new FormData(formElement);
  const convertedJSON = {};

  formData.forEach((value, key) => {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}

function packageItems(items) {
  return items.map((item) => {
    return {
      id: item.Id,
      price: item.FinalPrice,
      name: item.Name,
      quantity: 1,
    };
  });
}

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }

  init() {
    this.list = getLocalStorage(this.key) || [];
    this.calculateItemSubTotal();
  }

  calculateItemSubTotal() {
    this.itemTotal = this.list.reduce(
      (total, item) =>
        total + Number(item.FinalPrice) * (item.quantity || 1),
      0
    );

    const itemCount = document.querySelector(
      `${this.outputSelector} #numberItems`
    );

    const cartTotal = document.querySelector(
      `${this.outputSelector} #cartTotal`
    );

    const totalItems = this.list.reduce(
      (sum, item) => sum + (item.quantity || 1),
      0
    );

    if (itemCount) {
      itemCount.textContent = totalItems;
    }

    if (cartTotal) {
      cartTotal.textContent = `$${this.itemTotal.toFixed(2)}`;
    }
  }

  calculateOrderTotal() {
    this.tax = this.itemTotal * 0.06;

    this.shipping = this.list.length
      ? 10 + (this.list.length - 1) * 2
      : 0;

    this.orderTotal = this.itemTotal + this.tax + this.shipping;

    this.displayOrderTotals();
  }

  displayOrderTotals() {
    const taxElement = document.querySelector(
      `${this.outputSelector} #tax`
    );

    const shippingElement = document.querySelector(
      `${this.outputSelector} #shipping`
    );

    const totalElement = document.querySelector(
      `${this.outputSelector} #total`
    );

    if (taxElement) {
      taxElement.textContent = `$${this.tax.toFixed(2)}`;
    }

    if (shippingElement) {
      shippingElement.textContent = `$${this.shipping.toFixed(2)}`;
    }

    if (totalElement) {
      totalElement.textContent = `$${this.orderTotal.toFixed(2)}`;
    }
  }
}