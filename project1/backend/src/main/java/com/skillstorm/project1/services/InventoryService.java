package com.skillstorm.project1.services;

import org.springframework.stereotype.Service;

import com.skillstorm.project1.repositories.InventoryRepository;

@Service
public class InventoryService {

    private final InventoryRepository repo;

    public InventoryService(InventoryRepository repo) {
        this.repo = repo;
    }
    
}
