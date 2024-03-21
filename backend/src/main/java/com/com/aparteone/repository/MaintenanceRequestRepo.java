package com.com.aparteone.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.com.aparteone.entity.MaintenanceRequest;

@Repository
public interface MaintenanceRequestRepo extends JpaRepository<MaintenanceRequest, Integer> {
    public List<MaintenanceRequest> findByResidentIdAndMaintenanceId(Integer residentId, Integer maintenanceId);
}
