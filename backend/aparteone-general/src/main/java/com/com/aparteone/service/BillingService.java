package com.com.aparteone.service;

import com.com.aparteone.dto.base.PageResponse;
import com.com.aparteone.dto.request.BillingDetailRequest;
import com.com.aparteone.dto.request.PaymentRequest;
import com.com.aparteone.dto.request.category.BillingCategoryRequest;
import com.com.aparteone.dto.response.BillingDetailResponse;
import com.com.aparteone.dto.response.category.BillingCategoryResponse;
import com.com.aparteone.entity.Billing;
import com.com.aparteone.entity.BillingDetail;

public interface BillingService {
    // Billing - Category
    public PageResponse<BillingCategoryResponse> getBillingListByApartmentId(int page, int size, String sortBy, String sortDir, Boolean isActive, Integer apartmentId);
    public Billing addBilling(BillingCategoryRequest billingCategoryRequest);
    public Billing updateBillingIsActive(Integer billingId, Boolean isActive);

    // Billing Detail
    public PageResponse<BillingDetailResponse> getBillingDetailListByResidentId(int page, int size, String sortBy, String sortDir, String status, Integer residentId, String search);
    public PageResponse<BillingDetailResponse> getBillingDetailListByApartmentId(int page, int size, String sortBy, String sortDir, String status, Integer apartmentId, String search);
    public BillingDetailResponse getBillingDetailById(Integer billingDetailId);
    public BillingDetail addBillingDetail(BillingDetailRequest billingDetailRequest);
    public BillingDetail updateBillingDetail(Integer billingDetailId, String status);
    public BillingDetail payment(PaymentRequest paymentRequest);
    public BillingDetail verifyPayment(Integer billingDetailId, Boolean isValid);
    public void notifyBillingDetail(Integer userId, Integer billingDetailId);
}
