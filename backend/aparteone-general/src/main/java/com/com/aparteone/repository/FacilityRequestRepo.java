package com.com.aparteone.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.com.aparteone.entity.FacilityRequest;

@Repository
public interface FacilityRequestRepo extends JpaRepository<FacilityRequest, Integer>, JpaSpecificationExecutor<FacilityRequest> {
    @Query(value = "select fr.id, fr.facility_time_id, fr.resident_id, fr.status, fr.created_date, fr.modified_date,fr.completed_date,fr.cancelled_date " +
            "from facility_requests fr join facility_times ft " +
            "on fr.facility_time_id = ft.id " +
            "join facilities f " +
            "on ft.facility_id = f.id " +
            "where f.apartment_id=:apartmentId", nativeQuery = true)
    public Page<FacilityRequest> findByApartmentId(Integer apartmentId, Pageable pageable);

    @Query(value = "select fr.id, fr.facility_time_id, fr.resident_id, fr.status, fr.created_date, fr.modified_date,fr.completed_date,fr.cancelled_date " +
            "from facility_requests fr join facility_times ft " +
            "on fr.facility_time_id = ft.id " +
            "join facilities f " +
            "on ft.facility_id = f.id " +
            "where f.apartment_id=:apartmentId " +
            "and fr.status = :status", nativeQuery = true)
    public Page<FacilityRequest> findByApartmentIdAndStatus(Integer apartmentId, String status, Pageable pageable);

}
