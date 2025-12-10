package com.skillstorm.project1.controllers;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.skillstorm.project1.services.InventoryService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;

import java.util.List;
import com.skillstorm.project1.models.InventoryModel;


@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/inventory")
public class InventoryController {

    private final InventoryService service;

    public InventoryController(InventoryService service) {
        this.service = service;
    }

    @GetMapping() 
    public List<InventoryModel> fetchAllInventory() {
        return service.getInventory();
    }

    @GetMapping("/{warehouseId}")
    public List<InventoryModel> getByWarehouseId(@PathVariable Integer warehouseId) {
        return service.findByWarehouse_Id(warehouseId);
    }

    @PostMapping()
    public InventoryModel addInventory(@RequestParam Integer product, 
                                        @RequestParam Integer warehouse, 
                                        @RequestParam Integer quantity) {
        return service.addInventory(product, warehouse, quantity);
    }
}
