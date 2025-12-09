package com.skillstorm.project1.models;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.*;

@Entity
@Table(name = "inventory")
public class InventoryModel {

    // junction table PK
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;  

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private ProductModel product;

    @ManyToOne
    @JoinColumn(name = "warehouse_id", nullable = false)
    private WarehouseModel warehouse;

    @Column(nullable = false)
    private Integer quantity;

    public InventoryModel() {}

    public InventoryModel(ProductModel product, WarehouseModel warehouse, Integer quantity) {
        this.product = product;
        this.warehouse = warehouse;
        this.quantity = quantity;
    }

    // Getters and setters
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public ProductModel getProduct() { return product; }
    public void setProduct(ProductModel product) { this.product = product; }

    public WarehouseModel getWarehouse() { return warehouse; }
    public void setWarehouse(WarehouseModel warehouse) { this.warehouse = warehouse; }

    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }

    @Override
    public String toString() {
        return "InventoryModel [id=" + id + ", product=" + product + ", warehouse=" + warehouse + ", quantity="
                + quantity + "]";
    }
}

