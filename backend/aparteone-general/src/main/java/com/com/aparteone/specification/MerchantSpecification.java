package com.com.aparteone.specification;

import org.springframework.data.jpa.domain.Specification;

import com.com.aparteone.entity.general.Merchant;

public class MerchantSpecification {
    public static Specification<Merchant> hasCategory(String category) {
        return (root, query, builer) -> builer.equal(root.get("category"), category);
    }

    public static Specification<Merchant> hasApartmentId(Integer apartmentId) {
        return (root, query, builder) -> builder.equal(root.get("apartmentId"), apartmentId);
    }

    public static Specification<Merchant> search(String search) {
        return (root, query, builder) -> builder.like(root.get("name"), "%" + search.toLowerCase() + "%");
    }

    public static Specification<Merchant> isActive(Boolean isActive) {
        return (root, query, builder) -> builder.equal(root.get("isActive"), isActive);
    }

    public static Specification<Merchant> isApproved(Boolean isApproved) {
        return (root, query, builder) -> builder.equal(root.get("isApproved"), isApproved);
    }
}
