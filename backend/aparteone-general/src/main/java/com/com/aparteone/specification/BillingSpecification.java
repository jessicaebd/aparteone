package com.com.aparteone.specification;

import org.springframework.data.jpa.domain.Specification;

import com.com.aparteone.entity.Billing;
import com.com.aparteone.entity.BillingDetail;

public class BillingSpecification {
    public static Specification<Billing> billingHasApartmentId(Integer apartmentId) {
        return (root, query, builder) -> builder.equal(root.get("apartmentId"), apartmentId);
    }

    public static Specification<Billing> billingIsActive(Boolean isActive) {
        return (root, query, builder) -> builder.equal(root.get("isActive"), isActive);
    }

    public static Specification<BillingDetail> billingDetailHasId(String id) {
        return (root, query, builder) -> builder.equal(root.get("id"), Integer.parseInt(id));
    }

    public static Specification<BillingDetail> billingDetailHasApartmentId(Integer apartmentId) {
        return (root, query, builder) -> builder.equal(root.get("apartmentId"), apartmentId);
    }

    public static Specification<BillingDetail> billingDetailHasResidentId(Integer residentId) {
        return (root, query, builder) -> builder.equal(root.get("residentId"), residentId);
    }

    public static Specification<BillingDetail> billingDetailHasStatus(String status) {
        return (root, query, builder) -> builder.equal(root.get("status"), status);
    } 
}
