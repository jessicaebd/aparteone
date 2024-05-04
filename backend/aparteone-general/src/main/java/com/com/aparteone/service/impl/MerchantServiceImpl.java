package com.com.aparteone.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.com.aparteone.constant.AparteoneConstant;
import com.com.aparteone.dto.ApartmentResponse;
import com.com.aparteone.dto.MerchantResponse;
import com.com.aparteone.dto.base.PageResponse;
import com.com.aparteone.dto.request.auth.RegisterMerchantRequest;
import com.com.aparteone.entity.Merchant;
import com.com.aparteone.repository.MerchantRepo;
import com.com.aparteone.service.ApartmentService;
import com.com.aparteone.service.MerchantService;
import com.com.aparteone.service.NotificationService;
import com.com.aparteone.specification.MerchantSpecification;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class MerchantServiceImpl implements MerchantService {

    @Autowired
    private MerchantRepo merchantRepo;

    @Autowired
    private ApartmentService apartmentService;

    @Autowired
    private NotificationService notificationService;
    
    @Override
    public PageResponse<MerchantResponse> searchMerchant(int page, int size, String sortBy, String sortDir, Integer apartmentId, Boolean isActive, String search) {
        Specification<Merchant> spec = Specification.where(null);
        if(apartmentId != null) {
            spec = spec.and(MerchantSpecification.hasApartmentId(apartmentId));
        }
        if(isActive != null) {
            spec = spec.and(MerchantSpecification.isActive(isActive));
        }
        if(search != null) {
            spec = spec.and(MerchantSpecification.hasName(search));
        }
        Pageable pageable = PageRequest.of(page, size, sortDir.equals(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending());
        Page<Merchant> merchants = merchantRepo.findAll(spec, pageable);

        List<MerchantResponse> data = new ArrayList<>();
        merchants.getContent().forEach(merchant -> {
            data.add(getMerchantById(merchant.getId()));
        });

        PageResponse<MerchantResponse> response = new PageResponse<>(
                merchants.getTotalElements(),
                merchants.getTotalPages(),
                merchants.getNumber(),
                merchants.getSize(),
                data);
        return response;
    }

    @Override
    public PageResponse<MerchantResponse> getMerchantList(int page, int size, String sortBy, String sortDir, Boolean isActive, String isApproved, Integer apartmentId) {
        Specification<Merchant> spec = Specification.where(null);
        if (isActive != null) {
            spec = spec.and(MerchantSpecification.isActive(isActive));
        }
        if (isApproved != null) {
            if(isApproved.equals(AparteoneConstant.STATUS_PENDING)) {
                spec = spec.and(MerchantSpecification.isNotApproved());
            } else if(isApproved.equals(AparteoneConstant.STATUS_APPROVED)) {
                spec = spec.and(MerchantSpecification.isApproved(true));
            } else if(isApproved.equals(AparteoneConstant.STATUS_REJECTED)) {
                spec = spec.and(MerchantSpecification.isApproved(false));
            }
        }
        if (apartmentId != null) {
            spec = spec.and(MerchantSpecification.hasApartmentId(apartmentId));
        }
        Pageable pageable = PageRequest.of(page, size, sortDir.equals(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending());
        Page<Merchant> merchants = merchantRepo.findAll(spec, pageable);

        List<MerchantResponse> data = new ArrayList<>();
        merchants.getContent().forEach(merchant -> {
            data.add(getMerchantById(merchant.getId()));
        });

        PageResponse<MerchantResponse> response = new PageResponse<>(
                merchants.getTotalElements(),
                merchants.getTotalPages(),
                merchants.getNumber(),
                merchants.getSize(),
                data);
        return response;
    }

    @Override
    public MerchantResponse getMerchantById(Integer merchantId) {
        Merchant merchant = merchantRepo.findById(merchantId).get();
        ApartmentResponse apartment = apartmentService.getApartmentById(merchant.getApartmentId());

        MerchantResponse merchantDTO = new MerchantResponse(
                merchant.getId(),
                merchant.getApartmentId(),
                apartment.getName(),
                merchant.getImage(),
                merchant.getName(),
                merchant.getBankAccount(),
                merchant.getAccountNumber(),
                merchant.getAccountName(),
                merchant.getCategory(),
                merchant.getAddress(),
                merchant.getIsActive() ? AparteoneConstant.STATUS_ACTIVE : AparteoneConstant.STATUS_INACTIVE,
                merchant.getIsApproved() == null ? AparteoneConstant.STATUS_PENDING : (merchant.getIsApproved() ? AparteoneConstant.STATUS_APPROVED : AparteoneConstant.STATUS_REJECTED));
        return merchantDTO;
    }

    @Override
    public Merchant approveMerchant(Integer merchantId, Boolean isApproved) {
        Merchant merchant = merchantRepo.findById(merchantId).get();
        merchant.setIsActive(isApproved);
        merchant.setIsApproved(isApproved);
        merchantRepo.save(merchant);

        notificationService.sendNotification(merchantId, "Hello!", "Your registration has been " + (isApproved ? "approved" : "rejected"));
        return merchant;
    }

    @Override
    public Merchant addMerchant(Integer userId, RegisterMerchantRequest request) {
        Merchant merchant = new Merchant(
                userId,
                request.getApartmentId(),
                request.getImage(),
                request.getName(),
                request.getBankAccount(),
                request.getAccountNumber(),
                request.getAccountName(),
                request.getCategory(),
                request.getAddress(),
                false,
                null
        );

        notificationService.sendNotification(request.getApartmentId(), "Merchant Approval", "You have a new merchant to approve");
        return merchantRepo.save(merchant);
    }

    @Override
    public Merchant updateMerchant(Integer merchantId, Boolean isActive, RegisterMerchantRequest merchantDTO) {
        Merchant merchant = merchantRepo.findById(merchantId).get();
        if(isActive != null) {
            merchant.setIsActive(isActive);
        }
        if(merchantDTO != null) {
            if(merchantDTO.getImage() != null) {
                merchant.setImage(merchantDTO.getImage());
            }
            if(merchantDTO.getName() != null) {
                merchant.setName(merchantDTO.getName());
            }
            if(merchantDTO.getBankAccount() != null) {
                merchant.setBankAccount(merchantDTO.getBankAccount());
            }
            if(merchantDTO.getAccountNumber() != null) {
                merchant.setAccountNumber(merchantDTO.getAccountNumber());
            }
            if(merchantDTO.getAccountName() != null) {
                merchant.setAccountName(merchantDTO.getAccountName());
            }
            if(merchantDTO.getCategory() != null) {
                merchant.setCategory(merchantDTO.getCategory());
            }
            if(merchantDTO.getAddress() != null) {
                merchant.setAddress(merchantDTO.getAddress());
            }
        }
        return merchantRepo.save(merchant);
    }

    @Override
    public Integer countMerchant(Integer apartmentId) {
        Specification<Merchant> spec = Specification.where(null);
        if (apartmentId != null) {
            spec = spec.and(MerchantSpecification.hasApartmentId(apartmentId));
        }
        return merchantRepo.findAll(spec).size();
    }
}
