package com.com.aparteone.service;

import com.com.aparteone.dto.MerchantDTO;
import com.com.aparteone.dto.base.PageResponse;

public interface MerchantService {
    public PageResponse<MerchantDTO> searchMerchant(int page, int size, String sortBy, String sortDir, Integer apartmentId, String search);
    public PageResponse<MerchantDTO> getMerchantListByApartmentId(int page, int size, String sortBy, String sortDir, String category, Integer apartmentId);
    public MerchantDTO getMerchantById(Integer merchantId);
}
