package com.skillstorm.project1.services;
import java.util.List;
import org.springframework.stereotype.Service;
import com.skillstorm.project1.models.ProductModel;
import com.skillstorm.project1.repositories.ProductRepository;


@Service
public class ProductService {
    
    private final ProductRepository repo;

    public ProductService(ProductRepository repo) {
        this.repo = repo;
    }

    public List<ProductModel> getAllProducts() {
        return repo.findAll();
    }

    public ProductModel createProduct(ProductModel product) {
        
        return repo.save(product);
    }
}
