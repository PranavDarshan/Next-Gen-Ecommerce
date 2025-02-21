package com.example.prodBackend.Repo;

import com.example.prodBackend.Model.Brand;
import org.springframework.data.jpa.repository.JpaRepository;

public interface brandRepo extends JpaRepository<Brand, Integer> {
    Brand findByBrandName(String brandName);
}
