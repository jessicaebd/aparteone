package com.com.aparteone.service;

import com.com.aparteone.dto.base.PageResponse;
import com.com.aparteone.dto.request.ProductRequest;
import com.com.aparteone.dto.response.MerchantResponse;
import com.com.aparteone.dto.response.ProductResponse;
import com.com.aparteone.entity.Product;

public interface MerchantService {
    public PageResponse<MerchantResponse> searchMerchant(int page, int size, String sortBy, String sortDir, Integer apartmentId, String search);
    public PageResponse<MerchantResponse> getMerchantListByApartmentId(int page, int size, String sortBy, String sortDir, String category, Integer apartmentId);
    public PageResponse<ProductResponse> getProductListByMerchantId(int page, int size, String sortBy, String sortDir, Integer merchantId);
    public ProductResponse getProductById(Integer productId);
    public Product addProduct(ProductRequest productRequest);
    public Product updateProduct(Integer productId, ProductRequest productRequest);
}
