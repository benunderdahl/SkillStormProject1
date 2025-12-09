package com.skillstorm.project1.controllers;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.skillstorm.project1.models.ProductModel;
import com.skillstorm.project1.services.ProductService;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService service;

    public ProductController(ProductService service) {
        this.service = service;
    }

    @GetMapping()
    List<ProductModel> getAllProducts() {
        return service.getAllProducts();
    }

    @PostMapping()
    ProductModel createProduct(@RequestBody ProductModel product) {
        return service.createProduct(product);
    }

}