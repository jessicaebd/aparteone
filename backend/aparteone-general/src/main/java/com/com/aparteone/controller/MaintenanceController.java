package com.com.aparteone.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.com.aparteone.dto.base.PageResponse;
import com.com.aparteone.dto.request.MaintenanceReserveRequest;
import com.com.aparteone.dto.request.category.MaintenanceCategoryRequest;
import com.com.aparteone.dto.response.MaintenanceRequestResponse;
import com.com.aparteone.dto.response.category.MaintenanceCategoryResponse;
import com.com.aparteone.entity.Maintenance;
import com.com.aparteone.entity.MaintenanceRequest;
import com.com.aparteone.service.MaintenanceService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/maintenance")
public class MaintenanceController {

    @Autowired
    private MaintenanceService maintenanceService;

    @GetMapping("")
    public ResponseEntity<PageResponse<MaintenanceCategoryResponse>> getMaintenanceCategoryList(
            @RequestParam(value = "page", required = false, defaultValue = "0") int page,
            @RequestParam(value = "size", required = false, defaultValue = "40") int size,
            @RequestParam(value = "sortBy", required = false, defaultValue = "category") String sortBy,
            @RequestParam(value = "sortDir", required = false, defaultValue = "ASC") String sortDir,
            @RequestParam(value = "isActive", required = false) Boolean isActive,
            @RequestParam Integer apartmentId) {
        log.info("[Maintenance] Get Maintenance Category List: apartmentId-{}", apartmentId);
        PageResponse<MaintenanceCategoryResponse> response = maintenanceService.getMaintenanceListByApartmentId(page, size, sortBy, sortDir, isActive, apartmentId);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/add")
    public ResponseEntity<Maintenance> addMaintenanceCategory(@RequestBody MaintenanceCategoryRequest maintenanceCategoryRequest) {
        log.info("[Maintenance] Add Maintenance Category: {}", maintenanceCategoryRequest.toString());
        Maintenance maintenance = maintenanceService.addMaintenance(maintenanceCategoryRequest);
        return ResponseEntity.ok(maintenance);
    }

    @PostMapping("/update")
    public ResponseEntity<Maintenance> updateMaintenanceCategoryStatus(
            @RequestParam Integer maintenanceId,
            @RequestParam Boolean isActive) {
        log.info("[Maintenance] Update Maintenance Category Status: maintenanceId-{} | isActive-{}", maintenanceId, isActive);
        Maintenance maintenance = maintenanceService.updateMaintenanceIsActive(maintenanceId, isActive);
        return ResponseEntity.ok(maintenance);
    }

    @GetMapping("/request/apartment")
    public ResponseEntity<PageResponse<MaintenanceRequestResponse>> getApartmentMaintenanceRequest(
            @RequestParam(value = "page", required = false, defaultValue = "0") int page,
            @RequestParam(value = "size", required = false, defaultValue = "10") int size,
            @RequestParam(value = "sortBy", required = false, defaultValue = "id") String sortBy,
            @RequestParam(value = "sortDir", required = false, defaultValue = "ASC") String sortDir,
            @RequestParam(value = "status", required = false) String status,
            @RequestParam(value = "search", required = false) String search,
            @RequestParam Integer apartmentId) {
        log.info("[Maintenance]  Get Maintenance Request - Apartment: apartmentId-{} | status-{} | search-{}", apartmentId, status, search);
        PageResponse<MaintenanceRequestResponse> response = maintenanceService.getMaintenanceRequestListByApartmentId(page, size, sortBy, sortDir, status, apartmentId, search);
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/request/resident")
    public ResponseEntity<PageResponse<MaintenanceRequestResponse>> getResidentMaintenanceRequest(
            @RequestParam(value = "page", required = false, defaultValue = "0") int page,
            @RequestParam(value = "size", required = false, defaultValue = "10") int size,
            @RequestParam(value = "sortBy", required = false, defaultValue = "id") String sortBy,
            @RequestParam(value = "sortDir", required = false, defaultValue = "ASC") String sortDir,
            @RequestParam(value = "status", required = false) String status,
            @RequestParam(value = "search", required = false) String search,
            @RequestParam Integer residentId) {
        log.info("[Maintenance] Get Maintenance Request - Resident: residentId-{} | status-{} | search-{}", residentId, status, search);
        PageResponse<MaintenanceRequestResponse> response = maintenanceService.getMaintenanceRequestListByResidentId(page, size, sortBy, sortDir, status, residentId, search);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/request/detail")
    public ResponseEntity<MaintenanceRequestResponse> getMaintenanceRequestDetail(@RequestParam Integer maintenanceRequestId) {
        log.info("[Maintenance] Get Maintenance Request Detail: maintenanceRequestId-{}", maintenanceRequestId);
        MaintenanceRequestResponse response = maintenanceService.getMaintenanceRequestById(maintenanceRequestId);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/request/add")
    public ResponseEntity<MaintenanceRequest> addMaintenanceRequest(@RequestBody MaintenanceReserveRequest maintenanceReserveRequest) {
        log.info("[Maintenance] Add Maintenance Request: " + maintenanceReserveRequest.toString());
        MaintenanceRequest maintenanceRequest = maintenanceService.addMaintenanceRequest(maintenanceReserveRequest);
        return ResponseEntity.ok(maintenanceRequest);
    }

    @PostMapping("/request/update")
    public ResponseEntity<MaintenanceRequest> updateMaintenanceRequestStatus(
            @RequestParam Integer maintenanceRequestId,
            @RequestParam String status,
            @RequestParam(required = false) String remarks) {
        log.info("[Maintenance] Update Maintenance Request: maintenanceRequestId-{} | status-{} | remarks-{}", maintenanceRequestId, status, remarks);
        MaintenanceRequest maintenanceRequest = maintenanceService.updateMaintenanceRequestStatus(maintenanceRequestId, status, remarks);
        return ResponseEntity.ok(maintenanceRequest);
    }

}