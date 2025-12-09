import { Routes, Route, Link } from "react-router-dom";

function HomePage() {
  return <h2>Home Page</h2>;
}

function ProductsPage() {
  return <h2>Products Page</h2>;
}

function InventoryPage() {
  return <h2>Inventory Page</h2>;
}

function App() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/products">Products</Link> |{" "}
        <Link to="/inventory">Inventory</Link> |{" "}
        <Link to="/warehouses">Warehouses</Link>
      </nav>

      <hr />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="/warehouses" element={<WarehousesPage />} />
      </Routes>
    </div>
  );
}

export default App;
