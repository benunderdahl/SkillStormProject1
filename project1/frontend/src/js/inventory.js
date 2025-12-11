const API_BASE_URL = "http://localhost:8080";
const INVENTORY_BASE_URL = `${API_BASE_URL}/api/inventory`;

// ----------------------
// FETCH ALL INVENTORY
// ----------------------
export async function fetchInventory() {
  const res = await fetch(INVENTORY_BASE_URL);
  if (!res.ok) throw new Error("Failed to fetch inventory");
  return res.json();
}

// ----------------------
// BUILD WAREHOUSE SUMMARIES
// ----------------------
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
        productIds: new Set(),                         // track unique products
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

// ----------------------
// CREATE INVENTORY
// ----------------------
export async function createInventory(data) {
  const body = {
    productId: data.productId,
    warehouseId: data.warehouseId,
    quantity: data.quantity,
  };

  const res = await fetch(INVENTORY_BASE_URL, {
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

// ----------------------
// UPDATE INVENTORY
// ----------------------
export async function updateInventory(id, updatedFields) {
  const res = await fetch(`${INVENTORY_BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedFields),
  });

  if (!res.ok) {
    throw new Error("Failed to update inventory");
  }

  return await res.json();
}
// ----------------------
// DELETE INVENTORY
// ----------------------
export async function deleteInventory(id) {
  const res = await fetch(`${INVENTORY_BASE_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete inventory");
  }
}
