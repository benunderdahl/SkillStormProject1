import { useState, useEffect } from "react";
import { fetchProducts } from "../js/products";
import { fetchWarehouses } from "../js/warehouse";

function InventoryFormModal({ onClose, onSave }) {
  const [productId, setProductId] = useState("");
  const [warehouseId, setWarehouseId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [products, setProducts] = useState([]);
  const [warehouses, setWarehouses] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const p = await fetchProducts();
        const w = await fetchWarehouses();
        setProducts(p);
        // only active warehouses
        setWarehouses(w.filter((wh) => wh.isActive));
      } catch (err) {
        console.error("Error loading dropdown data", err);
      }
    }
    load();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    onSave({
      productId: Number(productId),
      warehouseId: Number(warehouseId),
      quantity: Number(quantity),
    });
  }

  return (
    <div className="modal d-block" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title">Add Inventory</h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
              />
            </div>

            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Product</label>
                <select
                  className="form-select"
                  value={productId}
                  onChange={(e) => setProductId(e.target.value)}
                  required
                >
                  <option value="">Select product...</option>
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Warehouse</label>
                <select
                  className="form-select"
                  value={warehouseId}
                  onChange={(e) => setWarehouseId(e.target.value)}
                  required
                >
                  <option value="">Select warehouse...</option>
                  {warehouses.map((wh) => (
                    <option key={wh.id} value={wh.id}>
                      {wh.name} — {wh.location}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Quantity</label>
                <input
                  type="number"
                  className="form-control"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  min="1"
                  required
                />
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
              >
                Save Inventory
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default InventoryFormModal;
