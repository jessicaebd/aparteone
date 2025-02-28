package com.com.aparteone.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import com.com.aparteone.entity.ApartmentUnit;

@Repository
public interface ApartmentUnitRepo extends JpaRepository<ApartmentUnit, Integer>, JpaSpecificationExecutor<ApartmentUnit> {
    
}