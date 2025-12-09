package com.skillstorm.project1.controllers;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skillstorm.project1.models.WarehouseModel;
import com.skillstorm.project1.services.WarehouseService;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;


@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/warehouse")
public class WarehouseController {

    private final WarehouseService service;

    public WarehouseController(WarehouseService service) {
        this.service = service;
    }

    @GetMapping()
    String home() {
        return "warehouse page";
    }

    @PostMapping()
    public WarehouseModel createWarehouse(@RequestBody WarehouseModel warehouse) {
        return service.createWarehouse(warehouse);
    }

    @PutMapping("/{id}")
    public WarehouseModel updateWarehouse(@PathVariable Integer id, 
        @RequestBody WarehouseModel warehouse) {      
        return service.updateWarehouse(id, warehouse);
    }

    @DeleteMapping("/{id}")
    public void deleteWarehouse(@PathVariable Integer id) {
        service.deleteWarehouse(id);
    }
}
