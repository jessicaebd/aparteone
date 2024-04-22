package com.com.aparteone.specification;

import org.springframework.data.jpa.domain.Specification;

import com.com.aparteone.entity.Mailbox;
import com.com.aparteone.entity.MailboxDetail;

public class MailboxSpecification {
    public static Specification<Mailbox> hasApartmentId(Integer apartmentId) {
        return (root, query, builer) -> builer.equal(root.get("apartmentId"), apartmentId);
    }

    public static Specification<Mailbox> isActive(Boolean isActive) {
        return (root, query, builer) -> builer.equal(root.get("isActive"), isActive);
    }

    public static Specification<MailboxDetail> hasId(Integer id) {
        return (root, query, builer) -> builer.equal(root.get("id"), id);
    }

    public static Specification<MailboxDetail> hasMailboxId(Integer mailboxId) {
        return (root, query, builer) -> builer.equal(root.get("mailboxId"), mailboxId);
    }

    public static Specification<MailboxDetail> hasResidentId(Integer residentId) {
        return (root, query, builer) -> builer.equal(root.get("residentId"), residentId);
    }

    public static Specification<MailboxDetail> hasStatus(String status) {
        return (root, query, builer) -> builer.equal(root.get("status"), status);
    }
}
