package com.com.aparteone.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.com.aparteone.dto.base.PageResponse;
import com.com.aparteone.dto.request.category.MaintenanceCategoryRequest;
import com.com.aparteone.dto.response.category.MaintenanceCategoryResponse;
import com.com.aparteone.entity.Maintenance;
import com.com.aparteone.service.MaintenanceService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/maintenance")
public class MaintenanceController {

    @Autowired
    private MaintenanceService maintenanceService;

    @PostMapping("/add-category")
    public ResponseEntity<Maintenance> insertMaintenance(@RequestBody MaintenanceCategoryRequest maintenance) {
        log.info("[Maintenance] Add Maintenance: {}", maintenance.toString());
        Maintenance newMaintenance = maintenanceService.addMaintenance(maintenance);
        return ResponseEntity.ok(newMaintenance);
    }

    @PostMapping("/update-status")
    public ResponseEntity<Maintenance> updateMaintenanceActiveStatus(
            @RequestParam Integer maintenanceId,
            @RequestParam Boolean isActive) {
        log.info("[Maintenance] Update Maintenance Status: maintenanceId-{} | isActive-{}", maintenanceId, isActive);
        Maintenance maintenance = maintenanceService.updateMaintenanceIsActive(maintenanceId, isActive);
        return ResponseEntity.ok(maintenance);
    }

    @GetMapping("")
    public ResponseEntity<PageResponse<MaintenanceCategoryResponse>> getMaintenanceCategoryList(
            @RequestParam(value = "page", required = false, defaultValue = "0") int page,
            @RequestParam(value = "size", required = false, defaultValue = "40") int size,
            @RequestParam(value = "sortBy", required = false, defaultValue = "id") String sortBy,
            @RequestParam(value = "sortDir", required = false, defaultValue = "DESC") String sortDir,
            @RequestParam(value = "isActive", required = false) Boolean isActive,
            @RequestParam Integer apartmentId) {
        log.info("[Maintenance] Get Maintenance Category List: apartmentId-{}", apartmentId);
        PageResponse<MaintenanceCategoryResponse> response = maintenanceService.getMaintenanceListByApartmentId(page, size, sortBy, sortDir, isActive, apartmentId);
        return ResponseEntity.ok(response);
    }

    // @GetMapping("/request/resident")
    // public ResponseEntity<PageResponse<MaintenanceRequestResponse>>
    // getMaintenanceRequestByResidentId(
    // @RequestParam(value = "page", required = false, defaultValue = "0") int page,
    // @RequestParam(value = "size", required = false, defaultValue = "40") int
    // size,
    // @RequestParam(value = "sortBy", required = false, defaultValue =
    // "createdDate") String sortBy,
    // @RequestParam(value = "sortDir", required = false, defaultValue = "desc")
    // String sortDir,
    // @RequestParam(value = "status", required = false) String status,
    // @RequestParam Integer residentId) {
    // log.info("[Maintenance] Get Maintenance Request List By Resident Id: {}",
    // residentId);

    // PageResponse<MaintenanceRequestResponse> response =
    // maintenanceService.getMaintenanceRequestListByResidentId(page,
    // size, sortBy, sortDir, status, residentId);
    // return ResponseEntity.ok(response);
    // }

    // @GetMapping("/request/apartment")
    // public ResponseEntity<PageResponse<MaintenanceRequestResponse>>
    // getMaintenanceRequestByApartmentId(
    // @RequestParam(value = "page", required = false, defaultValue = "0") int page,
    // @RequestParam(value = "size", required = false, defaultValue = "40") int
    // size,
    // @RequestParam(value = "sortBy", required = false, defaultValue =
    // "createdDate") String sortBy,
    // @RequestParam(value = "sortDir", required = false, defaultValue = "desc")
    // String sortDir,
    // @RequestParam(value = "status", required = false) String status,
    // @RequestParam Integer apartmentId) {
    // log.info("[Maintenance] Get Maintenance Request List By Apartment Id: {}",
    // apartmentId);

    // PageResponse<MaintenanceRequestResponse> response =
    // maintenanceService.getMaintenanceRequestListByApartmentId(page,
    // size, sortBy, sortDir, status, apartmentId);
    // return ResponseEntity.ok(response);
    // }

    // @GetMapping("/request/detail")
    // public ResponseEntity<MaintenanceRequestResponse>
    // getMaintenanceRequestById(@RequestParam Integer maintenanceRequestId) {
    // log.info("[Maintenance] Get Maintenance Request By Id: {}",
    // maintenanceRequestId);
    // MaintenanceRequestResponse maintenanceRequest =
    // maintenanceService.getMaintenanceRequestById(maintenanceRequestId);
    // return ResponseEntity.ok(maintenanceRequest);
    // }

    // @PostMapping("/request")
    // public ResponseEntity<MaintenanceCategoryRequest>
    // insertMaintenanceRequest(@RequestBody MaintenanceReserveRequest
    // maintenanceRequest) {
    // log.info("[Maintenance] Insert Maintenance Request: " +
    // maintenanceRequest.toString());
    // MaintenanceCategoryRequest newMaintenanceRequest =
    // maintenanceService.insertMaintenanceRequest(maintenanceRequest);
    // return ResponseEntity.ok(newMaintenanceRequest);
    // }

    // @PostMapping("/request/update")
    // public ResponseEntity<MaintenanceCategoryRequest>
    // updateMaintenanceRequestStatus(
    // @RequestParam Integer maintenanceRequestId,
    // @RequestParam String status,
    // @RequestParam String remarks) {
    // log.info("[Maintenance] Update Maintenance Request Status:
    // maintenanceRequestId-{} | status-{} | remarks-{}",
    // maintenanceRequestId, status, remarks);
    // MaintenanceCategoryRequest maintenanceRequest = maintenanceService
    // .updateMaintenanceRequestStatusById(maintenanceRequestId, status, remarks);
    // return ResponseEntity.ok(maintenanceRequest);
    // }

}