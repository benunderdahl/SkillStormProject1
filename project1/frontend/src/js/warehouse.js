const API_BASE_URL = "http://localhost:8080";

export async function fetchWarehouses() {
  const res = await fetch(`${API_BASE_URL}/api/warehouse`);
  if (!res.ok) throw new Error("Failed to fetch warehouses");
  return res.json();
}

export async function createWarehouse(product) {
  const res = await fetch(`${API_BASE_URL}/api/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  if (!res.ok) throw new Error("Failed to create warehouse");
  return res.json();
}

export async function updateWarehouse(id, product) {
  const res = await fetch(`${API_BASE_URL}/api/warehouse/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  if (!res.ok) throw new Error("Failed to update warehouse");
  return res.json();
}

export async function deleteWarehouse(id) {
  const res = await fetch(`${API_BASE_URL}/api/warehouse/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete warehouse");
  }
}

