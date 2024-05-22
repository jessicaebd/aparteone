package com.com.aparteone.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.com.aparteone.entity.Payment;

@Repository
public interface PaymentRepo extends JpaRepository<Payment, Integer> {
    
}