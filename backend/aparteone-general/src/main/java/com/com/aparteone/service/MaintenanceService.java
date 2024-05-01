

package com.com.aparteone.service;

import com.com.aparteone.dto.base.PageResponse;
import com.com.aparteone.dto.request.MaintenanceReserveRequest;
import com.com.aparteone.dto.request.category.MaintenanceCategoryRequest;
import com.com.aparteone.dto.response.MaintenanceRequestResponse;
import com.com.aparteone.dto.response.category.MaintenanceCategoryResponse;
import com.com.aparteone.entity.Maintenance;
import com.com.aparteone.entity.MaintenanceRequest;

public interface MaintenanceService {
    // Maintenance - Category
    public PageResponse<MaintenanceCategoryResponse> getMaintenanceListByApartmentId(int page, int size, String sortBy, String sortDir, Boolean isActive, Integer apartmentId);
    public Maintenance addMaintenance(MaintenanceCategoryRequest maintenanceCategoryRequest);
    public Maintenance updateMaintenanceIsActive(Integer maintenanceId, Boolean isActive);

    // Maintenance Request
    public PageResponse<MaintenanceRequestResponse> getMaintenanceRequestListByApartmentId(int page, int size, String sortBy, String sortDir, String status, Integer apartmentId, String search);
    public PageResponse<MaintenanceRequestResponse> getMaintenanceRequestListByResidentId(int page, int size, String sortBy, String sortDir, String status, Integer residentId, String search);
    public MaintenanceRequestResponse getMaintenanceRequestById(Integer maintenanceRequestId);
    public MaintenanceRequest addMaintenanceRequest(MaintenanceReserveRequest request);
    public MaintenanceRequest updateMaintenanceRequestStatus(Integer maintenanceRequestId, String status, String remarks);

    public Integer countMaintenanceRequestByResidentId(Integer residentId);
}
