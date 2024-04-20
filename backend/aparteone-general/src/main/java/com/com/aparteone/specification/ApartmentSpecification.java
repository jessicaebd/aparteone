package com.com.aparteone.specification;

import org.springframework.data.jpa.domain.Specification;

import com.com.aparteone.entity.general.Apartment;

public class ApartmentSpecification {
    public static Specification<Apartment> isActive(Boolean isActive) {
        return (root, query, builer) -> builer.equal(root.get("isActive"), isActive);
    }

    public static Specification<Apartment> isApproved(Boolean isApproved) {
        return (root, query, builer) -> builer.equal(root.get("isApproved"), isApproved);
    }
}
