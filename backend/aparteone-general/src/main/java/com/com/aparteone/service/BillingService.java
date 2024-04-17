package com.com.aparteone.service;

import com.com.aparteone.dto.base.PageResponse;
import com.com.aparteone.dto.request.category.BillingCategoryRequest;
import com.com.aparteone.dto.response.category.BillingCategoryResponse;
import com.com.aparteone.entity.Billing;

public interface BillingService {
    // Billing - Category
    public Billing addBilling(BillingCategoryRequest billingCategoryRequest);
    public Billing updateBillingIsActive(Integer billingId, Boolean isActive);
    public PageResponse<BillingCategoryResponse> getBillingListByApartmentId(int page, int size, String sortBy, String sortDir, Boolean isActive, Integer apartmentId);

    // Billing Request
    // public BillingDetailResponse getBillingDetailById(Integer billingDetailId);
    // public PageResponse<BillingDetailResponse> getBillingDetailListByResidentId(int page, int size, String sortBy, String sortDir, String status, Integer residentId);
    // public PageResponse<BillingDetailResponse> getBillingDetailListByApartmentId(int page, int size, String sortBy, String sortDir, String status, Integer apartmentId);
    // public BillingDetail insertBillingDetail(BillingDetailRequest billingDetailRequest);
    // public BillingDetail updateBillingDetailStatusById(Integer billingDetailId, String status);
    // public BillingDetail payment(PaymentRequest paymentRequest);
    // public BillingDetail verifyPayment(Integer billingDetailId, Boolean isValid);
}
