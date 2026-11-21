const rawBaseURL =
  import.meta.env.VITE_SERVER_URL ||
  "https://wdd330-backend.onrender.com/";

const baseURL = rawBaseURL.endsWith("/")
  ? rawBaseURL
  : `${rawBaseURL}/`;

async function convertToJson(response) {
  const contentType = response.headers.get("content-type");

  if (
    response.ok &&
    contentType &&
    contentType.includes("application/json")
  ) {
    return response.json();
  }

  const errorText = await response.text();
  throw new Error(
    `Bad Response (${response.status}): ${errorText}`
  );
}

export default class ExternalServices {
  async getData(category) {
    const response = await fetch(
      `${baseURL}products/search/${category}`
    );

    const data = await convertToJson(response);
    return data.Result;
  }

  async findProductById(id) {
    const response = await fetch(
      `${baseURL}product/${id}`
    );

    const data = await convertToJson(response);
    return data.Result;
  }

  async checkout(order) {
    const response = await fetch(
      `${baseURL}checkout/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      }
    );

    return convertToJson(response);
  }
}