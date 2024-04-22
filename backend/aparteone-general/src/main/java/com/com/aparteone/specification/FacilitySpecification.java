package com.com.aparteone.specification;

import org.springframework.data.jpa.domain.Specification;

import com.com.aparteone.entity.Facility;
import com.com.aparteone.entity.FacilityRequest;
import com.com.aparteone.entity.FacilityTime;

public class FacilitySpecification {
    public static Specification<Facility> hasApartmentId(Integer apartmentId) {
        return (root, query, builer) -> builer.equal(root.get("apartmentId"), apartmentId);
    }

    public static Specification<Facility> isActive(Boolean isActive) {
        return (root, query, builer) -> builer.equal(root.get("isActive"), isActive);
    }

    public static Specification<Facility> hasId(Integer id) {
        return (root, query, builer) -> builer.equal(root.get("id"), id);
    }

    public static Specification<FacilityTime> hasFacilityId(Integer facilityId) {
        return (root, query, builer) -> builer.equal(root.get("facilityId"), facilityId);
    }

    public static Specification<FacilityTime> hasFacilityTimeId(Integer id) {
        return (root, query, builer) -> builer.equal(root.get("id"), id);
    }

    public static Specification<FacilityRequest> hasFacilityRequestId(Integer id) {
        return (root, query, builer) -> builer.equal(root.get("id"), id);
    }

    public static Specification<FacilityRequest> hasResidentId(Integer residentId) {
        return (root, query, builer) -> builer.equal(root.get("residentId"), residentId);
    }

    public static Specification<FacilityRequest> hasStatus(String status) {
        return (root, query, builer) -> builer.equal(root.get("status"), status);
    }
}
