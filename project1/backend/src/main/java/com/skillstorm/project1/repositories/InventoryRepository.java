package com.skillstorm.project1.repositories;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.skillstorm.project1.models.InventoryModel;


// Jpa repo for inventory
@Repository
public interface InventoryRepository extends JpaRepository<InventoryModel, Integer> {
    public List<InventoryModel> findByWarehouse_Id(Integer id);
    public List<InventoryModel> findByProduct_Id(Integer id);
}
