// src/components/WarehouseEditModal.jsx
import { useState } from "react";
import "../css/WarehouseModal.css"

function WarehouseEditModal({ warehouse, onClose, onSave }) {
  const [name, setName] = useState(warehouse?.name ?? "");
  const [location, setLocation] = useState(warehouse?.location ?? "");
  const [maxCapacity, setMaxCapacity] = useState(warehouse?.maxCapacity ?? 0);
  const [isActive, setIsActive] = useState(
    warehouse?.isActive ?? true
  );

  function handleSubmit(e) {
    e.preventDefault();
    onSave({
      ...warehouse, // keep id, createdAt, etc.
      name,
      location,
      maxCapacity: Number(maxCapacity),
      isActive,
    });
  }

  return (
    <div className="warehouse-modal-backdrop">
      <div className="warehouse-modal card shadow-lg border-0">
        {/* Header */}
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Edit Warehouse</h5>
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={onClose}
          ></button>
        </div>

        {/* Body */}
        <div className="card-body">
          <form onSubmit={handleSubmit} className="warehouse-modal-form">
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Location</label>
              <input
                className="form-control"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Max Capacity</label>
              <input
                type="number"
                className="form-control"
                value={maxCapacity}
                onChange={(e) => setMaxCapacity(e.target.value)}
              />
            </div>

            <div className="form-check mb-2">
              <input
                className="form-check-input"
                type="checkbox"
                id="warehouse-active"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="warehouse-active">
                Active
              </label>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="card-footer d-flex justify-content-end gap-2">
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={handleSubmit}
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default WarehouseEditModal;
