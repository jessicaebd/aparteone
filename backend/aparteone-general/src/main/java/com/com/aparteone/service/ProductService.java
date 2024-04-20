package com.com.aparteone.service;

import com.com.aparteone.dto.base.PageResponse;
import com.com.aparteone.dto.request.ProductRequest;
import com.com.aparteone.dto.response.ProductResponse;
import com.com.aparteone.entity.Product;

public interface ProductService {
    public PageResponse<ProductResponse> searchProduct(int page, int size, String sortBy, String sortDir, String search);
    public PageResponse<ProductResponse> getProductListByMerchantId(int page, int size, String sortBy, String sortDir, Integer merchantId);
    public ProductResponse getProductById(Integer productId);
    public Product addProduct(ProductRequest productRequest);
    public Product updateProduct(Integer productId, Boolean isActive, ProductRequest productRequest);
}
