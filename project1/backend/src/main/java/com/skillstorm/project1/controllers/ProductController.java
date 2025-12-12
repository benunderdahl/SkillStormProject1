package com.skillstorm.project1.controllers;
import java.util.List;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RestController;
import com.skillstorm.project1.models.ProductModel;
import com.skillstorm.project1.services.ProductService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

// cross origin was needed to interact with the db from a different port
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService service;

    public ProductController(ProductService service) {
        this.service = service;
    }

    // loaded when the base route is called
    @GetMapping()
    List<ProductModel> getAllProducts() {
        return service.getAllProducts();
    }

    // i set this so that the base route will serve as the post route
    // to create a new product
    @PostMapping()
    ProductModel createProduct(@RequestBody ProductModel product) {
        return service.createProduct(product);
    }

    // grab the id in the path variable to update
    @PutMapping("/{id}")
    public ProductModel updateProduct(@PathVariable Integer id,
            @RequestBody ProductModel product) {
        return service.updateProduct(id, product);
    }

    // grab the id in the path variable to delete this product
    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable Integer id) {
        service.deleteProduct(id);
    }

}