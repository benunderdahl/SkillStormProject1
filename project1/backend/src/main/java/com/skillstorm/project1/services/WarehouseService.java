package com.skillstorm.project1.services;
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

    public WarehouseModel createWarehouse(WarehouseModel warehouse) {
        if (warehouse.getMaxCapacity() <= 0) {
            throw new IllegalArgumentException("Max capacity must be >= 0");
        }
        return repo.save(warehouse);
    }
}
