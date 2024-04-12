package com.com.aparteone.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.com.aparteone.dto.general.PageDTO;
import com.com.aparteone.dto.response.FacilityCategoryResponse;
import com.com.aparteone.dto.response.FacilityRequestResponse;
import com.com.aparteone.entity.Facility;
import com.com.aparteone.entity.FacilityRequest;
import com.com.aparteone.service.FacilityService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/facility")
public class FacilityController {
    @Autowired
    private FacilityService facilityService;

    @GetMapping("")
    public ResponseEntity<PageDTO<FacilityCategoryResponse>> getFacilityListByApartmentId(
            @RequestParam(value = "page", defaultValue = "0") Integer page,
            @RequestParam(value = "size", defaultValue = "10") Integer size,
            @RequestParam Integer apartmentId) {
        log.info("[Facility] Get Facility List By Apartment Id: {}", apartmentId);
        PageDTO<FacilityCategoryResponse> response = facilityService.getFacilityListByApartmentId(page, size, apartmentId);
        return ResponseEntity.ok(response);
    }

    @PostMapping("")
    public ResponseEntity<Facility> insertFacility(@RequestBody Facility facility) {
        log.info("[Facility] Insert Facility: " + facility.toString());
        Facility newFacility = facilityService.insertFacility(facility);
        return ResponseEntity.ok(newFacility);
    }

    @PutMapping("")
    public ResponseEntity<Facility> updateFacilityActiveStatus(@RequestParam Integer facilityId, @RequestParam Boolean isActive) {
        log.info("[Facility] Update Facility Status: facilityId-{} | isActive-{}", facilityId, isActive);
        Facility facility = facilityService.updateFacilityIsActive(facilityId, isActive);
        return ResponseEntity.ok(facility);
    }

    @GetMapping("/request/resident")
    public ResponseEntity<PageDTO<FacilityRequestResponse>> getFacilityRequestByResidentId(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size,
            @RequestParam(value = "sortBy", defaultValue = "createdDate") String sortBy,
            @RequestParam(value = "sortDir", defaultValue = "desc") String sortDir,
            @RequestParam Integer residentId) {
        log.info("[Facility] Get Facility Request List By Resident Id: {}", residentId);
        PageDTO<FacilityRequestResponse> response = facilityService.getFacilityRequestListByResidentId(page, size, sortBy, sortDir, residentId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/request/apartment")
    public ResponseEntity<PageDTO<FacilityRequestResponse>> getFacilityRequestByApartmentId(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size,
            @RequestParam(value = "sortBy", defaultValue = "created_date") String sortBy,
            @RequestParam(value = "sortDir", defaultValue = "desc") String sortDir,
            @RequestParam Integer apartmentId) {
        log.info("[Facility] Get Facility Request List By Apartment Id: {}", apartmentId);
        PageDTO<FacilityRequestResponse> response = facilityService.getFacilityRequestListByApartmentId(page, size, sortBy, sortDir, apartmentId);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/request")
    public ResponseEntity<FacilityRequest> insertFacilityRequest(@RequestBody FacilityRequest facilityRequest) {
        log.info("[Facility] Insert Facility Request: " + facilityRequest.toString());
        FacilityRequest newFacilityRequest = facilityService.insertFacilityRequest(facilityRequest);
        return ResponseEntity.ok(newFacilityRequest);
    }

    @PutMapping("/request")
    public ResponseEntity<FacilityRequest> updateFacilityRequestStatus(
            @RequestParam Integer facilityRequestId,
            @RequestParam String status, @RequestParam String remarks) {
        log.info("[Facility] Update Facility Request Status: facilityRequestId-{} | status-{} | remarks-{}", facilityRequestId, status, remarks);
        FacilityRequest facilityRequest = facilityService.updateFacilityRequestStatusById(facilityRequestId, status, remarks);
        return ResponseEntity.ok(facilityRequest);
    }
}
