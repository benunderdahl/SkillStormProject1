package com.skillstorm.project1.dtos;

// I had to create this dto to simplify the request to the 
// api so that I can just insert the warehouse, product and quantity
public class InventoryRequest {
    private Integer productId;
    private Integer warehouseId;
    private Integer quantity;

    public Integer getProductId() {
        return productId;
    }
    public void setProductId(Integer productId) {
        this.productId = productId;
    }

    public Integer getWarehouseId() {
        return warehouseId;
    }
    public void setWarehouseId(Integer warehouseId) {
        this.warehouseId = warehouseId;
    }

    public Integer getQuantity() {
        return quantity;
    }
    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}
