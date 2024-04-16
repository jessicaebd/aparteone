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
import com.com.aparteone.dto.request.FacilityCategoryRequest;
import com.com.aparteone.dto.request.FacilityReserveRequest;
import com.com.aparteone.dto.request.FacilityTimeRequest;
import com.com.aparteone.dto.response.FacilityCategoryResponse;
import com.com.aparteone.dto.response.FacilityRequestResponse;
import com.com.aparteone.entity.Facility;
import com.com.aparteone.entity.FacilityRequest;
import com.com.aparteone.entity.FacilityTime;
import com.com.aparteone.service.FacilityService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/facility")
public class FacilityController {
    @Autowired
    private FacilityService facilityService;

    @GetMapping("")
    public ResponseEntity<PageResponse<FacilityCategoryResponse>> getFacilityListByApartmentId(
        @RequestParam(value = "page", required = false, defaultValue = "0") int page,
        @RequestParam(value = "size", required = false, defaultValue = "40") int size,
        @RequestParam(value = "isActive", required = false) Boolean isActive,
            @RequestParam Integer apartmentId) {
        log.info("[Facility] Get Facility List By Apartment Id: {}", apartmentId);
        PageResponse<FacilityCategoryResponse> response = facilityService.getFacilityListByApartmentId(page, size, isActive, apartmentId);
        return ResponseEntity.ok(response);
    }

    @PostMapping("")
    public ResponseEntity<Facility> insertFacility(@RequestBody FacilityCategoryRequest facility) {
        log.info("[Facility] Insert Facility: " + facility.toString());
        Facility newFacility = facilityService.insertFacility(facility);
        return ResponseEntity.ok(newFacility);
    }

    @PostMapping("/update-status")
    public ResponseEntity<Facility> updateFacilityActiveStatus(
            @RequestParam Integer facilityId,
            @RequestParam Boolean isActive) {
        log.info("[Facility] Update Facility Status: facilityId-{} | isActive-{}", facilityId, isActive);
        Facility facility = facilityService.updateFacilityIsActive(facilityId, isActive);
        return ResponseEntity.ok(facility);
    }

    @PostMapping("/update-time")
    public ResponseEntity<FacilityTime> updateFacilityTime(
            @RequestParam Integer facilityTimeId,
            @RequestParam(required = false) Boolean isActive,
            @RequestBody(required = false) FacilityTimeRequest facilityTimeRequest) {
        log.info("[Facility] Update Facility Time: facilityTimeId-{} | isActive-{} | facilityTimeRequest-{}", facilityTimeId, isActive, facilityTimeRequest.toString());
        FacilityTime facilityTime = facilityService.updateFacilityTime(facilityTimeId, facilityTimeRequest, isActive);
        return ResponseEntity.ok(facilityTime);
    }

    @GetMapping("/request/resident")
    public ResponseEntity<PageResponse<FacilityRequestResponse>> getFacilityRequestByResidentId(
            @RequestParam(value = "page", required = false, defaultValue = "0") int page,
            @RequestParam(value = "size", required = false, defaultValue = "40") int size,
            @RequestParam(value = "sortBy", required = false, defaultValue = "createdDate") String sortBy,
            @RequestParam(value = "sortDir", required = false, defaultValue = "desc") String sortDir,
            @RequestParam(value = "status", required = false) String status,
            @RequestParam Integer residentId) {
        log.info("[Facility] Get Facility Request List By Resident Id: {}", residentId);
        PageResponse<FacilityRequestResponse> response = facilityService.getFacilityRequestListByResidentId(page, size, sortBy, sortDir, status, residentId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/request/apartment")
    public ResponseEntity<PageResponse<FacilityRequestResponse>> getFacilityRequestByApartmentId(
            @RequestParam(value = "page", required = false, defaultValue = "0") int page,
            @RequestParam(value = "size", required = false, defaultValue = "40") int size,
            @RequestParam(value = "sortBy", required = false, defaultValue = "created_date") String sortBy,
            @RequestParam(value = "sortDir", required = false, defaultValue = "desc") String sortDir,
            @RequestParam(value = "status", required = false) String status,
            @RequestParam Integer apartmentId) {
        log.info("[Facility] Get Facility Request List By Apartment Id: {}", apartmentId);
        PageResponse<FacilityRequestResponse> response = facilityService.getFacilityRequestListByApartmentId(page, size, sortBy, sortDir, status, apartmentId);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/request")
    public ResponseEntity<FacilityRequest> insertFacilityRequest(@RequestBody FacilityReserveRequest facilityRequest) {
        log.info("[Facility] Insert Facility Request: " + facilityRequest.toString());
        FacilityRequest newFacilityRequest = facilityService.insertFacilityRequest(facilityRequest);
        return ResponseEntity.ok(newFacilityRequest);
    }

    @PostMapping("/request/update")
    public ResponseEntity<FacilityRequest> updateFacilityRequestStatus(
            @RequestParam Integer facilityRequestId,
            @RequestParam String status) {
        log.info("[Facility] Update Facility Request Status: facilityRequestId-{} | status-{}", facilityRequestId, status);
        FacilityRequest facilityRequest = facilityService.updateFacilityRequestStatusById(facilityRequestId, status);
        return ResponseEntity.ok(facilityRequest);
    }
}
