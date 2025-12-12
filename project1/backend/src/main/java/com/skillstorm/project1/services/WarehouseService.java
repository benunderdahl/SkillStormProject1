package com.skillstorm.project1.services;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.stereotype.Service;
import com.skillstorm.project1.models.WarehouseModel;
import com.skillstorm.project1.repositories.WarehouseRepository;

@Service
public class WarehouseService {

    private final WarehouseRepository repo;

    public WarehouseService(WarehouseRepository repo) {
        this.repo = repo;
    }

    public List<WarehouseModel> getAllWarehouses() {
        return repo.findAll();
    }
    // When creating a warehouse make sure the capacity set is at least 0
    public WarehouseModel createWarehouse(WarehouseModel warehouse) {
        if (warehouse.getMaxCapacity() <= 0) {
            throw new IllegalArgumentException("Max capacity must be >= 0");
        }
        return repo.save(warehouse);
    }

    // Logic to update the warehouse by finding the warehouse with given ID
    // Then using warehouse model to form data and send it to db
    public WarehouseModel updateWarehouse(Integer id, WarehouseModel warehouse) {
        return repo.findById(id)
                .map(existing -> {
                    existing.setName(warehouse.getName());
                    existing.setName(warehouse.getName());
                    existing.setLocation(warehouse.getLocation());
                    existing.setMaxCapacity(warehouse.getMaxCapacity());
                    existing.setUpdatedAt(LocalDateTime.now());
                    return repo.save(existing);
                })
                .orElseThrow(() -> new RuntimeException("Warehouse not found: " + id));
    }

    public void deleteWarehouse(Integer id) {
        repo.deleteById(id);
    }
}
