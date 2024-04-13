package com.com.aparteone.service;

import java.util.List;

import com.com.aparteone.dto.general.PageDTO;
import com.com.aparteone.dto.request.BillingDetailRequest;
import com.com.aparteone.dto.request.BillingRequest;
import com.com.aparteone.dto.request.PaymentRequest;
import com.com.aparteone.dto.response.BillingDetailResponse;
import com.com.aparteone.entity.Billing;
import com.com.aparteone.entity.BillingDetail;

public interface BillingService {
    // Billing
    public List<Billing> getBillingListByApartmentId(Boolean isActive, Integer apartmentId);
    public Billing insertBilling(BillingRequest billingRequest);
    public Billing updateBillingIsActive(Integer billingId, Boolean isActive);

    // Billing Request
    public BillingDetailResponse getBillingDetailById(Integer billingDetailId);
    public PageDTO<BillingDetailResponse> getBillingDetailListByResidentId(int page, int size, String sortBy, String sortDir, String status, Integer residentId);
    public PageDTO<BillingDetailResponse> getBillingDetailListByApartmentId(int page, int size, String sortBy, String sortDir, String status, Integer apartmentId);
    public BillingDetail insertBillingDetail(BillingDetailRequest billingDetailRequest);
    public BillingDetail updateBillingDetailStatusById(Integer billingDetailId, String status);
    public BillingDetail payment(PaymentRequest paymentRequest);
    public BillingDetail verifyPayment(Integer billingDetailId, Boolean isValid);
}
