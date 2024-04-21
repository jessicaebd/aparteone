package com.com.aparteone.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import com.com.aparteone.entity.Merchant;

@Repository
public interface MerchantRepo extends JpaRepository<Merchant, Integer>, JpaSpecificationExecutor<Merchant> {
    public Page<Merchant> findByApartmentId(Integer apartmentId, Pageable pageable);
}