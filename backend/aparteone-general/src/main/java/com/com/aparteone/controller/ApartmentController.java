package com.com.aparteone.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.com.aparteone.dto.ApartmentResponse;
import com.com.aparteone.dto.ApartmentUnitDTO;
import com.com.aparteone.dto.base.PageResponse;
import com.com.aparteone.entity.Apartment;
import com.com.aparteone.entity.ApartmentUnit;
import com.com.aparteone.service.ApartmentService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/apartment")
public class ApartmentController {
    @Autowired
    private ApartmentService apartmentService;

    @GetMapping("/search")
    public ResponseEntity<PageResponse<ApartmentResponse>> searchApartment(
            @RequestParam(value = "page", required = false, defaultValue = "0") int page,
            @RequestParam(value = "size", required = false, defaultValue = "10") int size,
            @RequestParam(value = "sortBy", required = false, defaultValue = "id") String sortBy,
            @RequestParam(value = "sortDir", required = false, defaultValue = "DESC") String sortDir,
            @RequestParam(required = false) Boolean isActive,
            @RequestParam String search) {
        log.info("[Apartment] Search Apartment: search-{}", search);
        PageResponse<ApartmentResponse> response = apartmentService.searchApartment(page, size, sortBy, sortDir, isActive, search);
        return ResponseEntity.ok(response);
    }

    @GetMapping("")
    public ResponseEntity<PageResponse<ApartmentResponse>> getApartmentList(
            @RequestParam(value = "page", required = false, defaultValue = "0") int page,
            @RequestParam(value = "size", required = false, defaultValue = "10") int size,
            @RequestParam(value = "sortBy", required = false, defaultValue = "id") String sortBy,
            @RequestParam(value = "sortDir", required = false, defaultValue = "DESC") String sortDir,
            @RequestParam(value = "isActive", required = false) Boolean isActive,
            @RequestParam(value = "isApproved", required = false) Boolean isApproved) {
        log.info("[Apartment] Get Apartment List: isActive-{} | isApproved-{}", isActive, isApproved);
        PageResponse<ApartmentResponse> response = apartmentService.getApartmentList(page, size, sortBy, sortDir, isActive, isApproved);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/detail")
    public ResponseEntity<ApartmentResponse> getApartmentDetail(@RequestParam Integer apartmentId) {
        log.info("[Apartment] Get Apartment Detail: apartmentId-{}", apartmentId);
        ApartmentResponse response = apartmentService.getApartmentById(apartmentId);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/approve")
    public ResponseEntity<Apartment> approveApartment(
            @RequestParam Integer apartmentId,
            @RequestParam Boolean isApproved) {
        log.info("[Apartment] Approve Apartment: apartmentId-{} | isApproved-{}", apartmentId, isApproved);
        Apartment apartment = apartmentService.approveApartment(apartmentId, isApproved);
        return ResponseEntity.ok(apartment);
    }

    @PostMapping("/update")
    public ResponseEntity<Apartment> updateApartmentStatus(
            @RequestParam Integer apartmentId,
            @RequestParam Boolean isActive) {
        log.info("[Apartment] Update Apartment Status: apartmentId-{} | isActive-{}", apartmentId, isActive);
        Apartment apartment = apartmentService.updateApartment(apartmentId, isActive, null);
        return ResponseEntity.ok(apartment);
    }

    @GetMapping("/unit")
    public ResponseEntity<PageResponse<ApartmentUnitDTO>> getApartmentUnitList(
            @RequestParam(value = "page", required = false, defaultValue = "0") int page,
            @RequestParam(value = "size", required = false, defaultValue = "10") int size,
            @RequestParam(value = "sortBy", required = false, defaultValue = "id") String sortBy,
            @RequestParam(value = "sortDir", required = false, defaultValue = "DESC") String sortDir,
            @RequestParam Integer apartmentId) {
        log.info("[Apartment] Get Apartment Unit List: apartmentId-{}", apartmentId);
        PageResponse<ApartmentUnitDTO> response = apartmentService.getApartmentUnitListByApartmentId(page, size, sortBy, sortDir, apartmentId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/unit/search")
    public ResponseEntity<PageResponse<ApartmentUnitDTO>> searchApartmentUnit(
            @RequestParam(value = "page", required = false, defaultValue = "0") int page,
            @RequestParam(value = "size", required = false, defaultValue = "10") int size,
            @RequestParam(value = "sortBy", required = false, defaultValue = "id") String sortBy,
            @RequestParam(value = "sortDir", required = false, defaultValue = "DESC") String sortDir,
            @RequestParam Integer apartmentId,
            @RequestParam String search) {
        log.info("[Apartment] Search Apartment Unit: apartmentId-{} | search-{}", apartmentId, search);
        PageResponse<ApartmentUnitDTO> response = apartmentService.searchApartmentUnit(page, size, sortBy, sortDir, apartmentId, search);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/unit/add")
    public ResponseEntity<ApartmentUnit> addApartmentUnit(@RequestBody ApartmentUnitDTO apartmentUnitDTO) {
        log.info("[Apartment] Add Apartment Unit: apartmentUnitDTO-{}", apartmentUnitDTO.toString());
        ApartmentUnit apartmentUnit = apartmentService.addApartmentUnit(apartmentUnitDTO);
        return ResponseEntity.ok(apartmentUnit);
    }

    @PostMapping("/unit/update")
    public ResponseEntity<ApartmentUnit> updateApartmentUnit(
            @RequestParam Integer apartmentUnitId,
            @RequestBody ApartmentUnitDTO apartmentUnitDTO) {
        log.info("[Apartment] Update Apartment Unit: apartmentUnitId-{} | apartmentUnitDTO-{}", apartmentUnitId, apartmentUnitDTO.toString());
        ApartmentUnit apartmentUnit = apartmentService.updateApartmentUnit(apartmentUnitId, apartmentUnitDTO);
        return ResponseEntity.ok(apartmentUnit);
    }
}
