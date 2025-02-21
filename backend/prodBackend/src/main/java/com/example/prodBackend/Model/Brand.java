package com.example.prodBackend.Model;


import jakarta.persistence.*;

@Entity
public class Brand {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int brandId;

    @Column(length = 100)
    private String brandName;

    @Column(length = 255)
    private String brandDescription = "No description available";

    private int brandFoundationYear;

    @Column(length = 100)
    private String brandCountry;


    // Getters and Setters

    public int getBrandId() {
        return brandId;
    }

    public void setBrandId(int brandId) {
        this.brandId = brandId;
    }

    public String getBrandName() {
        return brandName;
    }

    public void setBrandName(String brandName) {
        this.brandName = brandName;
    }

    public String getBrandDescription() {
        return brandDescription;
    }

    public void setBrandDescription(String brandDescription) {
        this.brandDescription = brandDescription;
    }

    public int getBrandFoundationYear() {
        return brandFoundationYear;
    }

    public void setBrandFoundationYear(int brandFoundationYear) {
        this.brandFoundationYear = brandFoundationYear;
    }


    public String getBrandCountry() {
        return brandCountry;
    }

    public void setBrandCountry(String brandCountry) {
        this.brandCountry = brandCountry;
    }


}
