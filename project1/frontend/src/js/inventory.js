const API_BASE_URL = "http://localhost:8080";

export async function fetchInventory() {
  const res = await fetch(`${API_BASE_URL}/api/inventory`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

// src/js/warehouseSummaries.js

// inventory: array of inventory rows from the API
// returns: one summary object per warehouse
export function buildWarehouseSummaries(inventory = []) {
  const byWarehouse = inventory.reduce((acc, item) => {
    const wid = item.warehouse.id;

    if (!acc[wid]) {
      acc[wid] = {
        warehouseId: wid,
        warehouseName: item.warehouse.name,
        warehouseLocation: item.warehouse.location,
        warehouseQuantity: item.warehouse.maxCapacity, // capacity
        productIds: new Set(),                        // track unique products
      };
    }

    const summary = acc[wid];

    // add product to this warehouse's set
    summary.productIds.add(item.product.id);

    return acc;
  }, {});

  // convert to plain array + computed productCount
  return Object.values(byWarehouse).map((s) => ({
    warehouseId: s.warehouseId,
    warehouseName: s.warehouseName,
    warehouseLocation: s.warehouseLocation,
    warehouseQuantity: s.warehouseQuantity,
    productCount: s.productIds.size, // UNIQUE products for this warehouse
  }));
}

export async function createInventory(data) {
  // data = { productId, warehouseId, quantity }
  const body = {
    productId: data.productId,
    warehouseId: data.warehouseId,
    quantity: data.quantity,
  };

  console.log("creating inventory with body", body);

  const res = await fetch("http://localhost:8080/api/inventory", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("Backend error body:", text);
    throw new Error("Failed to create inventory");
  }

  return await res.json();
}

