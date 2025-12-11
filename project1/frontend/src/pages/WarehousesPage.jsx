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
  // state variables
  const [warehouses, setWarehouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingWarehouse, setEditingWarehouse] = useState(null);

  // load in warehouses from the backend
  useEffect(() => {
    loadWarehouses();
  }, []);
  
  // load in warehouses and store it in the state variable warehouses
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

  // edit button was pressed on warehouse card
  function handleOpenEdit(warehouse) {
    setEditingWarehouse(warehouse);
  }

  // close the edit modal
  function handleCloseEdit() {
    setEditingWarehouse(null);
  }

  // when save is pressed in the modal check if the warehouse exists
  // if it does update, if it doesnt create a new one
  async function handleSaveWarehouse(warehouse) {
    try {
      let saved;

      if (warehouse.id) {
        saved = await updateWarehouse(warehouse.id, warehouse);
        setWarehouses((prev) =>
          prev.map((w) => (w.id === saved.id ? saved : w))
        );
      } else {
        saved = await createWarehouse(warehouse);
        setWarehouses((prev) => [...prev, saved]);
      }

      setEditingWarehouse(null);
    } catch (err) {
      console.error("Failed to save warehouse:", err);
    }
  }

  // delete the warehouse from the db with a confirmation
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
