import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import InventoryPage from "./pages/InventoryPage";
import ProductsPage from "./pages/ProductsPage";
import WarehousesPage from "./pages/WarehousesPage";
import Navbar from "./components/Navbar";

// main page for the app using navbar component and routes
// to navigate to different page components
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="/warehouses" element={<WarehousesPage />} />
      </Routes>
    </>
  );
}

export default App;
