// src/pages/WarehousesPage.jsx
import { useEffect, useState } from "react";
import { fetchWarehouses, updateWarehouse, deleteWarehouse } from "../js/warehouse";
import WarehouseCard from "../components/WarehouseCard";

function WarehousesPage() {
  const [warehouses, setWarehouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load warehouses on mount
  useEffect(() => {
    loadWarehouses();
  }, []);

  async function loadWarehouses() {
    try {
      setLoading(true);
      setError(null);

      const data = await fetchWarehouses(); // expect array of warehouses
      setWarehouses(data || []);
    } catch (err) {
      console.error("Failed to fetch warehouses:", err);
      setError("Failed to load warehouses");
    } finally {
      setLoading(false);
    }
  }

  // Handle updating a single warehouse (called from WarehouseCard)
  async function handleUpdateWarehouse(updatedWarehouse) {
    try {
      const saved = await updateWarehouse(updatedWarehouse.id, updatedWarehouse);
      setWarehouses((prev) =>
        prev.map((w) => (w.id === saved.id ? saved : w))
      );
    } catch (err) {
      console.error("Failed to update warehouse:", err);
    }
  }

  // Handle deleting a single warehouse (called from WarehouseCard)
  async function handleDeleteWarehouse(id) {
    try {
      await deleteWarehouse(id);
      setWarehouses((prev) => prev.filter((w) => w.id !== id));
    } catch (err) {
      console.error("Failed to delete warehouse:", err);
    }
  }

  return (
    <div className="warehouses-page">
      <h1>Warehouses</h1>

      {loading && <p>Loading warehouses...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && warehouses.length === 0 && !error && (
        <p>No warehouses found.</p>
      )}

      <div className="warehouse-list">
        {warehouses.map((warehouse) => (
          <WarehouseCard
            key={warehouse.id}
            warehouse={warehouse}
            onEdit={handleUpdateWarehouse}
            onDelete={handleDeleteWarehouse}
          />
        ))}
      </div>
    </div>
  );
}

export default WarehousesPage;
