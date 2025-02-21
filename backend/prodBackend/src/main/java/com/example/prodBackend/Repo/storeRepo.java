package com.example.prodBackend.Repo;

import com.example.prodBackend.Model.Store;
import org.springframework.data.jpa.repository.JpaRepository;

public interface storeRepo extends JpaRepository<Store, Integer> {
    Store findByStoreId(Long storeId);
}
