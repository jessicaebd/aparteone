package com.com.aparteone.specification;

import org.springframework.data.jpa.domain.Specification;

import com.com.aparteone.entity.MaintenanceRequest;

public class MaintenanceRequestSpecification {
    public static Specification<MaintenanceRequest> hasId(String id) {
        return (root, query, builer) -> builer.equal(root.get("id"), Integer.parseInt(id));
    }

    public static Specification<MaintenanceRequest> hasResidentId(Integer residentId) {
        return (root, query, builer) -> builer.equal(root.get("residentId"), residentId);
    }

    public static Specification<MaintenanceRequest> hasApartmentId(Integer apartmentId) {
        return (root, query, builer) -> builer.equal(root.get("apartmentId"), apartmentId);
    }

    public static Specification<MaintenanceRequest> hasStatus(String status) {
        return (root, query, builer) -> builer.equal(root.get("status"), status);
    }
}
