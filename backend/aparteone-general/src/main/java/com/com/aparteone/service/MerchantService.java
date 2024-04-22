package com.com.aparteone.service;

import com.com.aparteone.dto.MerchantResponse;
import com.com.aparteone.dto.base.PageResponse;
import com.com.aparteone.dto.request.auth.RegisterMerchantRequest;
import com.com.aparteone.entity.Merchant;

public interface MerchantService {
    public PageResponse<MerchantResponse> searchMerchant(int page, int size, String sortBy, String sortDir, Integer apartmentId, Boolean isActive, String search);
    public PageResponse<MerchantResponse> getMerchantList(int page, int size, String sortBy, String sortDir, Boolean isActive, Boolean isApproved, Integer apartmentId);
    public MerchantResponse getMerchantById(Integer merchantId);
    public Merchant addMerchant(Integer userId, RegisterMerchantRequest registerMerchantRequest);
    public Merchant approveMerchant(Integer merchantId, Boolean isApproved);
    public Merchant updateMerchantStatus(Integer merchantId, Boolean isActive);
}