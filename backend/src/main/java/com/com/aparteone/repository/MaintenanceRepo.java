package com.com.aparteone.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.com.aparteone.entity.Maintenance;

@Repository
public interface MaintenanceRepo extends JpaRepository<Maintenance, Integer> {
    public List<Maintenance> findByApartmentId(Integer apartmentId);
}
