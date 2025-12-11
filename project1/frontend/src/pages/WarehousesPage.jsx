// src/pages/WarehousesPage.jsx
import { useEffect, useState } from "react";
import {
  fetchWarehouses,
  createWarehouse,
  updateWarehouse,
  deleteWarehouse,
} from "../js/warehouse";
import WarehouseCard from "../components/WarehouseCard";
import WarehouseEditModal from "../modals/WarehouseEditModal";

function WarehousesPage() {
  const [warehouses, setWarehouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [editingWarehouse, setEditingWarehouse] = useState(null);

  useEffect(() => {
    loadWarehouses();
  }, []);

  async function loadWarehouses() {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchWarehouses();
      setWarehouses(data || []);
    } catch (err) {
      console.error("Failed to fetch warehouses:", err);
      setError("Failed to load warehouses");
    } finally {
      setLoading(false);
    }
  }

  function handleOpenEdit(warehouse) {
    setEditingWarehouse(warehouse);
  }

  function handleCloseEdit() {
    setEditingWarehouse(null);
  }

  async function handleSaveWarehouse(warehouse) {
    try {
      let saved;

      if (warehouse.id) {
        // UPDATE
        saved = await updateWarehouse(warehouse.id, warehouse);
        setWarehouses((prev) =>
          prev.map((w) => (w.id === saved.id ? saved : w))
        );
      } else {
        // CREATE
        saved = await createWarehouse(warehouse);
        setWarehouses((prev) => [...prev, saved]);
      }

      setEditingWarehouse(null);
    } catch (err) {
      console.error("Failed to save warehouse:", err);
    }
  }


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
      <a></a>

      {loading && <p>Loading warehouses...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && warehouses.length === 0 && !error && (
        <p>No warehouses found.</p>
      )}

      <button
        className="btn btn-success mb-3"
        onClick={() => setEditingWarehouse({})}
      > Add Warehouse</button>

      <div className="warehouse-list d-flex flex-wrap gap-3">
        {warehouses.map((warehouse) => (
            <WarehouseCard
              warehouse={warehouse}
              onEdit={() => handleOpenEdit(warehouse)}
              onDelete={handleDeleteWarehouse}
            />
        ))}
      </div>



      {editingWarehouse && (
        <WarehouseEditModal
          warehouse={editingWarehouse}
          onClose={handleCloseEdit}
          onSave={handleSaveWarehouse}
        />
      )}
    </div>
  );
}

export default WarehousesPage;
