const rawBaseURL =
  import.meta.env.VITE_SERVER_URL || "https://onrender.com";

// Ensures baseURL always ends with a single trailing slash
const baseURL = rawBaseURL.endsWith("/") ? rawBaseURL : `${rawBaseURL}/`;

async function convertToJson(res) {
  const contentType = res.headers.get("content-type");
  if (res.ok && contentType && contentType.includes("application/json")) {
    return res.json();
  } else {
    const text = await res.text();
    throw new Error(`Bad Response (${res.status}): ${text.slice(0, 100)}`);
  }
}

export default class ProductData {
  constructor() {}

  async getData(category) {
    const response = await fetch(`${baseURL}products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
  }

  async findProductById(id) {
    const response = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(response);
    return data.Result;
  }
}