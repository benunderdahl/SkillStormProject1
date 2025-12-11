import { useEffect, useState } from "react";

function WarehouseInventoryModal({
  warehouse,
  items,
  onClose,
  onSaveItem,
  onDeleteItem,
}) {
  // local editable copy of quantities
  const [rows, setRows] = useState([]);

  useEffect(() => {
    setRows(
      items.map((item) => ({
        id: item.id,
        productName: item.product.name,
        quantity: item.quantity,
      }))
    );
  }, [items]);

  function handleChangeQuantity(id, value) {
    setRows((prev) =>
      prev.map((row) =>
        row.id === id ? { ...row, quantity: value } : row
      )
    );
  }

  function handleSaveRow(row) {
    onSaveItem(row.id, { quantity: Number(row.quantity) });
  }

  function handleDeleteRow(id) {
    if (confirm("Are you sure you want to delete this inventory entry?")) {
      onDeleteItem(id);
    }
  }

  return (
    <div className="modal d-block" tabIndex="-1">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              Inventory for {warehouse.warehouseName} (ID {warehouse.warehouseId})
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            />
          </div>

          <div className="modal-body">
            {rows.length === 0 ? (
              <p>No products in this warehouse yet.</p>
            ) : (
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th style={{ width: "120px" }}>Quantity</th>
                    <th style={{ width: "180px" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.id}>
                      <td>{row.productName}</td>
                      <td>
                        <input
                          type="number"
                          className="form-control"
                          value={row.quantity}
                          min="0"
                          onChange={(e) =>
                            handleChangeQuantity(row.id, e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-primary me-2"
                          type="button"
                          onClick={() => handleSaveRow(row)}
                        >
                          Save
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          type="button"
                          onClick={() => handleDeleteRow(row.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WarehouseInventoryModal;
