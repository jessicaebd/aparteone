package com.com.aparteone.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.com.aparteone.dto.MerchantDTO;
import com.com.aparteone.dto.base.PageResponse;
import com.com.aparteone.entity.Merchant;
import com.com.aparteone.service.MerchantService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/merchant")
public class MerchantController {
    @Autowired
    private MerchantService merchantService;

    @GetMapping("")
    public ResponseEntity<PageResponse<MerchantDTO>> getMerchantList(
        @RequestParam(value = "page", required = false, defaultValue = "0") int page,
        @RequestParam(value = "size", required = false, defaultValue = "10") int size,
        @RequestParam(value = "sortBy", required = false, defaultValue = "id") String sortBy,
        @RequestParam(value = "sortDir", required = false, defaultValue = "DESC") String sortDir,
        @RequestParam(required = false) Boolean isActive,
        @RequestParam(required = false) Boolean isApproved,
        @RequestParam(required = false) Integer apartmentId){
        log.info("[Admin][Merchant] Get Merchant List: apartmentId-{} | isActive-{} | isApproved-{}", apartmentId, isActive, isApproved);
        PageResponse<MerchantDTO> response = merchantService.getMerchantList(page, size, sortBy, sortDir, isActive, isApproved, apartmentId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/search")
    public ResponseEntity<PageResponse<MerchantDTO>> searchMerchant(
        @RequestParam(value = "page", required = false, defaultValue = "0") int page,
        @RequestParam(value = "size", required = false, defaultValue = "10") int size,
        @RequestParam(value = "sortBy", required = false, defaultValue = "id") String sortBy,
        @RequestParam(value = "sortDir", required = false, defaultValue = "DESC") String sortDir,
        @RequestParam(required = false) Integer apartmentId,
        @RequestParam(required = false) String search){
        log.info("[Admin][Merchant] Search Merchant: apartmentId-{} | search-{}", apartmentId, search);
        PageResponse<MerchantDTO> response = merchantService.searchMerchant(page, size, sortBy, sortDir, apartmentId, search);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/detail")
    public ResponseEntity<MerchantDTO> getMerchantDetail(@RequestParam Integer merchantId){
        log.info("[Admin][Merchant] Get Merchant Detail: merchantId-{}", merchantId);
        MerchantDTO response = merchantService.getMerchantById(merchantId);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/approve")
    public ResponseEntity<Merchant> approveMerchant(
        @RequestParam Integer merchantId,
        @RequestParam Boolean isApproved){
        log.info("[Admin][Merchant] Approve Merchant: merchantId-{} | isApproved-{}", merchantId, isApproved);
        Merchant response = merchantService.approveMerchant(merchantId, isApproved);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/merchant/update")
    public ResponseEntity<Merchant> updateMerchantStatus(
        @RequestParam Integer merchantId,
        @RequestParam Boolean isActive){
        log.info("[Admin][Merchant] Update Merchant Status: merchantId-{} | isActive-{}", merchantId, isActive);
        Merchant response = merchantService.updateMerchantStatus(merchantId, isActive);
        return ResponseEntity.ok(response);
    }
}
