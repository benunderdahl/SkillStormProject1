package com.skillstorm.project1.dtos;

public class InventoryUpdateRequest {

    // this simple dto just grabs the quantity of the 
    // request and sets it to be updated in the db
    private Integer quantity;

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}