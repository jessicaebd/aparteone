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
import com.com.aparteone.dto.MerchantDTO;
import com.com.aparteone.dto.base.PageResponse;
import com.com.aparteone.dto.request.auth.RegisterMerchantRequest;
import com.com.aparteone.entity.Merchant;
import com.com.aparteone.repository.MerchantRepo;
import com.com.aparteone.service.MerchantService;
import com.com.aparteone.specification.MerchantSpecification;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class MerchantServiceImpl implements MerchantService {

    @Autowired
    private MerchantRepo merchantRepo;

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
    public PageResponse<MerchantDTO> searchMerchant(int page, int size, String sortBy, String sortDir, Integer apartmentId, String search) {
        Specification<Merchant> spec = Specification.where(null);
        if(apartmentId != null) {
            spec = spec.and(MerchantSpecification.hasApartmentId(apartmentId));
        }
        if(search != null) {
            spec = spec.and(MerchantSpecification.hasName(search));
        }
        Pageable pageable = pagination(page, size, sortBy, sortDir);
        Page<Merchant> merchants = merchantRepo.findAll(spec, pageable);

        List<MerchantDTO> data = new ArrayList<>();
        merchants.getContent().forEach(merchant -> {
            data.add(getMerchantById(merchant.getId()));
        });

        PageResponse<MerchantDTO> response = new PageResponse<>(
                merchants.getTotalElements(),
                merchants.getTotalPages(),
                merchants.getNumber(),
                merchants.getSize(),
                data);
        return response;
    }

    @Override
    public MerchantDTO getMerchantById(Integer merchantId) {
        Merchant merchant = merchantRepo.findById(merchantId).get();
        MerchantDTO merchantDTO = new MerchantDTO(
                merchant.getId(),
                merchant.getImage(),
                merchant.getName(),
                merchant.getBankAccount(),
                merchant.getAccountNumber(),
                merchant.getAccountName(),
                merchant.getCategory(),
                merchant.getAddress(),
                merchant.getIsActive() ? AparteoneConstant.STATUS_ACTIVE : AparteoneConstant.STATUS_INACTIVE,
                merchant.getIsApproved() ? AparteoneConstant.STATUS_APPROVED : AparteoneConstant.STATUS_PENDING);
        return merchantDTO;
    }

    @Override
    public PageResponse<MerchantDTO> getMerchantList(int page, int size, String sortBy, String sortDir, Boolean isActive, Boolean isApproved, Integer apartmentId) {
        Specification<Merchant> spec = Specification.where(null);
        if (isActive != null) {
            spec = spec.and(MerchantSpecification.isActive(isActive));
        }
        if (isApproved != null) {
            spec = spec.and(MerchantSpecification.isApproved(isApproved));
        }
        if (apartmentId != null) {
            spec = spec.and(MerchantSpecification.hasApartmentId(apartmentId));
        }
        Pageable pageable = pagination(page, size, sortBy, sortDir);
        Page<Merchant> merchants = merchantRepo.findAll(spec, pageable);

        List<MerchantDTO> data = new ArrayList<>();
        merchants.getContent().forEach(merchant -> {
            data.add(getMerchantById(merchant.getId()));
        });
        PageResponse<MerchantDTO> response = new PageResponse<>(
                merchants.getTotalElements(),
                merchants.getTotalPages(),
                merchants.getNumber(),
                merchants.getSize(),
                data);
        return response;
    }

    @Override
    public Merchant approveMerchant(Integer merchantId, Boolean isApproved) {
        Merchant merchant = merchantRepo.findById(merchantId).get();
        merchant.setIsApproved(isApproved);
        return merchantRepo.save(merchant);
    }

    @Override
    public Merchant updateMerchantStatus(Integer merchantId, Boolean isActive) {
        Merchant merchant = merchantRepo.findById(merchantId).get();
        merchant.setIsActive(isActive);
        return merchantRepo.save(merchant);
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
                false
        );
        return merchantRepo.save(merchant);
    }
}
