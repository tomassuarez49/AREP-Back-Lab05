package com.edu.eci.arep;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Property {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    private Long propertyId;
    private String address;
    private double price;
    private int size;
    private String description;

    protected Property() {}

    public Property(String address, double price, int size, String description) {
        this.address = address;
        this.price = price;
        this.size = size;
        this.description = description;
    }

    @Override
    public String toString() {
        return String.format(
                "Property[propertyId=%d, address='%s', description='%s', size=%d, price=%.2f]",
                propertyId, address, description, size, price);
    }

    public Long getPropertyId() {
        return propertyId;
    }

    public String getAddress() {
        return address;
    }

    public String getDescription() {
        return description;
    }

    public double getPrice() {
        return price;
    }

    public int getSize() {
        return size;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public void setSize(int size) {
        this.size = size;
    }
}
