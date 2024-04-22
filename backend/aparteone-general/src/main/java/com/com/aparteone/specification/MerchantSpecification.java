package com.com.aparteone.specification;

import org.springframework.data.jpa.domain.Specification;

import com.com.aparteone.entity.Merchant;

public class MerchantSpecification {
    public static Specification<Merchant> hasApartmentId(Integer apartmentId) {
        return (root, query, builder) -> builder.equal(root.get("apartmentId"), apartmentId);
    }

    public static Specification<Merchant> hasName(String name) {
        return (root, query, builder) -> builder.like(builder.lower(root.get("name")), "%" + name.toLowerCase() + "%");
    }

    public static Specification<Merchant> isActive(Boolean isActive) {
        return (root, query, builder) -> builder.equal(root.get("isActive"), isActive);
    }

    public static Specification<Merchant> isApproved(Boolean isApproved) {
        return (root, query, builder) -> builder.equal(root.get("isApproved"), isApproved);
    }
}
