package com.com.aparteone.service;

import java.util.List;

import com.com.aparteone.entity.Maintenance;
import com.com.aparteone.entity.MaintenanceRequest;

public interface MaintenanceService {
    public List<Maintenance> getMaintenanceListByApartmentId(Integer apartmentId);
    public Maintenance insertMaintenance(Maintenance maintenance);
    public Maintenance updateMaintenanceIsActive(Integer maintenanceId, Boolean isActive);

    public List<MaintenanceRequest> getMaintenanceRequestListByResidentId(Integer residentId);
    public List<MaintenanceRequest> getMaintenanceRequestListByApartmentId(Integer apartmentId);
    public MaintenanceRequest getMaintenanceRequestById(Integer maintenanceRequestId);
    public MaintenanceRequest insertMaintenanceRequest(MaintenanceRequest maintenanceRequest);
    public MaintenanceRequest updateMaintenanceRequestStatusById(Integer maintenanceRequestId, String status, String remarks);
}
