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
import org.springframework.web.bind.annotation.RequestMethod;


@CrossOrigin(
    origins = "http://localhost:5173",
    allowedHeaders = "*",
    methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS }
)
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

     @PutMapping("/{id}")
    public ProductModel updateProduct(@PathVariable Integer id,
                                      @RequestBody ProductModel product) {
        return service.updateProduct(id, product);
    }

    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable Integer id) {
        service.deleteProduct(id);
    }

}