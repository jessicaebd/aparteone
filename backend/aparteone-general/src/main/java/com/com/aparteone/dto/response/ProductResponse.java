
package com.com.aparteone.dto.response;

import com.com.aparteone.entity.Product;
import com.com.aparteone.entity.general.Merchant;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
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
