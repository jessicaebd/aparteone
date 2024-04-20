package com.com.aparteone.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.com.aparteone.dto.ApartmentDTO;
import com.com.aparteone.dto.base.PageResponse;
import com.com.aparteone.entity.general.Apartment;
import com.com.aparteone.service.general.ApartmentService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/apartment")
public class ApartmentController {
    @Autowired
    private ApartmentService apartmentService;

    @GetMapping("/")
    public ResponseEntity<PageResponse<ApartmentDTO>> getApartmentList(
            @RequestParam(value = "page", required = false, defaultValue = "0") int page,
            @RequestParam(value = "size", required = false, defaultValue = "10") int size,
            @RequestParam(value = "sortBy", required = false, defaultValue = "id") String sortBy,
            @RequestParam(value = "sortDir", required = false, defaultValue = "DESC") String sortDir,
            @RequestParam(value = "isActive", required = false) Boolean isActive,
            @RequestParam(value = "isApproved", required = false) Boolean isApproved) {
        log.info("[Admin][Apartment] Get Apartment List: isActive-{} | isApproved-{}", isActive, isApproved);
        PageResponse<ApartmentDTO> response = apartmentService.getApartmentList(page, size, sortBy, sortDir, isActive, isApproved);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/detail")
    public ResponseEntity<ApartmentDTO> getApartmentDetail(@RequestParam Integer apartmentId) {
        log.info("[Admin][Apartment] Get Apartment Detail: apartmentId-{}", apartmentId);
        ApartmentDTO response = apartmentService.getApartmentById(apartmentId);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/approve")
    public ResponseEntity<Apartment> approveApartment(
            @RequestParam Integer apartmentId,
            @RequestParam Boolean isApproved) {
        log.info("[Admin][Apartment] Approve Apartment: apartmentId-{} | isApproved-{}", apartmentId, isApproved);
        Apartment apartment = apartmentService.approveApartment(apartmentId, isApproved);
        return ResponseEntity.ok(apartment);
    }

    @PostMapping("/update")
    public ResponseEntity<Apartment> updateApartmentStatus(
            @RequestParam Integer apartmentId,
            @RequestParam Boolean isActive) {
        log.info("[Admin][Apartment] Update Apartment Status: apartmentId-{} | isActive-{}", apartmentId, isActive);
        Apartment apartment = apartmentService.updateApartment(apartmentId, isActive, null);
        return ResponseEntity.ok(apartment);
    }
}
