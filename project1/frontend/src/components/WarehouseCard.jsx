function WarehouseCard(warehouse, onEdit, onDelete) {
      return (
    <div className="card shadow-sm mb-3" style={{ width: "20rem" }}>
      <div className="card-body">
        <h5 className="card-title">{warehosue.name}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{warehouse.location}</h6>

        <p className="card-text">{warehouse.maxCapacity}</p>
        <p className="card-text">{warehouse.isActive}</p>
        <p className="card-text">
          <small className="text-muted">
            Created: {warehouse.createdAt?.slice(0, 10)}
          </small>
        </p>

        <div className="d-flex justify-content-between mt-3">
          <button
            className="btn btn-primary btn-sm"
            onClick={() => onEdit(product)}
          >
            Edit
          </button>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => onDelete(product.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}




export default WarehouseCard