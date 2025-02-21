package com.example.prodBackend.DTO;

public class TransactionRequest {
    private Long storeId;
    private Long customerId;
    private Integer quantity;
    private Double unitPrice;

    private Long productId;

    // Getters and setters
    public Long getStoreId() { return storeId; }
    public void setStoreId(Long storeId) { this.storeId = storeId; }
    public Long getCustomerId() { return customerId; }
    public void setCustomerId(Long customerId) { this.customerId = customerId; }
    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }
    public Double getUnitPrice() { return unitPrice; }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public Long getProductId() {
        return productId;
    }

    public void setUnitPrice(Double unitPrice) { this.unitPrice = unitPrice; }
}
