package com.com.aparteone.repository.general;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.com.aparteone.entity.general.Resident;

@Repository
public interface ResidentRepo extends JpaRepository<Resident, Integer>, JpaSpecificationExecutor<Resident> {
    @Query(value = "select r.id,r.apartment_unit_id,r.status,r.is_active,r.is_approved,r.created_date,r.modified_date from residents r " +
            "join apartment_units au on r.apartment_unit_id = au.id " +
            "where au.apartment_id = :apartmentId", nativeQuery = true)
    public Page<Resident> findByApartmentId(Integer apartmentId, Pageable pageable);

    @Query(value = "select r.id,r.apartment_unit_id,r.status,r.is_active,r.is_approved,r.created_date,r.modified_date from residents r " +
            "join apartment_units au on r.apartment_unit_id = au.id " +
            "where au.apartment_id = :apartmentId " +
            "and r.is_active = :isActive", nativeQuery = true)
    public Page<Resident> findByApartmentIdAndIsActive(Integer apartmentId, Boolean isActive, Pageable pageable);
}
