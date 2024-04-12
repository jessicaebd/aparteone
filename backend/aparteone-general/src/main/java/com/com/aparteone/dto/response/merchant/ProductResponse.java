package com.com.aparteone.dto.response.merchant;

import com.com.aparteone.entity.merchant.Merchant;
import com.com.aparteone.entity.merchant.Product;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@NoArgsConstructor
@AllArgsConstructor
public class ProductResponse {
    Integer merchantId;
    String merchantName;
    String image;
    Integer productId;
    String name;
    Double price;
    String description;
    Boolean isActive;

    public ProductResponse(Product product, Merchant merchant) {
        this.merchantId = merchant.getId();
        this.merchantName = merchant.getName();
        this.image = product.getImage();
        this.productId = product.getId();
        this.name = product.getName();
        this.price = product.getPrice();
        this.description = product.getDescription();
        this.isActive = product.getIsActive();
    }
}
