
package com.com.aparteone.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.com.aparteone.dto.MerchantDTO;
import com.com.aparteone.dto.base.PageResponse;
import com.com.aparteone.service.MerchantService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/merchant")
public class ShopController {
    @Autowired
    private MerchantService merchantService;

    @GetMapping("")
    public ResponseEntity<PageResponse<MerchantDTO>> getMerchantList(
            @RequestParam(value = "page", required = false, defaultValue = "0") int page,
            @RequestParam(value = "size", required = false, defaultValue = "40") int size,
            @RequestParam(value = "sortBy", required = false, defaultValue = "name") String sortBy,
            @RequestParam(value = "sortDir", required = false, defaultValue = "ASC") String sortDir,
            @RequestParam(value = "category", required = false) String category,
            @RequestParam Integer apartmentId) {
        log.info("[Merchant] Get Merchant List: apartmentId-{} | category-{}", apartmentId, category);
        PageResponse<MerchantDTO> response = merchantService.getMerchantListByApartmentId(page, size, sortBy, sortDir,
                category, apartmentId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/detail")
    public ResponseEntity<MerchantDTO> getMerchantDetail(@RequestParam Integer merchantId) {
        log.info("[Merchant] Get Merchant Detail: merchantId-{}", merchantId);
        MerchantDTO response = merchantService.getMerchantById(merchantId);
        return ResponseEntity.ok(response);
    }
}
