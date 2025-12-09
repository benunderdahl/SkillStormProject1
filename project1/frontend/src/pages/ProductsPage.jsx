import { useEffect, useState } from "react";
import { fetchProducts } from "../api/products";
import ProductCard from "../components/ProductCard";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function load() {
      const data = await fetchProducts();
      setProducts(data);
    }
    load();
  }, []);

  function handleEdit(product) {
    alert("Editing product: " + product.name);
    // Here you would open a modal or navigate to an edit page
  }

  function handleDelete(id) {
    alert("Deleting product with ID: " + id);
    // Later we will call DELETE /api/products/:id
  }

  return (
    <div>
      <h1 className="mb-4">Products</h1>

      <div className="d-flex flex-wrap gap-3">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}
