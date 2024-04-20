
package com.com.aparteone.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.com.aparteone.dto.base.PageResponse;
import com.com.aparteone.dto.request.ProductRequest;
import com.com.aparteone.dto.response.MerchantResponse;
import com.com.aparteone.dto.response.ProductResponse;
import com.com.aparteone.entity.Product;
import com.com.aparteone.service.MerchantService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/merchant")
public class MerchantController {
    @Autowired
    private MerchantService merchantService;

    @GetMapping("/search")
    public ResponseEntity<PageResponse<MerchantResponse>> searchMerchant(
            @RequestParam(value = "page", required = false, defaultValue = "0") int page,
            @RequestParam(value = "size", required = false, defaultValue = "40") int size,
            @RequestParam(value = "sortBy", required = false, defaultValue = "createdDate") String sortBy,
            @RequestParam(value = "sortDir", required = false, defaultValue = "desc") String sortDir,
            @RequestParam Integer apartmentId,
            @RequestParam(value = "search", required = false) String search) {
        log.info("[Merchant] Get Merchant List By Apartment Id: {}", apartmentId);
        PageResponse<MerchantResponse> response = merchantService.searchMerchant(page, size, sortBy, sortDir, apartmentId, search);
        return ResponseEntity.ok(response);
    }

    @GetMapping("")
    public ResponseEntity<PageResponse<MerchantResponse>> getMerchantListByApartmentId(
            @RequestParam(value = "page", required = false, defaultValue = "0") int page,
            @RequestParam(value = "size", required = false, defaultValue = "40") int size,
            @RequestParam(value = "sortBy", required = false, defaultValue = "createdDate") String sortBy,
            @RequestParam(value = "sortDir", required = false, defaultValue = "desc") String sortDir,
            @RequestParam(value = "category", required = false) String category,
            @RequestParam Integer apartmentId) {
        log.info("[Merchant] Get Merchant List By Apartment Id: {}", apartmentId);
        PageResponse<MerchantResponse> response = merchantService.getMerchantListByApartmentId(page, size, sortBy, sortDir, category, apartmentId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/product")
    public ResponseEntity<PageResponse<ProductResponse>> getProductListByMerchantId(
            @RequestParam(value = "page", required = false, defaultValue = "0") int page,
            @RequestParam(value = "size", required = false, defaultValue = "40") int size,
            @RequestParam(value = "sortBy", required = false, defaultValue = "createdDate") String sortBy,
            @RequestParam(value = "sortDir", required = false, defaultValue = "desc") String sortDir,
            @RequestParam Integer merchantId) {
        log.info("[Merchant] Get Product List By Mesrchant Id: {}", merchantId);
        PageResponse<ProductResponse> response = merchantService.getProductListByMerchantId(page, size, sortBy, sortDir, merchantId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/product/detail")
    public ResponseEntity<ProductResponse> getProductDetail(@RequestParam Integer productId) {
        log.info("[Merchant] Get Product Detail By Product Id: {}", productId);
        ProductResponse response = merchantService.getProductById(productId);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/product/add")
    public ResponseEntity<Product> addProduct(@RequestBody ProductRequest productRequest) {
        log.info("[Merchant] Add Product: {}", productRequest);
        Product response = merchantService.addProduct(productRequest);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/product/update")
    public ResponseEntity<Product> updateProduct(@RequestParam Integer productId, @RequestBody ProductRequest productRequest) {
        log.info("[Merchant] Update Product: {}", productId);
        Product response = merchantService.updateProduct(productId, productRequest);
        return ResponseEntity.ok(response);
    }
}
