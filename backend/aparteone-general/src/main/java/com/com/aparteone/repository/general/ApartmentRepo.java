package com.com.aparteone.repository.general;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import com.com.aparteone.entity.general.Apartment;

@Repository
public interface ApartmentRepo extends JpaRepository<Apartment, Integer>, JpaSpecificationExecutor<Apartment> {
    
}