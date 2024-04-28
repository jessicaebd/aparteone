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
import com.com.aparteone.dto.ApartmentUnitDTO;
import com.com.aparteone.dto.base.PageResponse;
import com.com.aparteone.dto.request.auth.RegisterApartmentRequest;
import com.com.aparteone.entity.Apartment;
import com.com.aparteone.entity.ApartmentUnit;
import com.com.aparteone.repository.ApartmentRepo;
import com.com.aparteone.repository.ApartmentUnitRepo;
import com.com.aparteone.service.ApartmentService;
import com.com.aparteone.specification.ApartmentSpecification;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class ApartmentServiceImpl implements ApartmentService {

    @Autowired
    private ApartmentRepo apartmentRepo;

    @Autowired
    private ApartmentUnitRepo apartmentUnitRepo;

    @Override
    public PageResponse<ApartmentResponse> searchApartment(int page, int size, String sortBy, String sortDir, Boolean isActive, String search) {
        Specification<Apartment> spec = Specification.where(ApartmentSpecification.hasName(search));
        if(isActive != null) {
            spec = spec.and(ApartmentSpecification.isActive(isActive));
        }
        Pageable pageable = PageRequest.of(page, size, sortDir.equals(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending());
        Page<Apartment> apartments = apartmentRepo.findAll(spec, pageable);

        List<ApartmentResponse> data = new ArrayList<>();
        apartments.getContent().forEach(apartment -> {
            data.add(getApartmentById(apartment.getId()));
        });

        PageResponse<ApartmentResponse> response = new PageResponse<>(
                apartments.getTotalElements(),
                apartments.getTotalPages(),
                apartments.getNumber(),
                apartments.getSize(),
                data);
        return response;
    }

    @Override
    public PageResponse<ApartmentResponse> getApartmentList(int page, int size, String sortBy, String sortDir, Boolean isActive, Boolean isApproved) {
        Specification<Apartment> spec = Specification.where(null);
        if (isActive != null) {
            spec = spec.and(ApartmentSpecification.isActive(isActive));
        }
        if (isApproved != null) {
            spec = spec.and(ApartmentSpecification.isApproved(isApproved));
        }
        Pageable pageable = PageRequest.of(page, size, sortDir.equals(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending());
        Page<Apartment> apartments = apartmentRepo.findAll(spec, pageable);

        List<ApartmentResponse> data = new ArrayList<>();
        apartments.getContent().forEach(apartment -> {
            data.add(getApartmentById(apartment.getId()));
        });

        PageResponse<ApartmentResponse> response = new PageResponse<>(
                apartments.getTotalElements(),
                apartments.getTotalPages(),
                apartments.getNumber(),
                apartments.getSize(),
                data);
        return response;
    }

    @Override
    public ApartmentResponse getApartmentById(Integer apartmentId) {
        Apartment apartment = apartmentRepo.findById(apartmentId).get();
        ApartmentResponse response = new ApartmentResponse(
                apartment.getId(),
                apartment.getImage(),
                apartment.getName(),
                apartment.getAddress(),
                apartment.getProvince(),
                apartment.getCity(),
                apartment.getPostalCode(),
                apartment.getLatitude(),
                apartment.getLongitude(),
                (apartment.getIsActive()) ? AparteoneConstant.STATUS_ACTIVE : AparteoneConstant.STATUS_INACTIVE,
                (apartment.getIsApproved() == null) ? AparteoneConstant.STATUS_PENDING : (apartment.getIsApproved() ? AparteoneConstant.STATUS_APPROVED : AparteoneConstant.STATUS_REJECTED));
        return response;
    }

    @Override
    public Apartment approveApartment(Integer apartmentId, Boolean isApproved) {
        Apartment apartment = apartmentRepo.findById(apartmentId).get();
        apartment.setIsActive(isApproved);
        apartment.setIsApproved(isApproved);
        return apartmentRepo.save(apartment);
    }

    @Override
    public Apartment addApartment(Integer userId, RegisterApartmentRequest request) {
        Apartment apartment = new Apartment(
                userId,
                request.getImage(),
                request.getName(),
                request.getAddress(),
                request.getProvince(),
                request.getCity(),
                request.getPostalCode(),
                request.getLatitude(),
                request.getLongitude(),
                false,
                null);
        return apartmentRepo.save(apartment);
    }

    @Override
    public Apartment updateApartment(Integer apartmentId, Boolean isActive, ApartmentResponse apartmentDTO) {
        Apartment apartment = apartmentRepo.findById(apartmentId).get();
        if (isActive != null) {
            apartment.setIsActive(isActive);
        }
        if (apartmentDTO != null) {
            if (apartmentDTO.getName() != null) {
                apartment.setName(apartmentDTO.getName());
            }
            if (apartmentDTO.getAddress() != null) {
                apartment.setAddress(apartmentDTO.getAddress());
            }
            if (apartmentDTO.getProvince() != null) {
                apartment.setProvince(apartmentDTO.getProvince());
            }
            if (apartmentDTO.getCity() != null) {
                apartment.setCity(apartmentDTO.getCity());
            }
            if (apartmentDTO.getPostalCode() != null) {
                apartment.setPostalCode(apartmentDTO.getPostalCode());
            }
            if (apartmentDTO.getLatitude() != null) {
                apartment.setLatitude(apartmentDTO.getLatitude());
            }
            if (apartmentDTO.getLongitude() != null) {
                apartment.setLongitude(apartmentDTO.getLongitude());
            }
        }
        return apartmentRepo.save(apartment);
    }

    @Override
    public Integer getApartmentTotal(String criteria) {
        Specification<Apartment> spec = Specification.where(null);
        if (criteria != null) {
            spec = spec.and(ApartmentSpecification.isActive(true));
        }
        return (int) apartmentRepo.count(spec);
    }

    @Override
    public PageResponse<ApartmentUnitDTO> searchApartmentUnit(int page, int size, String sortBy, String sortDir, Integer apartmentId, String search) {
        Pageable pageable = PageRequest.of(page, size, sortDir.equals(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending());
        Specification<ApartmentUnit> spec = Specification.where(ApartmentSpecification.hasApartmentId(apartmentId)).and(ApartmentSpecification.hasUnitNumber(search));
        Page<ApartmentUnit> apartmentUnits = apartmentUnitRepo.findAll(spec, pageable);

        List<ApartmentUnitDTO> data = new ArrayList<>();
        apartmentUnits.getContent().forEach(apartmentUnit -> {
            data.add(getApartmentUnitById(apartmentUnit.getId()));
        });

        PageResponse<ApartmentUnitDTO> response = new PageResponse<>(
                apartmentUnits.getTotalElements(),
                apartmentUnits.getTotalPages(),
                apartmentUnits.getNumber(),
                apartmentUnits.getSize(),
                data);
        return response;
    }

    @Override
    public PageResponse<ApartmentUnitDTO> getApartmentUnitListByApartmentId(int page, int size, String sortBy, String sortDir, Integer apartmentId) {
        Specification<ApartmentUnit> spec = Specification.where(ApartmentSpecification.hasApartmentId(apartmentId));
        Pageable pageable = PageRequest.of(page, size, sortDir.equals(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending());
        Page<ApartmentUnit> apartmentUnits = apartmentUnitRepo.findAll(spec, pageable);

        List<ApartmentUnitDTO> data = new ArrayList<>();
        apartmentUnits.getContent().forEach(apartmentUnit -> {
            data.add(getApartmentUnitById(apartmentUnit.getId()));
        });

        PageResponse<ApartmentUnitDTO> response = new PageResponse<>(
                apartmentUnits.getTotalElements(),
                apartmentUnits.getTotalPages(),
                apartmentUnits.getNumber(),
                apartmentUnits.getSize(),
                data);
        return response;
    }

    @Override
    public ApartmentUnitDTO getApartmentUnitById(Integer apartmentUnitId) {
        ApartmentUnit apartmentUnit = apartmentUnitRepo.findById(apartmentUnitId).get();
        Apartment apartment = apartmentRepo.findById(apartmentUnit.getApartmentId()).get();

        ApartmentUnitDTO response = new ApartmentUnitDTO(
                apartmentUnit.getId(),
                apartmentUnit.getApartmentId(),
                apartment.getName(),
                apartmentUnit.getUnitNumber(),
                apartmentUnit.getType());
        return response;
    }

    @Override
    public ApartmentUnit addApartmentUnit(ApartmentUnitDTO apartmentUnitDTO) {
        ApartmentUnit apartmentUnit = new ApartmentUnit();
        apartmentUnit.setApartmentId(apartmentUnitDTO.getApartmentId());
        apartmentUnit.setUnitNumber(apartmentUnitDTO.getUnitNumber());
        apartmentUnit.setType(apartmentUnitDTO.getType());
        return apartmentUnitRepo.save(apartmentUnit);
    }

    @Override
    public ApartmentUnit updateApartmentUnit(Integer apartmentUnitId, ApartmentUnitDTO apartmentUnitDTO) {
        ApartmentUnit apartmentUnit = apartmentUnitRepo.findById(apartmentUnitId).get();
        if (apartmentUnitDTO != null) {
            if (apartmentUnitDTO.getUnitNumber() != null) {
                apartmentUnit.setUnitNumber(apartmentUnitDTO.getUnitNumber());
            }
            if (apartmentUnitDTO.getType() != null) {
                apartmentUnit.setType(apartmentUnitDTO.getType());
            }
        }
        return apartmentUnitRepo.save(apartmentUnit);
    }
}
