package com.com.aparteone.specification;

import org.springframework.data.jpa.domain.Specification;

import com.com.aparteone.entity.Apartment;
import com.com.aparteone.entity.ApartmentUnit;

public class ApartmentSpecification {
    public static Specification<Apartment> hasName(String name) {
        return (root, query, builder) -> builder.like(builder.lower(root.get("name")), "%" + name.toLowerCase() + "%");
    }

    public static Specification<Apartment> isActive(Boolean isActive) {
        return (root, query, builder) -> builder.equal(root.get("isActive"), isActive);
    }

    public static Specification<Apartment> isApproved(Boolean isApproved) {
        return (root, query, builder) -> builder.equal(root.get("isApproved"), isApproved);
    }

    public static Specification<Apartment> isNotApproved() {
        return (root, query, builder) -> builder.isNull(root.get("isApproved"));
    }

    public static Specification<ApartmentUnit> hasApartmentId(Integer apartmentId) {
        return (root, query, builder) -> builder.equal(root.get("apartmentId"), apartmentId);
    }

    public static Specification<ApartmentUnit> hasUnitNumber(String unitNumber) {
        return (root, query, builder) -> builder.like(builder.lower(root.get("unitNumber")), "%" + unitNumber.toLowerCase() + "%");
    }
}
