package com.skillstorm.project1.services;
import java.time.LocalDateTime;
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

    // Much like the other methods we are setting the fields passed in through
    // the method and using setters to update and save in the db
    public ProductModel updateProduct(Integer id, ProductModel updated) {
    return repo.findById(id)
            .map(existing -> {
                existing.setName(updated.getName());
                existing.setDescription(updated.getDescription());
                existing.setCategory(updated.getCategory());
                existing.setUpdatedAt(LocalDateTime.now());
                return repo.save(existing);
            })
            .orElseThrow(() -> new RuntimeException("Product not found: " + id));
    }

    public void deleteProduct(Integer id) {
        repo.deleteById(id);
    }
}
