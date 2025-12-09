package com.skillstorm.project1.controllers;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.skillstorm.project1.services.InventoryService;
import org.springframework.web.bind.annotation.GetMapping;



@RestController
@RequestMapping("/api/inventory")
public class InventoryController {

    private final InventoryService service;

    public InventoryController(InventoryService service) {
        this.service = service;
    }

    @GetMapping()
    public String Home() {
        return "Inventory page";
    }

}
