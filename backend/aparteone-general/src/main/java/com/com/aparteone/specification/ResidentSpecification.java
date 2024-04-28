package com.com.aparteone.specification;

import org.springframework.data.jpa.domain.Specification;

import com.com.aparteone.entity.Resident;

public class ResidentSpecification {
    public static Specification<Resident> hasApartmentId(Integer apartmentId) {
        return (root, query, builder) -> builder.equal(root.get("apartmentId"), apartmentId);
    }

    public static Specification<Resident> hasName(String name) {
        return (root, query, builder) -> builder.like(builder.lower(root.get("name")), "%" + name.toLowerCase() + "%");
    }

    public static Specification<Resident> isActive(Boolean isActive) {
        return (root, query, builder) -> builder.equal(root.get("isActive"), isActive);
    }

    public static Specification<Resident> isApproved(Boolean isApproved) {
        return (root, query, builder) -> builder.equal(root.get("isApproved"), isApproved);
    }
}
