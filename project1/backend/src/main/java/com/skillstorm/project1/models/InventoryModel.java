package com.skillstorm.project1.models;
import jakarta.persistence.*;

@Entity
@Table(name = "inventory")
public class InventoryModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    // define the relationship with inventory table and product table
    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private ProductModel product;

    // define the relationship with the warehouse table and inventory table
    @ManyToOne
    @JoinColumn(name = "warehouse_id", nullable = false)
    private WarehouseModel warehouse;

    @Column(nullable = false)
    private Integer quantity;

    public InventoryModel() {
    }

    // because this model is related to to other models I will take these
    // in during dpeendency injection so that i can use their models later
    // to grab data
    public InventoryModel(ProductModel product, WarehouseModel warehouse, Integer quantity) {
        this.product = product;
        this.warehouse = warehouse;
        this.quantity = quantity;
    }
    // Getters and setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public ProductModel getProduct() {
        return product;
    }

    public void setProduct(ProductModel product) {
        this.product = product;
    }

    public WarehouseModel getWarehouse() {
        return warehouse;
    }

    public void setWarehouse(WarehouseModel warehouse) {
        this.warehouse = warehouse;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    @Override
    public String toString() {
        return "InventoryModel [id=" + id + " product=" + product + ", warehouse=" + warehouse + ", quantity="
                + quantity + "]";
    }
}
