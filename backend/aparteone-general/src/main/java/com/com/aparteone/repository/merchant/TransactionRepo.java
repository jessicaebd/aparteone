package com.com.aparteone.repository.merchant;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import com.com.aparteone.entity.transaction.Transaction;

@Repository
public interface TransactionRepo extends JpaRepository<Transaction, Integer>, JpaSpecificationExecutor<Transaction> {
    public Page<Transaction> findAll(Pageable pageable);
    public Page<Transaction> findByMerchantId(Integer merchantId, Specification<Transaction> spec, Pageable pageable);
}