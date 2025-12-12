package com.skillstorm.project1.controllers;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.skillstorm.project1.services.InventoryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import java.util.List;
import com.skillstorm.project1.dtos.InventoryRequest;
import com.skillstorm.project1.dtos.InventoryUpdateRequest;
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
    public List<InventoryModel> fetchWarehouses() {
        return service.getInventory();
    }

    // fetch the body of the request in the form of json
    // using the inventory request model
    @PostMapping()
    public ResponseEntity<InventoryModel> addInventory(@RequestBody InventoryRequest req) {
        InventoryModel saved = service.addInventory(req);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    // grab the id from the path variable and set it
    @PutMapping("/{id}")
    public ResponseEntity<InventoryModel> updateInventory(
            @PathVariable Integer id,
            @RequestBody InventoryUpdateRequest req) {
        // or reuse InventoryRequest if you want
        InventoryModel updated = service.updateInventory(id, req);
        return ResponseEntity.ok(updated);
    }

    // grab the id from the path variable and use service to delete that item
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInventory(@PathVariable Integer id) {
        service.deleteInventory(id);
        return ResponseEntity.noContent().build();
    }

}
