package com.com.aparteone.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.com.aparteone.dto.MerchantResponse;
import com.com.aparteone.dto.base.PageResponse;
import com.com.aparteone.dto.request.auth.RegisterMerchantRequest;
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
    public ResponseEntity<PageResponse<MerchantResponse>> getMerchantList(
        @RequestParam(value = "page", required = false, defaultValue = "0") int page,
        @RequestParam(value = "size", required = false, defaultValue = "10") int size,
        @RequestParam(value = "sortBy", required = false, defaultValue = "id") String sortBy,
        @RequestParam(value = "sortDir", required = false, defaultValue = "DESC") String sortDir,
        @RequestParam(required = false) Boolean isActive,
        @RequestParam(required = false) String isApproved,
        @RequestParam(required = false) Integer apartmentId){
        log.info("[Merchant] Get Merchant List: apartmentId-{} | isActive-{} | isApproved-{}", apartmentId, isActive, isApproved);
        PageResponse<MerchantResponse> response = merchantService.getMerchantList(page, size, sortBy, sortDir, isActive, isApproved, apartmentId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/search")
    public ResponseEntity<PageResponse<MerchantResponse>> searchMerchant(
        @RequestParam(value = "page", required = false, defaultValue = "0") int page,
        @RequestParam(value = "size", required = false, defaultValue = "10") int size,
        @RequestParam(value = "sortBy", required = false, defaultValue = "id") String sortBy,
        @RequestParam(value = "sortDir", required = false, defaultValue = "DESC") String sortDir,
        @RequestParam(required = false) Integer apartmentId,
        @RequestParam(required = false) Boolean isActive,
        @RequestParam(required = false) String search){
        log.info("[Merchant] Search Merchant: apartmentId-{} | search-{}", apartmentId, search);
        PageResponse<MerchantResponse> response = merchantService.searchMerchant(page, size, sortBy, sortDir, apartmentId, isActive, search);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/detail")
    public ResponseEntity<MerchantResponse> getMerchantDetail(@RequestParam Integer merchantId){
        log.info("[Merchant] Get Merchant Detail: merchantId-{}", merchantId);
        MerchantResponse response = merchantService.getMerchantById(merchantId);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/approve")
    public ResponseEntity<Merchant> approveMerchant(
        @RequestParam Integer merchantId,
        @RequestParam Boolean isApproved){
        log.info("[Merchant] Approve Merchant: merchantId-{} | isApproved-{}", merchantId, isApproved);
        Merchant response = merchantService.approveMerchant(merchantId, isApproved);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/merchant/update")
    public ResponseEntity<Merchant> updateMerchant(
        @RequestParam Integer merchantId,
        @RequestParam(required = false) Boolean isActive,
        @RequestBody(required = false) RegisterMerchantRequest merchantRequest){
        log.info("[Merchant] Update Merchant: merchantId-{} | isActive-{} | merchantRequest-{}", merchantId, isActive, merchantRequest.toString());
        Merchant response = merchantService.updateMerchant(merchantId, isActive, merchantRequest);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/count")
    public ResponseEntity<Integer> countMerchant(@RequestParam(required = false) Integer apartmentId){
        log.info("[Merchant] Count Merchant: apartmentId-{}", apartmentId);
        return ResponseEntity.ok(merchantService.countMerchant(apartmentId));
    }
}
