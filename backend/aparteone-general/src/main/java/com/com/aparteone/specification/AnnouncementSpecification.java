package com.com.aparteone.specification;

import java.util.Date;

import org.springframework.data.jpa.domain.Specification;

import com.com.aparteone.entity.Announcement;

public class AnnouncementSpecification {
    public static Specification<Announcement> hasApartmentId(Integer apartmentId) {
        return (root, query, builer) -> builer.equal(root.get("apartmentId"), apartmentId);
    }

    public static Specification<Announcement> isStarted(Date date) {
        return (root, query, builer) -> builer.lessThan(root.<Date>get("startDate"), date);
    }

    public static Specification<Announcement> isActive(Date date) {
        return (root, query, builer) -> builer.greaterThan(root.<Date>get("endDate"), date);
    }

    public static Specification<Announcement> isInactive(Date date) {
        return (root, query, builer) -> builer.lessThan(root.<Date>get("endDate"), date);
    }
}
