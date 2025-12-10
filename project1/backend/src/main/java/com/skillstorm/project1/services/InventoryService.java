package com.skillstorm.project1.services;

import org.springframework.stereotype.Service;
import com.skillstorm.project1.models.InventoryModel;
import com.skillstorm.project1.models.ProductModel;
import com.skillstorm.project1.models.WarehouseModel;
import com.skillstorm.project1.repositories.InventoryRepository;
import com.skillstorm.project1.repositories.ProductRepository;
import com.skillstorm.project1.repositories.WarehouseRepository;
import java.util.List;

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

    public List<InventoryModel> getInventory() {
        return inventoryRepo.findAll();
    }

    public InventoryModel addInventory(Integer productId, Integer warehouseId, Integer quantity) {
        System.out.println("DEBUG addInventory -> productId=" + productId
                + ", warehouseId=" + warehouseId
                + ", quantity=" + quantity);

        ProductModel product = productRepo.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found with id=" + productId));

        WarehouseModel warehouse = warehouseRepo.findById(warehouseId)
                .orElseThrow(() -> new RuntimeException("Warehouse not found with id=" + warehouseId));
        if (!warehouse.getIsActive()) {
            throw new RuntimeException("Warehouse is not active");
        }

        InventoryModel inventory = new InventoryModel(product, warehouse, quantity);
        return inventoryRepo.save(inventory);
    }

    public List<InventoryModel> findByWarehouse_Id(Integer warehouseId) {
        return inventoryRepo.findByWarehouse_Id(warehouseId);
    }
    
    public List<InventoryModel> findByProduct_Id(Integer productId) {
        return inventoryRepo.findByProduct_Id(productId);
    }
}
