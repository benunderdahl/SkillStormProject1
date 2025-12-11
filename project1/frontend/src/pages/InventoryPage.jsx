import { useEffect, useState } from "react";
import InventoryWarehouseCard from "../components/InventoryWarehouseCard";
import InventoryFormModal from "../components/InventoryFormModal";
import { fetchInventory, buildWarehouseSummaries, createInventory } from "../js/inventory";

function InventoryPage() {
  const [inventory, setInventory] = useState([]);
  const [showModal, setShowModal] = useState(false);

  function addInventory() {
    setShowModal(true);
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

  const warehouseSummaries = buildWarehouseSummaries(inventory);

  // 🔥 this gets called when the modal form is submitted
  async function handleSaveInventory(formData) {
    try {
      await createInventory(formData);       // POST to backend
      const updated = await fetchInventory(); // reload inventory
      setInventory(updated);                 // update UI
      setShowModal(false);                   // close modal
    } catch (err) {
      console.error("Error saving inventory", err);
      // optionally keep modal open & show error message
    }
  }

  return (
    <div>
      <h1>Inventory</h1>

      {/* ⬇️ React uses onClick, and you pass the function (no parentheses) */}
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
          />
        ))}
      </div>

      {showModal && (
        <InventoryFormModal
          onClose={() => setShowModal(false)}
          onSave={handleSaveInventory}
        />
      )}
    </div>
  );
}

export default InventoryPage;
