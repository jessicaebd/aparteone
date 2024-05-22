package com.com.aparteone.controller;

import java.text.ParseException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.com.aparteone.dto.base.PageResponse;
import com.com.aparteone.dto.request.FacilityReserveRequest;
import com.com.aparteone.dto.request.category.FacilityCategoryRequest;
import com.com.aparteone.dto.request.category.FacilityTimeRequest;
import com.com.aparteone.dto.response.FacilityRequestResponse;
import com.com.aparteone.dto.response.category.FacilityCategoryResponse;
import com.com.aparteone.dto.response.category.FacilityTimeResponse;
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
    public ResponseEntity<PageResponse<FacilityCategoryResponse>> getFacilityCategoryList(
            @RequestParam(value = "page", required = false, defaultValue = "0") int page,
            @RequestParam(value = "size", required = false, defaultValue = "40") int size,
            @RequestParam(value = "sortBy", required = false, defaultValue = "category") String sortBy,
            @RequestParam(value = "sortDir", required = false, defaultValue = "ASC") String sortDir,
            @RequestParam(value = "isActive", required = false) Boolean isActive,
            @RequestParam Integer apartmentId) {
        log.info("[Facility] Get Facility Category List: apartmentId-{} | isActive-{}", apartmentId, isActive);
        PageResponse<FacilityCategoryResponse> response = facilityService.getFacilityListByApartmentId(page, size, sortBy, sortDir, isActive, apartmentId);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/add")
    public ResponseEntity<Facility> addFacilityCategory(@RequestBody FacilityCategoryRequest facilityCategoryRequest) {
        log.info("[Facility] Add Facility Category: {}", facilityCategoryRequest.toString());
        Facility facility = facilityService.addFacility(facilityCategoryRequest);
        return ResponseEntity.ok(facility);
    }

    @PostMapping("/update")
    public ResponseEntity<Facility> updateFacilityCategoryStatus(
            @RequestParam Integer facilityId,
            @RequestParam Boolean isActive) {
        log.info("[Facility] Update Facility Category Status: facilityId-{} | isActive-{}", facilityId, isActive);
        Facility facility = facilityService.updateFacilityIsActive(facilityId, isActive);
        return ResponseEntity.ok(facility);
    }

    @GetMapping("/time")
    public ResponseEntity<List<FacilityTimeResponse>> getFacilityTimeList(
            @RequestParam Integer facilityId,
            @RequestParam String date,
            @RequestParam(required = false) String search) throws ParseException {
        log.info("[Facility] Get Facility Time List: facilityId-{} | date-{}", facilityId, date);
        List<FacilityTimeResponse> response = facilityService.getFacilityTimeByFacilityId(facilityId, date, search);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/time/add")
    public ResponseEntity<FacilityTime> addFacilityTime(
            @RequestParam Integer facilityId,
            @RequestBody FacilityTimeRequest facilityTimeRequest) {
        log.info("[Facility] Add Facility Time: facilityId-{} | facilityTimeRequest-{}", facilityId, facilityTimeRequest.toString());
        FacilityTime facilityTime = facilityService.addFacilityTime(facilityId, facilityTimeRequest);
        return ResponseEntity.ok(facilityTime);
    }

    @PostMapping("/time/update")
    public ResponseEntity<FacilityTime> updateFacilityTime(
            @RequestParam Integer facilityTimeId,
            @RequestParam(required = false) Boolean isActive,
            @RequestBody(required = false) FacilityTimeRequest facilityTimeRequest) {
        log.info("[Facility] Update Facility Time: facilityTimeId-{} | isActive-{} | facilityTimeRequest-{}", facilityTimeId, isActive, facilityTimeRequest.toString());
        FacilityTime facilityTime = facilityService.updateFacilityTime(facilityTimeId, facilityTimeRequest, isActive);
        return ResponseEntity.ok(facilityTime);
    }

    @GetMapping("/request/apartment")
    public ResponseEntity<PageResponse<FacilityRequestResponse>> getApartmentFacilityRequestList(
            @RequestParam(value = "page", required = false, defaultValue = "0") int page,
            @RequestParam(value = "size", required = false, defaultValue = "10") int size,
            @RequestParam(value = "sortBy", required = false, defaultValue = "id") String sortBy,
            @RequestParam(value = "sortDir", required = false, defaultValue = "DESC") String sortDir,
            @RequestParam(value = "status", required = false) String status,
            @RequestParam(value = "search", required = false) String search,
            @RequestParam Integer apartmentId) {
        log.info("[Facility] Get Facility Request List - Apartment: apartmentId-{} | status-{}", apartmentId, status);
        PageResponse<FacilityRequestResponse> response = facilityService.getFacilityRequestListByApartmentId(page, size, sortBy, sortDir, status, apartmentId, search);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/request/resident")
    public ResponseEntity<PageResponse<FacilityRequestResponse>> getResidentFacilityRequestList(
            @RequestParam(value = "page", required = false, defaultValue = "0") int page,
            @RequestParam(value = "size", required = false, defaultValue = "10") int size,
            @RequestParam(value = "sortBy", required = false, defaultValue = "id") String sortBy,
            @RequestParam(value = "sortDir", required = false, defaultValue = "DESC") String sortDir,
            @RequestParam(value = "status", required = false) String status,
            @RequestParam(value = "search", required = false) String search,
            @RequestParam Integer residentId) {
        log.info("[Facility] Get Facility Request List - Resident: residentId-{} | status-{}", residentId, status);
        PageResponse<FacilityRequestResponse> response = facilityService.getFacilityRequestListByResidentId(page, size, sortBy, sortDir, status, residentId, search);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/request")
    public ResponseEntity<FacilityRequestResponse> getFacilityRequestDetail(@RequestParam Integer facilityRequestId) {
        log.info("[Facility] Get Facility Request Detail: facilityRequestId-{}",facilityRequestId);
        FacilityRequestResponse response = facilityService.getFacilityRequestById(facilityRequestId);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/request/add")
    public ResponseEntity<FacilityRequest> addFacilityRequest(@RequestBody FacilityReserveRequest facilityReserveRequest) {
        log.info("[Facility] Add Facility Request: {}", facilityReserveRequest.toString());
        FacilityRequest facilityRequest = facilityService.addFacilityRequest(facilityReserveRequest);
        return ResponseEntity.ok(facilityRequest);
    }

    @PostMapping("/request/update")
    public ResponseEntity<FacilityRequest> updateFacilityRequestStatus(
            @RequestParam Integer facilityRequestId,
            @RequestParam String status) {
        log.info("[Facility] Update Facility Request Status: facilityRequestId-{} | status-{}", facilityRequestId, status);
        FacilityRequest facilityRequest = facilityService.updateFacilityRequestStatus(facilityRequestId, status);
        return ResponseEntity.ok(facilityRequest);
    }

    @GetMapping("/request/count")
    public ResponseEntity<Integer> countFacility(@RequestParam Integer residentId) {
        log.info("[Facility] Count Facility Request By Resident Id: residentId-{}", residentId);
        return ResponseEntity.ok(facilityService.countFacilityRequestByResidentId(residentId));
    }
}
