package com.example.prodBackend.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Staff {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Automatically increments the ID
    private int staffId; // Primary key for staff

    private String staffName;
    private String roleName;
    private String email;
    private String password;

    @ManyToOne
    @JoinColumn(name = "store_id", nullable = false)
    private Store store; // Foreign key relation to Store

    // Constructors
    public Staff() {
    }

    public Staff(int staffId, String staffName, String roleName, String email, Store store, String password) {
        this.staffId = staffId;
        this.staffName = staffName;
        this.roleName = roleName;
        this.email = email;
        this.store = store;
        this.password = password;
    }

    // Getters and Setters
    public int getStaffId() {
        return staffId;
    }

    public void setStaffId(int staffId) {
        this.staffId = staffId;
    }

    public String getStaffName() {
        return staffName;
    }

    public void setStaffName(String staffName) {
        this.staffName = staffName;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Store getStore() {
        return store;
    }

    public void setStore(Store store) {
        this.store = store;
    }
}
