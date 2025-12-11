function InventoryWarehouseCard({ summary, onClick }) {
  return (
    <div className="card shadow-sm mb-3" 
    style={{ width: "18rem" }}
    onClick={() => onClick(summary)}>
      <div className="card-body">
        <h5 className="card-title">{summary.warehouseName}</h5>
        <h6 className="card-subtitle mb-2 text-muted">
          Location: {summary.warehouseLocation}
        </h6>

        <p className="card-text">
          Products stored: <strong>{summary.productCount} / {summary.warehouseQuantity} </strong>
        </p>
      </div>
    </div>
  );
}

export default InventoryWarehouseCard;
