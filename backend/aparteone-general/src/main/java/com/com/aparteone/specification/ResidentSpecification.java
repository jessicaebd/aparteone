package com.com.aparteone.specification;

import org.springframework.data.jpa.domain.Specification;

import com.com.aparteone.entity.general.Resident;

public class ResidentSpecification {
    public static Specification<Resident> isActive(Boolean isActive) {
        return (root, query, builer) -> builer.equal(root.get("isActive"), isActive);
    }

    public static Specification<Resident> hasApartmentId(Integer apartmentId) {
        return (root, query, builer) -> builer.equal(root.get("apartmentId"), apartmentId);
    }
}
