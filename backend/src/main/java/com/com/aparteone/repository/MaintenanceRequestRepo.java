package com.com.aparteone.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.com.aparteone.entity.MaintenanceRequest;

@Repository
public interface MaintenanceRequestRepo extends JpaRepository<MaintenanceRequest, Integer> {
    public List<MaintenanceRequest> findByResidentId(Integer residentId);
    @Query(value =  "select mr.id,mr.maintenance_id,mr.resident_id,mr.status,mr.assigned_to,mr.assigned_date,mr.completed_date,mr.cancelled_date,mr.created_date,mr.modified_date from maintenance_requests mr " +
            "join maintenances m on mr.maintenance_id = m.id " +
            "where m.apartment_id = :apartmentId", nativeQuery = true)
    public List<MaintenanceRequest> findByApartmentId(Integer apartmentId);
}
