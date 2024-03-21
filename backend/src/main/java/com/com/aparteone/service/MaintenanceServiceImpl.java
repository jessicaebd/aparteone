package com.com.aparteone.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.com.aparteone.entity.Maintenance;
import com.com.aparteone.entity.MaintenanceRequest;
import com.com.aparteone.repository.MaintenanceRepo;
import com.com.aparteone.repository.MaintenanceRequestRepo;

@Service
public class MaintenanceServiceImpl implements MaintenanceService {

    @Autowired
    private MaintenanceRepo maintenanceRepo;

    @Autowired
    private MaintenanceRequestRepo maintenanceRequestRepo;

    @Override
    public List<Maintenance> getAllMaintenance(Integer apartmentId) {
        return maintenanceRepo.findByApartmentId(apartmentId);
    }

    @Override
    public List<MaintenanceRequest> getMaintenanceRequestList(Integer residentId, Integer maintenanceId) {
        return maintenanceRequestRepo.findByResidentIdAndMaintenanceId(residentId, maintenanceId);
    }
    
}
