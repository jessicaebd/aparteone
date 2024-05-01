package com.com.aparteone.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.com.aparteone.dto.ResidentResponse;
import com.com.aparteone.dto.base.PageResponse;
import com.com.aparteone.dto.request.auth.RegisterResidentRequest;
import com.com.aparteone.entity.Resident;
import com.com.aparteone.service.ResidentService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/resident")
public class ResidentController {
    @Autowired
    private ResidentService residentService;

    @GetMapping("")
    public ResponseEntity<PageResponse<ResidentResponse>> getResidentList(
        @RequestParam(value = "page", required = false, defaultValue = "0") int page,
        @RequestParam(value = "size", required = false, defaultValue = "10") int size,
        @RequestParam(value = "sortBy", required = false, defaultValue = "id") String sortBy,
        @RequestParam(value = "sortDir", required = false, defaultValue = "DESC") String sortDir,
        @RequestParam(required = false) Boolean isActive,
        @RequestParam(required = false) Boolean isApproved,
        @RequestParam(required = false) Integer apartmentId){
        log.info("[Resident] Get Resident List: apartmentId-{} | isActive-{}", isActive);
        PageResponse<ResidentResponse> response = residentService.getResidentList(page, size, sortBy, sortDir, isActive, isApproved, apartmentId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/search")
    public ResponseEntity<PageResponse<ResidentResponse>> searchResident(
        @RequestParam(value = "page", required = false, defaultValue = "0") int page,
        @RequestParam(value = "size", required = false, defaultValue = "10") int size,
        @RequestParam(value = "sortBy", required = false, defaultValue = "id") String sortBy,
        @RequestParam(value = "sortDir", required = false, defaultValue = "DESC") String sortDir,
        @RequestParam(required = false) Integer apartmentId,
        @RequestParam(required = false) Boolean isActive,
        @RequestParam String search){
        log.info("[Resident] Search Resident: apartmentId-{} | search-{}", apartmentId, search);
        PageResponse<ResidentResponse> response = residentService.searchResident(page, size, sortBy, sortDir, apartmentId, isActive, search);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/approve")
    public ResponseEntity<Resident> approveResident(
        @RequestParam Integer residentId,
        @RequestParam Boolean isApproved){
        log.info("[Merchant] Approve Merchant: residentId-{} | isApproved-{}", residentId, isApproved);
        Resident response = residentService.approveResident(residentId, isApproved);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/update")
    public ResponseEntity<Resident> updateResident(
        @RequestParam Integer residentId,
        @RequestParam(required = false) Boolean isActive,
        @RequestBody(required = false) RegisterResidentRequest registerResidentRequest){
        log.info("[Resident] Update Resident: residentId-{} | isActive-{}", residentId, isActive);
        Resident response = residentService.updateResident(residentId, isActive, registerResidentRequest);
        return ResponseEntity.ok(response);
    }
}
