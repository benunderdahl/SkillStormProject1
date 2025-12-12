package com.skillstorm.project1.services;

import org.springframework.stereotype.Service;
import com.skillstorm.project1.dtos.InventoryRequest;
import com.skillstorm.project1.dtos.InventoryUpdateRequest;
import com.skillstorm.project1.models.InventoryModel;
import com.skillstorm.project1.models.ProductModel;
import com.skillstorm.project1.models.WarehouseModel;
import com.skillstorm.project1.repositories.InventoryRepository;
import com.skillstorm.project1.repositories.ProductRepository;
import com.skillstorm.project1.repositories.WarehouseRepository;
import java.util.List;

@Service
public class InventoryService {

    /**
     * Inventory model with some extra features that can 
     * be implemented later the findbyid methods for
     * product and warehouse
     */
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

    public InventoryModel addInventory(InventoryRequest req) {
        ProductModel product = productRepo.findById(req.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found with id=" + req.getProductId()));

        WarehouseModel warehouse = warehouseRepo.findById(req.getWarehouseId())
                .orElseThrow(() -> new RuntimeException("Warehouse not found with id=" + req.getWarehouseId()));

        if (!warehouse.getIsActive()) {
            throw new RuntimeException("Warehouse is not active");
        }

        InventoryModel inventory = new InventoryModel();
        inventory.setProduct(product);
        inventory.setWarehouse(warehouse);
        inventory.setQuantity(req.getQuantity());

        return inventoryRepo.save(inventory);
    }

    public List<InventoryModel> findByWarehouse_Id(Integer warehouseId) {
        return inventoryRepo.findByWarehouse_Id(warehouseId);
    }

    public List<InventoryModel> findByProduct_Id(Integer productId) {
        return inventoryRepo.findByProduct_Id(productId);
    }

    public void deleteInventory(Integer id) {
        if (!inventoryRepo.existsById(id)) {
            throw new RuntimeException("Inventory not found with id=" + id);
        }
        inventoryRepo.deleteById(id);
    }

    public InventoryModel updateInventory(Integer id, InventoryUpdateRequest req) {
        InventoryModel inventory = inventoryRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Inventory not found with id=" + id));

        if (req.getQuantity() != null) {
            inventory.setQuantity(req.getQuantity());
        }

        return inventoryRepo.save(inventory);
    }
}
