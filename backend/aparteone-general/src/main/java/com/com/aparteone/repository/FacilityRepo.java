package com.com.aparteone.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.com.aparteone.entity.Facility;

@Repository
public interface FacilityRepo extends JpaRepository<Facility, Integer> {
    public Page<Facility> findByApartmentId(Integer apartmentId, Pageable pageable);
}
