package com.skillstorm.project1.services;

import org.springframework.stereotype.Service;

import com.skillstorm.project1.models.InventoryModel;
import com.skillstorm.project1.models.ProductModel;
import com.skillstorm.project1.models.WarehouseModel;
import com.skillstorm.project1.repositories.InventoryRepository;
import com.skillstorm.project1.repositories.ProductRepository;
import com.skillstorm.project1.repositories.WarehouseRepository;

@Service
public class InventoryService {

    private final InventoryRepository inventoryRepo;
    private final ProductRepository productRepo;
    private final WarehouseRepository warehouseRepo;

    public InventoryService(InventoryRepository inventoryRepo,
                            ProductRepository productRepo,
                            WarehouseRepository warehouseRepo) {
        this.inventoryRepo = inventoryRepo;
        this.productRepo = productRepo;
        this.warehouseRepo = warehouseRepo;
    }

    public InventoryModel addInventory(Integer productId, Integer warehouseId, String locationCode, Integer quantity) {
        ProductModel product = productRepo.findById(productId)
            .orElseThrow(() -> new RuntimeException("Product not found"));

        WarehouseModel warehouse = warehouseRepo.findById(warehouseId)
            .orElseThrow(() -> new RuntimeException("Warehouse not found"));

        InventoryModel inventory = new InventoryModel(product, warehouse, locationCode, quantity);
        return inventoryRepo.save(inventory);
    }
}
