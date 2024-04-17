

package com.com.aparteone.service;

import com.com.aparteone.dto.base.PageResponse;
import com.com.aparteone.dto.request.category.MaintenanceCategoryRequest;
import com.com.aparteone.dto.response.category.MaintenanceCategoryResponse;
import com.com.aparteone.entity.Maintenance;

public interface MaintenanceService {
    // Maintenance - Category
    public Maintenance addMaintenance(MaintenanceCategoryRequest maintenanceCategoryRequest);
    public Maintenance updateMaintenanceIsActive(Integer maintenanceId, Boolean isActive);
    public PageResponse<MaintenanceCategoryResponse> getMaintenanceListByApartmentId(int page, int size, String sortBy, String sortDir, Boolean isActive, Integer apartmentId);
    

    // Maintenance Request
    // public PageResponse<MaintenanceRequestResponse> getMaintenanceRequestListByResidentId(int page, int size, String sortBy, String sortDir, String status, Integer residentId);
    // public PageResponse<MaintenanceRequestResponse> getMaintenanceRequestListByApartmentId(int page, int size, String sortBy, String sortDir, String status, Integer apartmentId);
    // public MaintenanceRequestResponse getMaintenanceRequestById(Integer maintenanceRequestId);
    // public MaintenanceCategoryRequest insertMaintenanceRequest(MaintenanceReserveRequest request);
    // public MaintenanceCategoryRequest updateMaintenanceRequestStatusById(Integer maintenanceRequestId, String status, String remarks);
}
