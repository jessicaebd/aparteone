package com.com.aparteone.service;

import com.com.aparteone.dto.MerchantDTO;
import com.com.aparteone.dto.base.PageResponse;
import com.com.aparteone.dto.request.auth.RegisterMerchantRequest;
import com.com.aparteone.entity.general.Merchant;

public interface MerchantService {
    public PageResponse<MerchantDTO> searchMerchant(int page, int size, String sortBy, String sortDir, Integer apartmentId, String search);
    public PageResponse<MerchantDTO> getMerchantList(int page, int size, String sortBy, String sortDir, Boolean isActive, Boolean isApproved, Integer apartmentId);
    public MerchantDTO getMerchantById(Integer merchantId);
    public Merchant addMerchant(Integer userId, RegisterMerchantRequest registerMerchantRequest);
    public Merchant approveMerchant(Integer merchantId, Boolean isApproved);
    public Merchant updateMerchantStatus(Integer merchantId, Boolean isActive);
}