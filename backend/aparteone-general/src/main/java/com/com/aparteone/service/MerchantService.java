package com.com.aparteone.service;

import com.com.aparteone.dto.MerchantDTO;
import com.com.aparteone.dto.base.PageResponse;
import com.com.aparteone.dto.response.MerchantResponse;

public interface MerchantService {
    public PageResponse<MerchantResponse> searchMerchant(int page, int size, String sortBy, String sortDir, Integer apartmentId, String search);
    public PageResponse<MerchantResponse> getMerchantListByApartmentId(int page, int size, String sortBy, String sortDir, String category, Integer apartmentId);
    public MerchantDTO getMerchantById(Integer merchantId);
}
