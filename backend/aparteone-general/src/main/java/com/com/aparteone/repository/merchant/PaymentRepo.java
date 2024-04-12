package com.com.aparteone.repository.merchant;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.com.aparteone.entity.transaction.Payment;

@Repository
public interface PaymentRepo extends JpaRepository<Payment, Integer> {
}