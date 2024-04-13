package com.com.aparteone.specification;

import org.springframework.data.jpa.domain.Specification;

import com.com.aparteone.constant.AparteoneConstant;
import com.com.aparteone.entity.FacilityRequest;

public class FacilityRequestSpecification {
    public static Specification<FacilityRequest> hasResidentId(Integer residentId) {
        return (root, query, builer) -> builer.equal(root.get("residentId"), residentId);
    }

    public static Specification<FacilityRequest> hasStatus(String status) {
        return (root, query, builer) -> builer.equal(root.get("status"), status);
    }

    public static Specification<FacilityRequest> isRequested() {
        return (root, query, builer) -> builer.equal(root.get("status"), AparteoneConstant.STATUS_REQUESTED);
    }

    public static Specification<FacilityRequest> isCompleted() {
        return (root, query, builer) -> builer.equal(root.get("status"), AparteoneConstant.STATUS_COMPLETED);
    }

    public static Specification<FacilityRequest> isCancelled() {
        return (root, query, builer) -> builer.equal(root.get("status"), AparteoneConstant.STATUS_CANCELLED);
    }
}
