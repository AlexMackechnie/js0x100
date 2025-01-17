package org.example.dto;

import java.math.BigDecimal;

public class ProductDto {
    private String category;
    private BigDecimal price;
    private boolean stocked;
    private String name;

    public ProductDto(String category, BigDecimal price, boolean stocked, String name) {
        this.category = category;
        this.price = price;
        this.stocked = stocked;
        this.name = name;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public boolean isStocked() {
        return stocked;
    }

    public void setStocked(boolean stocked) {
        this.stocked = stocked;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
