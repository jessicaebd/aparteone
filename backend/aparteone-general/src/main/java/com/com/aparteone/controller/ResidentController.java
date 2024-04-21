package com.com.aparteone.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.com.aparteone.dto.ResidentDTO;
import com.com.aparteone.dto.base.PageResponse;
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
    public ResponseEntity<PageResponse<ResidentDTO>> getResidentList(
        @RequestParam(value = "page", required = false, defaultValue = "0") int page,
        @RequestParam(value = "size", required = false, defaultValue = "10") int size,
        @RequestParam(value = "sortBy", required = false, defaultValue = "id") String sortBy,
        @RequestParam(value = "sortDir", required = false, defaultValue = "DESC") String sortDir,
        @RequestParam(required = false) Boolean isActive,
        @RequestParam(required = false) Integer apartmentId){
        log.info("[Admin][Resident] Get Resident List: apartmentId-{} | isActive-{}", isActive);
        PageResponse<ResidentDTO> response = residentService.getResidentList(page, size, sortBy, sortDir, isActive, apartmentId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/search")
    public ResponseEntity<PageResponse<ResidentDTO>> searchResident(
        @RequestParam(value = "page", required = false, defaultValue = "0") int page,
        @RequestParam(value = "size", required = false, defaultValue = "10") int size,
        @RequestParam(value = "sortBy", required = false, defaultValue = "id") String sortBy,
        @RequestParam(value = "sortDir", required = false, defaultValue = "DESC") String sortDir,
        @RequestParam(required = false) Integer apartmentId,
        @RequestParam(required = false) String search){
        log.info("[Admin][Resident] Search Resident: apartmentId-{} | search-{}", apartmentId, search);
        PageResponse<ResidentDTO> response = residentService.searchResident(page, size, sortBy, sortDir, apartmentId, search);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/detail")
    public ResponseEntity<ResidentDTO> getResidentDetail(@RequestParam Integer residentId){
        log.info("[Admin][Resident] Get Resident Detail: residentId-{}", residentId);
        ResidentDTO response = residentService.getResidentById(residentId);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/approve")
    public ResponseEntity<Resident> approveResident(
        @RequestParam Integer residentId,
        @RequestParam Boolean isApproved){
        log.info("[Admin][Merchant] Approve Merchant: residentId-{} | isApproved-{}", residentId, isApproved);
        Resident response = residentService.approveResident(residentId, isApproved);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/update")
    public ResponseEntity<Resident> updateResidentStatus(
        @RequestParam Integer residentId,
        @RequestParam Boolean isActive){
        log.info("[Admin][Resident] Update Resident Status: residentId-{} | isActive-{}", residentId, isActive);
        Resident response = residentService.updateResidentStatus(residentId, isActive);
        return ResponseEntity.ok(response);
    }
}
