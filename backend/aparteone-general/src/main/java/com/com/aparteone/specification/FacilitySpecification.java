package com.com.aparteone.specification;

import org.springframework.data.jpa.domain.Specification;

import com.com.aparteone.entity.Facility;

public class FacilitySpecification {
    public static Specification<Facility> hasApartmentId(Integer apartmentId) {
        return (root, query, builer) -> builer.equal(root.get("apartmentId"), apartmentId);
    }

    public static Specification<Facility> isActive(Boolean isActive) {
        return (root, query, builer) -> builer.equal(root.get("isActive"), isActive);
    }
}
