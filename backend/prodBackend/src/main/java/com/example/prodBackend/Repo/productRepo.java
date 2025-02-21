package com.example.prodBackend.Repo;

import com.example.prodBackend.Model.Brand;
import com.example.prodBackend.Model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface productRepo extends JpaRepository<Product, Integer> {
    Product findByProductName(String productName);

}


