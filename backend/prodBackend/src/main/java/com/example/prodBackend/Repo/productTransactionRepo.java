package com.example.prodBackend.Repo;

import com.example.prodBackend.Model.productTransaction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface productTransactionRepo extends JpaRepository<productTransaction, Integer> {
}
