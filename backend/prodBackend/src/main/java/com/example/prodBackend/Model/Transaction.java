package com.example.prodBackend.Model;


import jakarta.persistence.*;

import java.sql.Time;
import java.sql.Date;

@Entity
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int transactionId;

    private Time tTime;

    private Date tDate;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private customers customer;

    public Transaction() {
    }

    @ManyToOne
    @JoinColumn(name = "store_id")
    private Store store;

    // Getters and Setters

    public int getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(int transactionId) {
        this.transactionId = transactionId;
    }

    public Time gettTime() {
        return tTime;
    }

    public void settTime(Time tTime) {
        this.tTime = tTime;
    }

    public Date gettDate() {
        return tDate;
    }

    public void settDate(Date tDate) {
        this.tDate = tDate;
    }

    public customers getCustomer() {
        return customer;
    }

    public void setCustomer(customers customer) {
        this.customer = customer;
    }

    public Store getStore() {
        return store;
    }

    public void setStore(Store store) {
        this.store = store;
    }
}
