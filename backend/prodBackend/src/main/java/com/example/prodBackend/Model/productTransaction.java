package com.example.prodBackend.Model;

import jakarta.persistence.*;

@IdClass(ProductTransactionclass.class)
@Entity
public class productTransaction {

    private int quantity;

    private double unitPrice;

    // The foreign key reference to the Transaction entity

    @Id
    @JoinColumn(name = "transaction_id")
    private int transactionId;

    @Id
    @JoinColumn(name = "productId")
    private int productId;


    // Constructors
    public productTransaction() {
    }

    public productTransaction(int quantity, double unitPrice, int transactionId, int productId) {
        this.quantity = quantity;
        this.unitPrice = unitPrice;
        this.transactionId = transactionId;
        this.productId = productId;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public double getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(double unitPrice) {
        this.unitPrice = unitPrice;
    }

    public int getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(int transactionId) {
        this.transactionId = transactionId;
    }

    public int getProductId() {
        return productId;
    }

    public void setProductId(int productId) {
        this.productId = productId;
    }
}

