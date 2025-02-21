package com.example.prodBackend.Model;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class customers {
    @Id
    private int customerId;
    private String address;

    public int getCustomerId() {
        return customerId;
    }

    public String getAddress() {
        return address;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public String getCustomerName() {
        return customerName;
    }

    private String email;
    private String password;

    public void setCustomerId(int customerId) {
        this.customerId = customerId;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setCustomerName(String name) {
        this.customerName = customerName;
    }

    private String customerName;
}
