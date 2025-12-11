import { useEffect, useState } from "react";
import InventoryWarehouseCard from "../components/InventoryWarehouseCard";
import InventoryFormModal from "../modals/InventoryFormModal";
import WarehouseInventoryModal from "../modals/WarehouseInventoryModal";
import { fetchInventory, buildWarehouseSummaries,createInventory,updateInventory,deleteInventory,} from "../js/inventory";

function InventoryPage() {
  // state variabels for react
  const [inventory, setInventory] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeWarehouse, setActiveWarehouse] = useState(null); 
  const warehouseSummaries = buildWarehouseSummaries(inventory);

  function addInventory() {
    setShowAddModal(true);
  }

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchInventory();
        setInventory(data);
      } catch (err) {
        console.log("Error fetching inventory " + err);
      }
    }
    load();
  }, []);

  

  // called when Add Inventory modal submits
  async function handleSaveInventory(formData) {
    try {
      await createInventory(formData);
      const updated = await fetchInventory();
      setInventory(updated);
      setShowAddModal(false);
    } catch (err) {
      console.error("Error saving inventory", err);
    }
  }

  // clicking a card opens the detail modal
  function handleOpenWarehouse(summary) {
    setActiveWarehouse(summary);
  }

  function handleCloseWarehouseModal() {
    setActiveWarehouse(null);
  }

  // all raw inventory rows for that warehouse
  const activeWarehouseItems = activeWarehouse
    ? inventory.filter(
        (item) => item.warehouse.id === activeWarehouse.warehouseId
      )
    : [];

  // update one inventory row 
  async function handleUpdateInventoryItem(id, updatedFields) {
    try {
      await updateInventory(id, updatedFields);
      const updated = await fetchInventory();
      setInventory(updated);
    } catch (err) {
      console.error("Error updating inventory item", err);
    }
  }

  // delete one inventory row
  async function handleDeleteInventoryItem(id) {
    try {
      await deleteInventory(id);
      const updated = await fetchInventory();
      setInventory(updated);
    } catch (err) {
      console.error("Error deleting inventory item", err);
    }
  }

  return (
    <div>
      <h1>Inventory</h1>

      <button
        className="btn btn-success mb-3"
        onClick={addInventory}
      >
        Add Inventory
      </button>

      <div className="d-flex flex-wrap gap-3">
        {warehouseSummaries.map((w) => (
          <InventoryWarehouseCard
            key={w.warehouseId}
            summary={w}
            onClick={handleOpenWarehouse}   // 👈 new prop
          />
        ))}
      </div>

      {showAddModal && (
        <InventoryFormModal
          onClose={() => setShowAddModal(false)}
          onSave={handleSaveInventory}
        />
      )}

      {activeWarehouse && (
        <WarehouseInventoryModal
          warehouse={activeWarehouse}
          items={activeWarehouseItems}
          onClose={handleCloseWarehouseModal}
          onSaveItem={handleUpdateInventoryItem}
          onDeleteItem={handleDeleteInventoryItem}
        />
      )}
    </div>
  );
}

export default InventoryPage;
