package com.com.aparteone.repository.merchant;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import com.com.aparteone.entity.transaction.TransactionDetail;

@Repository
public interface TransactionDetailRepo extends JpaRepository<TransactionDetail, Integer>, JpaSpecificationExecutor<TransactionDetail> {
    public List<TransactionDetail> findByTransactionId(Integer transactionId);
}