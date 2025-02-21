package com.example.prodBackend.Model;

import java.io.Serializable;
import java.util.Objects;

public class ProductTransactionclass implements Serializable {

    private int transactionId;
    private int productId;

    // Constructors
    public ProductTransactionclass() {}

    public ProductTransactionclass(int transactionId, int productId) {
        this.transactionId = transactionId;
        this.productId = productId;
    }

    // Getters and Setters
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ProductTransactionclass that = (ProductTransactionclass) o;
        return transactionId == that.transactionId && productId == that.productId;
    }

    @Override
    public int hashCode() {
        return Objects.hash(transactionId, productId);
    }
}
