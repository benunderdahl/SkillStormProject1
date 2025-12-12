package com.skillstorm.project1.repositories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.skillstorm.project1.models.WarehouseModel;

// standard jpa repo
@Repository
public interface WarehouseRepository extends JpaRepository<WarehouseModel, Integer>{}
