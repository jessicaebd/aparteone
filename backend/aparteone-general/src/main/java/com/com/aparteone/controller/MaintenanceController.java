package com.com.aparteone.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.com.aparteone.dto.general.PageDTO;
import com.com.aparteone.dto.request.CategoryRequest;
import com.com.aparteone.dto.request.MaintenanceReserveRequest;
import com.com.aparteone.dto.response.MaintenanceRequestResponse;
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
    public ResponseEntity<PageDTO<Maintenance>> getMaintenanceListByApartmentId(
            @RequestParam(value = "page", defaultValue = "0") Integer page,
            @RequestParam(value = "size", defaultValue = "10") Integer size,
            @RequestParam Integer apartmentId) {
        log.info("[Maintenance] Get Maintenance List By Apartment Id: {}", apartmentId);
        PageDTO<Maintenance> response = maintenanceService.getMaintenanceListByApartmentId(page, size, apartmentId);
        return ResponseEntity.ok(response);
    }

    @PostMapping("")
    public ResponseEntity<Maintenance> insertMaintenance(@RequestBody CategoryRequest maintenance) {
        log.info("[Maintenance] Insert Maintenance: " + maintenance.toString());
        Maintenance newMaintenance = maintenanceService.insertMaintenance(maintenance);
        return ResponseEntity.ok(newMaintenance);
    }

    @PutMapping("")
    public ResponseEntity<Maintenance> updateMaintenanceActiveStatus(@RequestParam Integer maintenanceId,
            @RequestParam Boolean isActive) {
        log.info("[Maintenance] Update Maintenance Status: maintenanceId-{} | isActive-{}", maintenanceId, isActive);
        Maintenance maintenance = maintenanceService.updateMaintenanceIsActive(maintenanceId, isActive);
        return ResponseEntity.ok(maintenance);
    }

    @GetMapping("/request/resident")
    public ResponseEntity<PageDTO<MaintenanceRequestResponse>> getMaintenanceRequestByResidentId(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size,
            @RequestParam(value = "sortBy", defaultValue = "createdDate") String sortBy,
            @RequestParam(value = "sortDir", defaultValue = "desc") String sortDir,
            @RequestParam Integer residentId) {
        log.info("[Maintenance] Get Maintenance Request List By Resident Id: {}", residentId);

        PageDTO<MaintenanceRequestResponse> response = maintenanceService.getMaintenanceRequestListByResidentId(page, size, sortBy, sortDir, residentId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/request/apartment")
    public ResponseEntity<PageDTO<MaintenanceRequestResponse>> getMaintenanceRequestByApartmentId(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size,
            @RequestParam(value = "sortBy", defaultValue = "created_date") String sortBy,
            @RequestParam(value = "sortDir", defaultValue = "desc") String sortDir,
            @RequestParam Integer apartmentId) {
        log.info("[Maintenance] Get Maintenance Request List By Apartment Id: {}", apartmentId);

        PageDTO<MaintenanceRequestResponse> response = maintenanceService.getMaintenanceRequestListByApartmentId(page, size, sortBy, sortDir, apartmentId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/request/detail")
    public ResponseEntity<MaintenanceRequestResponse> getMaintenanceRequestById(@RequestParam Integer maintenanceRequestId) {
        log.info("[Maintenance] Get Maintenance Request By Id: {}", maintenanceRequestId);
        MaintenanceRequestResponse maintenanceRequest = maintenanceService.getMaintenanceRequestById(maintenanceRequestId);
        return ResponseEntity.ok(maintenanceRequest);
    }

    @PostMapping("/request")
    public ResponseEntity<MaintenanceRequest> insertMaintenanceRequest(
            @RequestBody MaintenanceReserveRequest maintenanceRequest) {
        log.info("[Maintenance] Insert Maintenance Request: " + maintenanceRequest.toString());
        MaintenanceRequest newMaintenanceRequest = maintenanceService.insertMaintenanceRequest(maintenanceRequest);
        return ResponseEntity.ok(newMaintenanceRequest);
    }

    @PutMapping("/request")
    public ResponseEntity<MaintenanceRequest> updateMaintenanceRequestStatus(@RequestParam Integer maintenanceRequestId,
            @RequestParam String status, @RequestParam String remarks) {
        log.info("[Maintenance] Update Maintenance Request Status: maintenanceRequestId-{} | status-{} | remarks-{}",
                maintenanceRequestId, status, remarks);
        MaintenanceRequest maintenanceRequest = maintenanceService
                .updateMaintenanceRequestStatusById(maintenanceRequestId, status, remarks);
        return ResponseEntity.ok(maintenanceRequest);
    }

}