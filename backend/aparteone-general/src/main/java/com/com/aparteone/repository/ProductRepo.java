package com.com.aparteone.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.com.aparteone.entity.Product;

@Repository
public interface ProductRepo extends JpaRepository<Product, Integer> {
    public Page<Product> findByMerchantId(Integer merchantId, Pageable pageable);
}