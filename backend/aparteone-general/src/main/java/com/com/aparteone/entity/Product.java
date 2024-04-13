package com.com.aparteone.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.com.aparteone.dto.request.ProductRequest;
import com.com.aparteone.entity.audit.AuditEntity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "products")
@EqualsAndHashCode(callSuper = false)
public class Product extends AuditEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Integer merchantId;
    private String image;
    private String name;
    private Double price;
    private String description;
    private Boolean isActive;

    public Product(ProductRequest productRequest) {
        this.merchantId = productRequest.getMerchantId();
        this.image = productRequest.getImage();
        this.name = productRequest.getName();
        this.price = productRequest.getPrice();
        this.description = productRequest.getDescription();
        if(productRequest.getIsActive() != null) {
            this.isActive = productRequest.getIsActive();
        }
    }
}
