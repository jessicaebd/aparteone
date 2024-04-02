package com.com.aparteone.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.com.aparteone.constant.AparteoneConstant;
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
    public List<Maintenance> getMaintenanceListByApartmentId(Integer apartmentId) {
        List<Maintenance> maintenances = maintenanceRepo.findByApartmentId(apartmentId);
        return maintenances;
    }

    @Override
    public Maintenance insertMaintenance(Maintenance maintenance) {
        return maintenanceRepo.save(maintenance);
    }

    @Override
    public Maintenance updateMaintenanceIsActive(Integer maintenanceId, Boolean isActive) {
        Maintenance maintenance = maintenanceRepo.findById(maintenanceId).get();
        maintenance.setIsActive(isActive);
        return maintenanceRepo.save(maintenance);
    }

    @Override
    public List<MaintenanceRequest> getMaintenanceRequestListByResidentId(Integer residentId) {
        List<MaintenanceRequest> maintenanceRequests = maintenanceRequestRepo.findByResidentId(residentId);
        return maintenanceRequests;
    }

    @Override
    public List<MaintenanceRequest> getMaintenanceRequestListByApartmentId(Integer apartmentId) {
        List<MaintenanceRequest> maintenanceRequests = maintenanceRequestRepo.findByApartmentId(apartmentId);
        return maintenanceRequests;
    }

    @Override
    public MaintenanceRequest getMaintenanceRequestById(Integer maintenanceRequestId) {
        MaintenanceRequest maintenanceRequest = maintenanceRequestRepo.findById(maintenanceRequestId).get();
        return maintenanceRequest;
    }

    @Override
    public MaintenanceRequest insertMaintenanceRequest(MaintenanceRequest maintenanceRequest) {
        return maintenanceRequestRepo.save(maintenanceRequest);
    }

    @Override
    public MaintenanceRequest updateMaintenanceRequestStatusById(Integer maintenanceRequestId, String status, String remarks) {
        MaintenanceRequest maintenanceRequest = maintenanceRequestRepo.findById(maintenanceRequestId).get();
        if (status.equals(AparteoneConstant.STATUS_COMPLETED)) {
            maintenanceRequest.setStatus(status);
            maintenanceRequest.setCompletedDate(new Date());
        } else if (status.equals(AparteoneConstant.STATUS_CANCELLED)) {
            maintenanceRequest.setStatus(status);
            maintenanceRequest.setCancelledDate(new Date());
        } else if (status.equals(AparteoneConstant.STATUS_ASSIGNED)) {
            maintenanceRequest.setStatus(status);
            maintenanceRequest.setAssignedTo(remarks);
            maintenanceRequest.setAssignedDate(new Date());
        }
        return maintenanceRequestRepo.save(maintenanceRequest);
    }

}
