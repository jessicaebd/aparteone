package com.com.aparteone.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import com.com.aparteone.entity.Maintenance;

@Repository
public interface MaintenanceRepo extends JpaRepository<Maintenance, Integer>, JpaSpecificationExecutor<Maintenance> {
    public Page<Maintenance> findByApartmentId(Integer apartmentId, Pageable pageable);
}
