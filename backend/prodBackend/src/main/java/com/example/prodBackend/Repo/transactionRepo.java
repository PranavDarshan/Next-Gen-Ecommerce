package com.example.prodBackend.Repo;

import com.example.prodBackend.Model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.sql.Time;

public interface transactionRepo extends JpaRepository<Transaction, Integer> {
    Transaction findByTTime(Time tTime);
}
