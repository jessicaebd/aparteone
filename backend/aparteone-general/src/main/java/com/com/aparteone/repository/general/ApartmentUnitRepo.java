package com.com.aparteone.repository.general;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.com.aparteone.entity.general.ApartmentUnit;

@Repository
public interface ApartmentUnitRepo extends JpaRepository<ApartmentUnit, Integer> {
    public Page<ApartmentUnit> findByApartmentId(Integer apartmentId, Pageable pageable);
}