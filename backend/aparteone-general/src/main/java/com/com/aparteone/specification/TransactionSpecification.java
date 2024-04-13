package com.com.aparteone.specification;

import org.springframework.data.jpa.domain.Specification;

import com.com.aparteone.entity.Transaction;

public class TransactionSpecification {
    public static Specification<Transaction> hasStatus(String status) {
        return (root, query, builer) -> builer.equal(root.get("status"), status);
    }

    public static Specification<Transaction> hasResidentId(Integer residentId) {
        return (root, query, builder) -> builder.equal(root.get("residentId"), residentId);
    }

    public static Specification<Transaction> hasMerchantId(Integer merchantId) {
        return (root, query, builder) -> builder.equal(root.get("merchantId"), merchantId);
    }
}
