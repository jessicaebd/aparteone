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
import com.com.aparteone.dto.response.ProductResponse;
import com.com.aparteone.entity.Product;
import com.com.aparteone.service.ProductService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api")
public class ProductController {
    @Autowired
    private ProductService productService;

    @GetMapping("/product")
    public ResponseEntity<PageResponse<ProductResponse>> getProductList(
            @RequestParam(value = "page", required = false, defaultValue = "0") int page,
            @RequestParam(value = "size", required = false, defaultValue = "100") int size,
            @RequestParam(value = "sortBy", required = false, defaultValue = "id") String sortBy,
            @RequestParam(value = "sortDir", required = false, defaultValue = "DESC") String sortDir,
            @RequestParam Integer merchantId) {
        log.info("[Merchant] Get Merchant Product List: merchantId-{}", merchantId);
        PageResponse<ProductResponse> response = productService.getProductListByMerchantId(page, size, sortBy, sortDir, merchantId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/product/search")
    public ResponseEntity<PageResponse<ProductResponse>> searchMerchantProduct(
            @RequestParam(value = "page", required = false, defaultValue = "0") int page,
            @RequestParam(value = "size", required = false, defaultValue = "100") int size,
            @RequestParam(value = "sortBy", required = false, defaultValue = "id") String sortBy,
            @RequestParam(value = "sortDir", required = false, defaultValue = "DESC") String sortDir,
            @RequestParam Integer merchantId,
            @RequestParam String search) {
        log.info("[Merchant] Search Merchant Product: merchantId-{} | search-{}", merchantId, search);
        PageResponse<ProductResponse> response = productService.searchProduct(page, size, sortBy, sortDir, merchantId, search);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/product/detail")
    public ResponseEntity<ProductResponse> getProductDetail(@RequestParam Integer productId) {
        log.info("[Merchant] Get Product Detail: productId-{}", productId);
        ProductResponse response = productService.getProductById(productId);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/product/add")
    public ResponseEntity<Product> addProduct(@RequestBody ProductRequest productRequest) {
        log.info("[Merchant] Add Product: productRequest-{}", productRequest.toString());
        Product response = productService.addProduct(productRequest);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/product/update")
    public ResponseEntity<Product> updateProduct(
            @RequestParam Integer productId,
            @RequestParam(required = false) Boolean isActive,
            @RequestBody(required = false) ProductRequest productRequest) {
        log.info("[Merchant] Update Product: {}", productId);
        Product response = productService.updateProduct(productId, isActive, productRequest);
        return ResponseEntity.ok(response);
    }
}
