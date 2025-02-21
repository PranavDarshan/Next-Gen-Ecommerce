package com.example.prodBackend.Repo;


import com.example.prodBackend.Model.customers;
import org.springframework.data.jpa.repository.JpaRepository;

public interface customersRepo extends JpaRepository<customers, Integer> {
    customers findByCustomerId(long id);
}
