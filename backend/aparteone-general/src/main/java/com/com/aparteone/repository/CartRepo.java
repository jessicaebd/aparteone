package com.com.aparteone.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.com.aparteone.entity.Cart;

@Repository
public interface CartRepo extends JpaRepository<Cart, Integer> {
    public List<Cart> findByResidentId(Integer residentId);
    public List<Cart> findByResidentIdAndMerchantId(Integer residentId, Integer merchantId);
}