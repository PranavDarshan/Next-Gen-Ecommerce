package com.example.prodBackend.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Automatically increments the ID
    private long productId;

    private String productName;

    private int stock;

    private double price;

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getNutritionalInformation() {
        return nutritionalInformation;
    }

    public void setNutritonalInformation(String nutritionalInformation) {
        this.nutritionalInformation = nutritionalInformation;
    }

    private String category;
    private String nutritionalInformation;
    private String description;

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @ManyToOne
    @JoinColumn(name = "brand_id", nullable = false)
    private Brand brand; // Foreign key relationship to Brand

    // Constructors
    public Product() {
    }

    public Product(long productId, String productName, int stock, double price, Brand brand) {
        this.productId = productId;
        this.productName = productName;
        this.stock = stock;
        this.price = price;
        this.brand = brand;
    }

    // Getters and Setters
    public long getProductId() {
        return productId;
    }

    public void setProductId(long productId) {
        this.productId = productId; }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public int getStock() {
        return stock;
    }

    public void setStock(int stock) {
        this.stock = stock;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public Brand getBrand() {
        return brand;
    }

    public void setBrand(Brand brand) {
        this.brand = brand;
    }
}
