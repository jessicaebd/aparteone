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
import com.com.aparteone.entity.general.Merchant;
import com.com.aparteone.repository.general.MerchantRepo;
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
        // Specification<Merchant> spec = Specification.where(MerchantSpecification.hasApartmentId(apartmentId));
        // if (search != null) {
        //     spec = spec.and(MerchantSpecification.search(search));
        // }
        // Pageable pageable = pagination(page, size, sortBy, sortDir);
        // Page<Merchant> merchants = merchantRepo.findAll(spec, pageable

        // List<MerchantResponse> data = new ArrayList<>();
        // for (Merchant merchant : merchants.getContent()) {
        //     Apartment apartment = apartmentRepo.findById(merchant.getApartmentId()).get();
        //     data.add(new MerchantResponse(merchant, apartment));
        // }

        // PageResponse<MerchantResponse> response = new PageResponse<>(
        //         merchants.getTotalElements(),
        //         merchants.getTotalPages(),
        //         merchants.getNumber(),
        //         merchants.getSize(),
        //         data);
        return null;
    }

    @Override
    public PageResponse<MerchantDTO> getMerchantListByApartmentId(int page, int size, String sortBy, String sortDir, String category, Integer apartmentId) {
        Specification<Merchant> spec = Specification.where(MerchantSpecification.hasApartmentId(apartmentId));
        if (category != null) {
            spec = spec.and(MerchantSpecification.hasCategory(category));
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
                merchant.getIsActive() ? AparteoneConstant.STATUS_ACTIVE : AparteoneConstant.STATUS_INACTIVE);
        return merchantDTO;
    }

}
