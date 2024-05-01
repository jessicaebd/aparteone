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
import com.com.aparteone.dto.ResidentResponse;
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
import com.com.aparteone.service.NotificationService;
import com.com.aparteone.service.ResidentService;
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

    @Autowired
    private NotificationService notificationService;

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
    public PageResponse<BillingCategoryResponse> getBillingListByApartmentId(int page, int size, String sortBy, String sortDir, Boolean isActive, Integer apartmentId) {
        Specification<Billing> spec = Specification.where(BillingSpecification.billingHasApartmentId(apartmentId));
        if (isActive != null) {
            spec = spec.and(BillingSpecification.billingIsActive(isActive));
        }
        Pageable pageable = PageRequest.of(page, size, sortDir.equals(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending());
        Page<Billing> billing = billingRepo.findAll(spec, pageable);

        List<BillingCategoryResponse> data = new ArrayList<>();
        billing.forEach(request -> {
            data.add(new BillingCategoryResponse(
                    request.getId(),
                    request.getApartmentId(),
                    request.getCategory(),
                    request.getIsActive() ? AparteoneConstant.STATUS_ACTIVE : AparteoneConstant.STATUS_INACTIVE,
                    request.getCreatedDate(),
                    request.getModifiedDate()));
        });

        PageResponse<BillingCategoryResponse> response = new PageResponse<>(
                billing.getTotalElements(),
                billing.getTotalPages(),
                billing.getNumber(),
                billing.getSize(),
                data);
        return response;
    }

    @Override
    public BillingDetailResponse getBillingDetailById(Integer billingDetailId) {
        BillingDetail billingDetail = billingDetailRepo.findById(billingDetailId).get();
        Billing billing = billingRepo.findById(billingDetail.getBillingId()).get();
        PaymentResponse paymentResponse = null;
        if (billingDetail.getPaymentId() != null) {
            Payment payment = paymentRepo.findById(billingDetail.getPaymentId()).get();
            paymentResponse = new PaymentResponse(
                    payment.getId(),
                    payment.getPaymentProofImage(),
                    (payment.getIsValid() == true) ? AparteoneConstant.STATUS_VALID : AparteoneConstant.STATUS_INVALID,
                    payment.getPaymentDate(),
                    payment.getVerifiedDate());
        }

        ResidentResponse resident = residentService.getResidentById(billingDetail.getResidentId());
        BillingDetailResponse response = new BillingDetailResponse(
                billingDetail.getId(),
                AparteoneConstant.PREFIX_BILLING_RECEIPT_ID + billingDetail.getId(),
                billingDetail.getResidentId(),
                resident.getName(),
                resident.getUnitNumber(),
                billing.getId(),
                billing.getCategory(),
                billingDetail.getStatus(),
                billingDetail.getAmount(),
                billingDetail.getCreatedDate(),
                billingDetail.getDueDate(),
                billingDetail.getCompletedDate(),
                billingDetail.getCancelledDate(),
                paymentResponse);
        return response;
    }

    @Override
    public PageResponse<BillingDetailResponse> getBillingDetailListByApartmentId(int page, int size, String sortBy, String sortDir, String status, Integer apartmentId, String search) {
        Pageable pageable = PageRequest.of(page, size, sortDir.equals(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending());
        Page<BillingDetail> billingDetail = null;
        if (status != null) {
            billingDetail = billingDetailRepo.findByApartmentIdAndStatus(apartmentId, status, pageable);
        } else if(search != null) {
            billingDetail = billingDetailRepo.findByApartmentIdAndId(apartmentId, Integer.parseInt(search), pageable);
        } else {
            billingDetail = billingDetailRepo.findByApartmentId(apartmentId, pageable);
        }

        List<BillingDetailResponse> data = new ArrayList<>();
        billingDetail.getContent().forEach(request -> {
            data.add(getBillingDetailById(request.getId()));
        });

        PageResponse<BillingDetailResponse> response = new PageResponse<>(
                billingDetail.getTotalElements(),
                billingDetail.getTotalPages(),
                billingDetail.getNumber(),
                billingDetail.getSize(),
                data);
        return response;
    }

    @Override
    public PageResponse<BillingDetailResponse> getBillingDetailListByResidentId(int page, int size, String sortBy, String sortDir, String status, Integer residentId, String search) {
        Specification<BillingDetail> spec = Specification.where(BillingSpecification.billingDetailHasResidentId(residentId));
        if (status != null) {
            spec = spec.and(BillingSpecification.billingDetailHasStatus(status));
        }
        if (search != null) {
            spec = spec.and(BillingSpecification.billingDetailHasId(search));
        }
        Pageable pageable = PageRequest.of(page, size, sortDir.equals(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending());

        Page<BillingDetail> billingDetail = billingDetailRepo.findAll(spec, pageable);

        List<BillingDetailResponse> data = new ArrayList<>();
        billingDetail.getContent().forEach(request -> {
            data.add(getBillingDetailById(request.getId()));
        });

        PageResponse<BillingDetailResponse> response = new PageResponse<>(
                billingDetail.getTotalElements(),
                billingDetail.getTotalPages(),
                billingDetail.getNumber(),
                billingDetail.getSize(),
                data);
        return response;
    }

    @Override
    public BillingDetail addBillingDetail(BillingDetailRequest billingDetailRequest) {
        BillingDetail billingDetail = new BillingDetail();
        billingDetail.setBillingId(billingDetailRequest.getBillingId());
        billingDetail.setResidentId(billingDetailRequest.getResidentId());
        billingDetail.setAmount(billingDetailRequest.getAmount());
        billingDetail.setDueDate(billingDetailRequest.getDueDate());
        billingDetail.setStatus(AparteoneConstant.STATUS_WAITING_PAYMENT);
        billingDetail = billingDetailRepo.save(billingDetail);

        notificationService.sendNotification(billingDetailRequest.getResidentId(), "Bills BLN00" + billingDetail.getId(), "You have a new bills");
        return billingDetail;
    }

    @Override
    public BillingDetail updateBillingDetail(Integer billingDetailId, String status) {
        BillingDetail billingDetail = billingDetailRepo.findById(billingDetailId).get();
        if (status.equals(AparteoneConstant.STATUS_CANCELLED)) {
            billingDetail.setStatus(AparteoneConstant.STATUS_CANCELLED);
            billingDetail.setCancelledDate(new Date());
            notificationService.sendNotification(billingDetail.getResidentId(), "Bills BLN00" + billingDetail.getId(), "Your bills is cancelled");
        }
        return billingDetailRepo.save(billingDetail);
    }

    @Override
    public BillingDetail payment(PaymentRequest paymentRequest) {
        BillingDetail billingDetail = billingDetailRepo.findById(paymentRequest.getId()).get();

        Payment payment = new Payment();
        payment.setPaymentProofImage(paymentRequest.getPaymentProofImage());
        payment.setPaymentDate(new Date());
        payment.setIsValid(false);
        payment = paymentRepo.save(payment);

        billingDetail.setPaymentId(payment.getId());
        billingDetail.setStatus(AparteoneConstant.STATUS_WAITING_CONFIRMATION);

        Billing billing = billingRepo.findById(billingDetail.getBillingId()).get();

        notificationService.sendNotification(billing.getApartmentId(), "Bills BLN00" + billingDetail.getId(), "You have a new payment to approve");
        return billingDetailRepo.save(billingDetail);
    }

    @Override
    public BillingDetail verifyPayment(Integer billingDetailId, Boolean isValid) {
        BillingDetail billingDetail = billingDetailRepo.findById(billingDetailId).get();

        Payment payment = paymentRepo.findById(billingDetail.getPaymentId()).get();
        payment.setIsValid(isValid);
        payment.setVerifiedDate(new Date());

        billingDetail.setStatus((payment.getIsValid() == true) ? AparteoneConstant.STATUS_COMPLETED : AparteoneConstant.STATUS_CANCELLED);

        notificationService.sendNotification(billingDetail.getResidentId(), "Bills BLN00" + billingDetailId, "Your billing payment has been " + (payment.getIsValid() == true ? "approved" : "rejected"));
        return billingDetailRepo.save(billingDetail);
    }

    @Override
    public Integer countBillingDetailByResidentId(Integer residentId) {
        return billingDetailRepo.countByResidentId(residentId);
    }
}
