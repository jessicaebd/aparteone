package com.com.aparteone.service;

import com.com.aparteone.dto.general.PageDTO;
import com.com.aparteone.dto.request.MaintenanceCategoryRequest;
import com.com.aparteone.dto.request.MaintenanceReserveRequest;
import com.com.aparteone.dto.response.MaintenanceRequestResponse;
import com.com.aparteone.entity.Maintenance;
import com.com.aparteone.entity.MaintenanceRequest;

public interface MaintenanceService {
    // Maintenance
    public PageDTO<Maintenance> getMaintenanceListByApartmentId(int page, int size, Integer apartmentId);
    public Maintenance insertMaintenance(MaintenanceCategoryRequest request);
    public Maintenance updateMaintenanceIsActive(Integer maintenanceId, Boolean isActive);

    // Maintenance Request
    public PageDTO<MaintenanceRequestResponse> getMaintenanceRequestListByResidentId(int page, int size, String sortBy, String sortDir, Integer residentId);
    public PageDTO<MaintenanceRequestResponse> getMaintenanceRequestListByApartmentId(int page, int size, String sortBy, String sortDir, Integer apartmentId);
    public MaintenanceRequestResponse getMaintenanceRequestById(Integer maintenanceRequestId);
    public MaintenanceRequest insertMaintenanceRequest(MaintenanceReserveRequest request);
    public MaintenanceRequest updateMaintenanceRequestStatusById(Integer maintenanceRequestId, String status, String remarks);
}
