package com.skillstorm.project1.controllers;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skillstorm.project1.models.WarehouseModel;
import com.skillstorm.project1.services.WarehouseService;

@RestController
@RequestMapping("/api")
public class WarehouseController {

    private final WarehouseService service;

    public WarehouseController(WarehouseService service) {
        this.service = service;
    }

    @GetMapping("/warehouse")
    String home() {
        return "Hello World";
    }

    @PostMapping("/warehouse")
    public WarehouseModel create(@RequestBody WarehouseModel warehouse) {
        return service.createWarehouse(warehouse);
    }
}
