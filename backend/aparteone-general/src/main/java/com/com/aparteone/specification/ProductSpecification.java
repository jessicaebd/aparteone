package com.com.aparteone.specification;

import org.springframework.data.jpa.domain.Specification;

import com.com.aparteone.entity.Product;

public class ProductSpecification {
    public static Specification<Product> hasMerchantId(Integer merchantId) {
        return (root, query, builder) -> builder.equal(root.get("merchantId"), merchantId);
    }

    public static Specification<Product> hasName(String name) {
        return (root, query, builder) -> builder.like(root.get("name"), "%" + name + "%");
    }
}
