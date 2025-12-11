import { useEffect, useState } from "react";
import { fetchProducts, createProduct, updateProduct, deleteProduct } from "../js/products";
import ProductCard from "../components/ProductCard";
import ProductEditModal from "../modals/ProductEditModal";

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

  async function handleSaveEdit(newFields) {
    if (!editingProduct.id) {
      // CREATE
      const created = await createProduct(newFields);
      setProducts(prev => [...prev, created]);
    } else {
      // UPDATE
      const updated = await updateProduct(editingProduct.id, newFields);
      setProducts(prev => prev.map(p => (p.id === updated.id ? updated : p)));
    }

    handleCloseModal();
  }

  function handleAddProduct() {
    setEditingProduct({
      name: "",
      description: "",
      category: ""
    });
    setShowEditModal(true);
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
      <button
        className="btn btn-success mb-3"
        onClick={handleAddProduct}
      > Add Product</button>

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
