package com.com.aparteone.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.com.aparteone.entity.ApartmentUnit;

@Repository
public interface ApartmentUnitRepo extends JpaRepository<ApartmentUnit, Integer> {
    public List<ApartmentUnit> findByApartmentId(Integer apartmentId);
}