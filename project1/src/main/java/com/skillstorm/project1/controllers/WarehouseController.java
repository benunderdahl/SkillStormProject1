package com.skillstorm.project1.controllers;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class WarehouseController {

    @GetMapping("/warehouse")
    String home() {
        return "Hello World";
    }
}
