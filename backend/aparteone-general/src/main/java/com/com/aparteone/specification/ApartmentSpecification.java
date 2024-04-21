package com.com.aparteone.specification;

import org.springframework.data.jpa.domain.Specification;

import com.com.aparteone.entity.Apartment;
import com.com.aparteone.entity.ApartmentUnit;

public class ApartmentSpecification {
    public static Specification<Apartment> isActive(Boolean isActive) {
        return (root, query, builer) -> builer.equal(root.get("isActive"), isActive);
    }

    public static Specification<Apartment> isApproved(Boolean isApproved) {
        return (root, query, builer) -> builer.equal(root.get("isApproved"), isApproved);
    }

    public static Specification<Apartment> hasName(String name) {
        return (root, query, builer) -> builer.like(root.get("name"), "%" + name + "%");
    }

    public static Specification<ApartmentUnit> hasApartmentId(Integer apartmentId) {
        return (root, query, builer) -> builer.equal(root.get("apartmentId"), apartmentId);
    }

    public static Specification<ApartmentUnit> hasUnitNumber(String unitNumber) {
        return (root, query, builer) -> builer.like(root.get("unitNumber"), "%" + unitNumber + "%");
    }
}
