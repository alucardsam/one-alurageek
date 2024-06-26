const URLEndpoint = "http://localhost:3001/products/";

async function loadProducts() {
  try {
    const response = await fetch(URLEndpoint, {
      method: "GET",
      headers: {
        "Content-type": "application/json"
      }
    });
    const jsonData = await response.json();
    return jsonData;
  }
  catch {
    throw new Error('Sin conexion al API, favor de iniciar el servidor');
  }
}

async function createProduct(name, price, image) {
  const response = await fetch(URLEndpoint, {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({ name, price, image })
  })
  if (!response.ok) {
    throw new Error("No fue posible crear el producto");
  }
  const jsonData = await response.json();
  return jsonData;
}

async function deleteProduct(id) {
  const response = await fetch(URLEndpoint + id, {
    method: "DELETE"
  })
  if (!response.ok) {
    throw new Error("No fue posible eliminar el producto");
  }
  const jsonData = await response.json();
  return jsonData;
}

export const API = {
  loadProducts, createProduct, deleteProduct
}
