package com.com.aparteone.service.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.com.aparteone.constant.AparteoneConstant;
import com.com.aparteone.dto.ResidentDTO;
import com.com.aparteone.dto.base.PageResponse;
import com.com.aparteone.dto.request.BillingDetailRequest;
import com.com.aparteone.dto.request.PaymentRequest;
import com.com.aparteone.dto.request.category.BillingCategoryRequest;
import com.com.aparteone.dto.response.BillingDetailResponse;
import com.com.aparteone.dto.response.PaymentResponse;
import com.com.aparteone.dto.response.category.BillingCategoryResponse;
import com.com.aparteone.entity.Billing;
import com.com.aparteone.entity.BillingDetail;
import com.com.aparteone.entity.Payment;
import com.com.aparteone.repository.BillingDetailRepo;
import com.com.aparteone.repository.BillingRepo;
import com.com.aparteone.repository.PaymentRepo;
import com.com.aparteone.service.BillingService;
import com.com.aparteone.service.general.ResidentService;
import com.com.aparteone.specification.BillingSpecification;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class BillingServiceImpl implements BillingService {

    @Autowired
    private BillingRepo billingRepo;

    @Autowired
    private BillingDetailRepo billingDetailRepo;

    @Autowired
    private PaymentRepo paymentRepo;

    @Autowired
    private ResidentService residentService;

    public Pageable pagination(int page, int size, String sortBy, String sortDir) {
        Pageable pageable = null;
        if (sortBy != null && sortDir != null) {
            pageable = PageRequest.of(page, size, sortDir.equals(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending());
        } else {
            pageable = PageRequest.of(page, size);
        }
        return pageable;
    }

    @Override
    public Billing addBilling(BillingCategoryRequest billingCategoryRequest) {
        Billing billing = new Billing();
        billing.setApartmentId(billingCategoryRequest.getApartmentId());
        billing.setCategory(billingCategoryRequest.getCategory());
        billing.setIsActive(true);
        return billingRepo.save(billing);
    }

    @Override
    public Billing updateBillingIsActive(Integer billingId, Boolean isActive) {
        Billing billing = billingRepo.findById(billingId).get();
        billing.setIsActive(isActive);
        return billingRepo.save(billing);
    }

    @Override
    public List<BillingCategoryResponse> getBillingListByApartmentId(Boolean isActive, Integer apartmentId) {
        Specification<Billing> spec = Specification.where(BillingSpecification.billingHasApartmentId(apartmentId));
        if (isActive != null) {
            spec = spec.and(BillingSpecification.billingIsActive(isActive));
        }
        List<Billing> billing = billingRepo.findAll(spec);
        
        List<BillingCategoryResponse> response = new ArrayList<>();
        billing.forEach(request -> {
            response.add(new BillingCategoryResponse(
                    request.getId(),
                    request.getApartmentId(),
                    request.getCategory(),
                    request.getIsActive() ? AparteoneConstant.STATUS_ACTIVE : AparteoneConstant.STATUS_INACTIVE,
                    request.getCreatedDate(),
                    request.getModifiedDate()));
        });
        return response;
    }






    // @Override
    // public BillingDetailResponse getBillingDetailById(Integer billingDetailId) {
    // BillingDetail billingDetail =
    // billingDetailRepo.findById(billingDetailId).get();
    // Billing billing = billingRepo.findById(billingDetail.getBillingId()).get();
    // PaymentResponse paymentResponse = null;
    // if (billingDetail.getPaymentId() != null) {
    // Payment payment = paymentRepo.findById(billingDetail.getPaymentId()).get();
    // paymentResponse = new PaymentResponse(
    // payment.getId(),
    // payment.getPaymentProofImage(),
    // (payment.getIsValid() == true) ? AparteoneConstant.STATUS_VALID :
    // AparteoneConstant.STATUS_INVALID,
    // payment.getPaymentDate(),
    // payment.getVerifiedDate());
    // }

    // ResidentDTO resident =
    // residentService.getResidentById(billingDetail.getResidentId());
    // BillingDetailResponse response = new BillingDetailResponse(
    // billingDetail.getId(),
    // billingDetail.getResidentId(),
    // resident.getName(),
    // resident.getUnitNumber(),
    // billing.getId(),
    // billing.getCategory(),
    // billingDetail.getStatus(),
    // billingDetail.getAmount(),
    // billingDetail.getCreatedDate(),
    // billingDetail.getDueDate(),
    // billingDetail.getCompletedDate(),
    // billingDetail.getCancelledDate(),
    // paymentResponse);
    // return response;
    // }

    // @Override
    // public PageResponse<BillingDetailResponse>
    // getBillingDetailListByResidentId(int page, int size, String sortBy,
    // String sortDir, String status, Integer residentId) {
    // Specification<BillingDetail> spec = Specification
    // .where(BillingSpecification.billingDetailHasResidentId(residentId));
    // if (status != null) {
    // spec = spec.and(BillingSpecification.billingDetailHasStatus(status));
    // }
    // Pageable pageable = pagination(page, size, sortBy, sortDir);

    // Page<BillingDetail> billingDetail = billingDetailRepo.findAll(spec,
    // pageable);

    // List<BillingDetailResponse> data = new ArrayList<>();
    // billingDetail.getContent().forEach(request -> {
    // data.add(getBillingDetailById(request.getId()));
    // });

    // PageResponse<BillingDetailResponse> response = new PageResponse<>(
    // billingDetail.getTotalElements(),
    // billingDetail.getTotalPages(),
    // billingDetail.getNumber(),
    // billingDetail.getSize(),
    // data);
    // return response;
    // }

    // @Override
    // public PageResponse<BillingDetailResponse>
    // getBillingDetailListByApartmentId(int page, int size, String sortBy,
    // String sortDir, String status, Integer apartmentId) {
    // Specification<BillingDetail> spec = Specification
    // .where(BillingSpecification.billingDetailHasApartmentId(apartmentId));
    // if (status != null) {
    // spec = spec.and(BillingSpecification.billingDetailHasStatus(status));
    // }
    // Pageable pageable = pagination(page, size, sortBy, sortDir);

    // Page<BillingDetail> billingDetail = billingDetailRepo.findAll(spec,
    // pageable);

    // List<BillingDetailResponse> data = new ArrayList<>();
    // billingDetail.getContent().forEach(request -> {
    // data.add(getBillingDetailById(request.getId()));
    // });

    // PageResponse<BillingDetailResponse> response = new PageResponse<>(
    // billingDetail.getTotalElements(),
    // billingDetail.getTotalPages(),
    // billingDetail.getNumber(),
    // billingDetail.getSize(),
    // data);
    // return response;
    // }

    // @Override
    // public BillingDetail insertBillingDetail(BillingDetailRequest
    // billingDetailRequest) {
    // BillingDetail billingDetail = new BillingDetail(billingDetailRequest);
    // billingDetail.setStatus(AparteoneConstant.STATUS_WAITING_PAYMENT);
    // return billingDetailRepo.save(billingDetail);
    // }

    // @Override
    // public BillingDetail updateBillingDetailStatusById(Integer billingDetailId,
    // String status) {
    // BillingDetail billingDetail =
    // billingDetailRepo.findById(billingDetailId).get();
    // if (status.equals(AparteoneConstant.STATUS_CANCELLED)) {
    // billingDetail.setStatus(AparteoneConstant.STATUS_CANCELLED);
    // billingDetail.setCancelledDate(new Date());
    // }
    // return billingDetailRepo.save(billingDetail);
    // }

    // @Override
    // public BillingDetail payment(PaymentRequest paymentRequest) {
    // BillingDetail billingDetail =
    // billingDetailRepo.findById(paymentRequest.getId()).get();

    // Payment payment = new Payment(paymentRequest.getPaymentProofImage(), new
    // Date());
    // payment = paymentRepo.save(payment);

    // billingDetail.setPaymentId(payment.getId());
    // billingDetail.setStatus(AparteoneConstant.STATUS_WAITING_CONFIRMATION);
    // return billingDetailRepo.save(billingDetail);
    // }

    // @Override
    // public BillingDetail verifyPayment(Integer billingDetailId, Boolean isValid)
    // {
    // BillingDetail billingDetail =
    // billingDetailRepo.findById(billingDetailId).get();

    // Payment payment = paymentRepo.findById(billingDetail.getPaymentId()).get();
    // payment.setIsValid(isValid);
    // payment.setVerifiedDate(new Date());

    // billingDetail.setStatus((payment.getIsValid() == true) ?
    // AparteoneConstant.STATUS_COMPLETED
    // : AparteoneConstant.STATUS_CANCELLED);
    // return billingDetailRepo.save(billingDetail);
    // }
}
