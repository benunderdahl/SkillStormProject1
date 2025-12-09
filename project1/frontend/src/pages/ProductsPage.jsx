import { useEffect, useState } from "react";
import { fetchProducts, updateProduct, deleteProduct } from "../js/products";
import ProductCard from "../components/ProductCard";
import ProductEditModal from "../components/ProductEditModal";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        console.error(err);
      }
    }
    load();
  }, []);

  function handleEdit(product) {
    setEditingProduct(product);
    setShowEditModal(true);
  }

  function handleCloseModal() {
    setShowEditModal(false);
    setEditingProduct(null);
  }

  async function handleSaveEdit(updatedFields) {
    if (!editingProduct) return;

    try {
      const updated = await updateProduct(editingProduct.id, {
        ...editingProduct,
        ...updatedFields,
      });

      // update local state list
      setProducts(prev =>
        prev.map(p => (p.id === updated.id ? updated : p))
      );

      handleCloseModal();
    } catch (err) {
      console.error("Failed to update product", err);
    }
  }

  async function handleDelete(id) {
    const confirmed = window.confirm("Are you sure you want to delete this product?");
    if (!confirmed) return;

    try {
      await deleteProduct(id);
      // remove it from local state
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      console.error("Failed to delete product", err);
    }
  }

  return (
    <div>
      <h1 className="mb-4">Products</h1>

      <div className="d-flex flex-wrap gap-3">
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      <ProductEditModal
        show={showEditModal}
        product={editingProduct}
        onClose={handleCloseModal}
        onSave={handleSaveEdit}
      />
    </div>
  );
}
