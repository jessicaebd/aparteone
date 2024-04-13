package com.com.aparteone.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.com.aparteone.dto.general.PageDTO;
import com.com.aparteone.dto.request.BillingDetailRequest;
import com.com.aparteone.dto.request.BillingRequest;
import com.com.aparteone.dto.request.PaymentRequest;
import com.com.aparteone.dto.response.BillingDetailResponse;
import com.com.aparteone.entity.Billing;
import com.com.aparteone.entity.BillingDetail;
import com.com.aparteone.service.BillingService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/billing")
public class BillingController {
    @Autowired
    private BillingService billingService;

    @GetMapping("")
    public ResponseEntity<List<Billing>> getBillingListByApartmentId(
            @RequestParam(value = "isActive", required = false) Boolean isActive,
            @RequestParam Integer apartmentId) {
        log.info("[Billing] Get Billing List By Apartment Id: {}", apartmentId);
        List<Billing> response = billingService.getBillingListByApartmentId(isActive, apartmentId);
        return ResponseEntity.ok(response);
    }

    @PostMapping("")
    public ResponseEntity<Billing> insertBilling(@RequestBody BillingRequest request) {
        log.info("[Billing] Insert Billing: " + request.toString());
        Billing billing = billingService.insertBilling(request);
        return ResponseEntity.ok(billing);
    }

    @PostMapping("/update-status")
    public ResponseEntity<Billing> updateBillingActiveStatus(
            @RequestParam Integer billingId,
            @RequestParam Boolean isActive) {
        log.info("[Billing] Update Billing Status: billingId-{} | isActive-{}", billingId, isActive);
        Billing billing = billingService.updateBillingIsActive(billingId, isActive);
        return ResponseEntity.ok(billing);
    }

    @GetMapping("/detail/resident")
    public ResponseEntity<PageDTO<BillingDetailResponse>> getBillingDetailByResidentId(
            @RequestParam(value = "page", required = false, defaultValue = "0") int page,
            @RequestParam(value = "size", required = false, defaultValue = "40") int size,
            @RequestParam(value = "sortBy", required = false, defaultValue = "createdDate") String sortBy,
            @RequestParam(value = "sortDir", required = false, defaultValue = "desc") String sortDir,
            @RequestParam(value = "status", required = false) String status,
            @RequestParam Integer residentId) {
        log.info("[Billing] Get Billing Request List By Resident Id: {}", residentId);
        PageDTO<BillingDetailResponse> response = billingService.getBillingDetailListByResidentId(page, size, sortBy, sortDir, status, residentId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/detail/apartment")
    public ResponseEntity<PageDTO<BillingDetailResponse>> getBillingDetailByApartmentId(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size,
            @RequestParam(value = "sortBy", defaultValue = "created_date") String sortBy,
            @RequestParam(value = "sortDir", defaultValue = "desc") String sortDir,
            @RequestParam(value = "status", required = false) String status,
            @RequestParam Integer apartmentId) {
        log.info("[Billing] Get Billing Request List By Apartment Id: {}", apartmentId);
        PageDTO<BillingDetailResponse> response = billingService.getBillingDetailListByApartmentId(page, size, sortBy, sortDir, status, apartmentId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/detail")
    public ResponseEntity<BillingDetailResponse> getBillingDetail(@RequestParam Integer billingDetailId) {
        log.info("[Billing] Get Billing Request By Id: {}", billingDetailId);
        BillingDetailResponse response = billingService.getBillingDetailById(billingDetailId);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/detail")
    public ResponseEntity<BillingDetail> insertBillingDetail(@RequestBody BillingDetailRequest request) {
        log.info("[Billing] Insert Billing Request: " + request.toString());
        BillingDetail billingDetail = billingService.insertBillingDetail(request);
        return ResponseEntity.ok(billingDetail);
    }

    @PostMapping("/detail/update-status")
    public ResponseEntity<BillingDetail> updateBillingDetailStatus(
            @RequestParam Integer billingDetailId,
            @RequestParam String status) {
        log.info("[Billing] Update Billing Request Status: billingDetailId-{} | status-{}", billingDetailId, status);
        BillingDetail billingRequest = billingService.updateBillingDetailStatusById(billingDetailId, status);
        return ResponseEntity.ok(billingRequest);
    }

    @PostMapping("/detail/payment")
    public ResponseEntity<BillingDetail> payment(@RequestBody PaymentRequest request) {
        log.info("[Billing] Payment: " + request.toString());
        BillingDetail billingDetail = billingService.payment(request);
        return ResponseEntity.ok(billingDetail);
    }

    @PostMapping("/detail/verify-payment")
    public ResponseEntity<BillingDetail> verifyPayment(
            @RequestParam Integer billingDetailId,
            @RequestParam Boolean isValid) {
        log.info("[Billing] Verify Payment: billingDetailId-{} | isValid-{}", billingDetailId, isValid);
        BillingDetail billingDetail = billingService.verifyPayment(billingDetailId, isValid);
        return ResponseEntity.ok(billingDetail);
    }
}
