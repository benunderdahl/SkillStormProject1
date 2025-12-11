// com/skillstorm/project1/dtos/InventoryRequest.java
package com.skillstorm.project1.dtos;

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
