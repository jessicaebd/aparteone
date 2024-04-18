package com.com.aparteone.controller;

import java.util.List;

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
import com.com.aparteone.dto.request.category.FacilityCategoryRequest;
import com.com.aparteone.dto.request.category.FacilityTimeRequest;
import com.com.aparteone.dto.response.category.FacilityCategoryResponse;
import com.com.aparteone.dto.response.category.FacilityTimeResponse;
import com.com.aparteone.entity.Facility;
import com.com.aparteone.entity.FacilityTime;
import com.com.aparteone.service.FacilityService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/facility")
public class FacilityController {
    @Autowired
    private FacilityService facilityService;

    @GetMapping("")
    public ResponseEntity<PageResponse<FacilityCategoryResponse>> getFacilityCategoryList(
            @RequestParam(value = "page", required = false, defaultValue = "0") int page,
            @RequestParam(value = "size", required = false, defaultValue = "40") int size,
            @RequestParam(value = "sortBy", required = false, defaultValue = "id") String sortBy,
            @RequestParam(value = "sortDir", required = false, defaultValue = "DESC") String sortDir,
            @RequestParam(value = "isActive", required = false) Boolean isActive,
            @RequestParam Integer apartmentId) {
        log.info("[Facility] Get Facility Category List: apartmentId-{}", apartmentId);
        PageResponse<FacilityCategoryResponse> response = facilityService.getFacilityListByApartmentId(page, size,
                sortBy, sortDir, isActive, apartmentId);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/add")
    public ResponseEntity<Facility> addFacilityCategory(@RequestBody FacilityCategoryRequest facility) {
        log.info("[Facility] Add Facility: {}", facility.toString());
        Facility newFacility = facilityService.addFacility(facility);
        return ResponseEntity.ok(newFacility);
    }

    @PostMapping("/update")
    public ResponseEntity<Facility> updateFacilityActiveStatus(
            @RequestParam Integer facilityId,
            @RequestParam Boolean isActive) {
        log.info("[Facility] Update Facility Status: facilityId-{} | isActive-{}", facilityId, isActive);
        Facility facility = facilityService.updateFacilityIsActive(facilityId, isActive);
        return ResponseEntity.ok(facility);
    }

    @GetMapping("/time/available")
    public ResponseEntity<List<FacilityTimeResponse>> getAvailableFacilityTime(@RequestParam Integer facilityId) {
        log.info("[Facility] Get Available Facility Time: facilityId-{}", facilityId);
        List<FacilityTimeResponse> facilityTimeResponse = facilityService
                .getAvailableFacilityTimeListByFacilityId(facilityId);
        return ResponseEntity.ok(facilityTimeResponse);
    }

    @PostMapping("/time/add")
    public ResponseEntity<FacilityTime> addFacilityTime(@RequestParam Integer facilityId,
            @RequestBody FacilityTimeRequest facilityTimeRequest) {
        log.info("[Facility] Add Facility Time: facilityId-{} | facilityTimeRequest-{}", facilityId,
                facilityTimeRequest.toString());
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

    // @PostMapping("/update-time")
    // public ResponseEntity<FacilityTime> updateFacilityTime(
    // @RequestParam Integer facilityTimeId,
    // @RequestParam(required = false) Boolean isActive,
    // @RequestBody(required = false) FacilityTimeRequest facilityTimeRequest) {
    // log.info("[Facility] Update Facility Time: facilityTimeId-{} | isActive-{} |
    // facilityTimeRequest-{}", facilityTimeId, isActive,
    // facilityTimeRequest.toString());
    // FacilityTime facilityTime =
    // facilityService.updateFacilityTime(facilityTimeId, facilityTimeRequest,
    // isActive);
    // return ResponseEntity.ok(facilityTime);
    // }

    // @GetMapping("/request/resident")
    // public ResponseEntity<PageResponse<FacilityRequestResponse>>
    // getFacilityRequestByResidentId(
    // @RequestParam(value = "page", required = false, defaultValue = "0") int page,
    // @RequestParam(value = "size", required = false, defaultValue = "40") int
    // size,
    // @RequestParam(value = "sortBy", required = false, defaultValue =
    // "createdDate") String sortBy,
    // @RequestParam(value = "sortDir", required = false, defaultValue = "desc")
    // String sortDir,
    // @RequestParam(value = "status", required = false) String status,
    // @RequestParam Integer residentId) {
    // log.info("[Facility] Get Facility Request List By Resident Id: {}",
    // residentId);
    // PageResponse<FacilityRequestResponse> response =
    // facilityService.getFacilityRequestListByResidentId(page, size, sortBy,
    // sortDir, status, residentId);
    // return ResponseEntity.ok(response);
    // }

    // @GetMapping("/request/apartment")
    // public ResponseEntity<PageResponse<FacilityRequestResponse>>
    // getFacilityRequestByApartmentId(
    // @RequestParam(value = "page", required = false, defaultValue = "0") int page,
    // @RequestParam(value = "size", required = false, defaultValue = "40") int
    // size,
    // @RequestParam(value = "sortBy", required = false, defaultValue =
    // "created_date") String sortBy,
    // @RequestParam(value = "sortDir", required = false, defaultValue = "desc")
    // String sortDir,
    // @RequestParam(value = "status", required = false) String status,
    // @RequestParam Integer apartmentId) {
    // log.info("[Facility] Get Facility Request List By Apartment Id: {}",
    // apartmentId);
    // PageResponse<FacilityRequestResponse> response =
    // facilityService.getFacilityRequestListByApartmentId(page, size, sortBy,
    // sortDir, status, apartmentId);
    // return ResponseEntity.ok(response);
    // }

    // @PostMapping("/request")
    // public ResponseEntity<FacilityCategoryRequest>
    // insertFacilityRequest(@RequestBody FacilityReserveRequest facilityRequest) {
    // log.info("[Facility] Insert Facility Request: " +
    // facilityRequest.toString());
    // FacilityCategoryRequest newFacilityRequest =
    // facilityService.insertFacilityRequest(facilityRequest);
    // return ResponseEntity.ok(newFacilityRequest);
    // }

    // @PostMapping("/request/update")
    // public ResponseEntity<FacilityCategoryRequest> updateFacilityRequestStatus(
    // @RequestParam Integer facilityRequestId,
    // @RequestParam String status) {
    // log.info("[Facility] Update Facility Request Status: facilityRequestId-{} |
    // status-{}", facilityRequestId, status);
    // FacilityCategoryRequest facilityRequest =
    // facilityService.updateFacilityRequestStatusById(facilityRequestId, status);
    // return ResponseEntity.ok(facilityRequest);
    // }
}
