package com.com.aparteone.repository.merchant;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.com.aparteone.entity.merchant.Cart;

@Repository
public interface CartRepo extends JpaRepository<Cart, Integer> {
    public List<Cart> findByResidentId(Integer residentId);
}