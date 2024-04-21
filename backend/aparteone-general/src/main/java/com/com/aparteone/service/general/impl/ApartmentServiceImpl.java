package com.com.aparteone.service.general.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.com.aparteone.dto.ApartmentDTO;
import com.com.aparteone.dto.ApartmentUnitDTO;
import com.com.aparteone.dto.base.PageResponse;
import com.com.aparteone.dto.request.auth.RegisterApartmentRequest;
import com.com.aparteone.entity.general.Apartment;
import com.com.aparteone.entity.general.ApartmentUnit;
import com.com.aparteone.repository.general.ApartmentRepo;
import com.com.aparteone.repository.general.ApartmentUnitRepo;
import com.com.aparteone.service.general.ApartmentService;
import com.com.aparteone.specification.ApartmentSpecification;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class ApartmentServiceImpl implements ApartmentService {

    @Autowired
    private ApartmentRepo apartmentRepo;

    @Autowired
    private ApartmentUnitRepo apartmentUnitRepo;

    public Pageable pagination(int page, int size, String sortBy, String sortDir) {
        Pageable pageable = null;
        if (sortBy != null && sortDir != null) {
            pageable = PageRequest.of(page, size,
                    sortDir.equals(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending()
                            : Sort.by(sortBy).descending());
        } else {
            pageable = PageRequest.of(page, size);
        }
        return pageable;
    }

    @Override
    public PageResponse<ApartmentDTO> searchApartment(int page, int size, String sortBy, String sortDir, String search) {
        Specification<Apartment> spec = Specification.where(ApartmentSpecification.hasName(search));
        Pageable pageable = pagination(page, size, sortBy, sortDir);
        Page<Apartment> apartments = apartmentRepo.findAll(spec, pageable);
        List<ApartmentDTO> data = new ArrayList<>();
        apartments.getContent().forEach(apartment -> {
            data.add(getApartmentById(apartment.getId()));
        });

        PageResponse<ApartmentDTO> response = new PageResponse<>(
                apartments.getTotalElements(),
                apartments.getTotalPages(),
                apartments.getNumber(),
                apartments.getSize(),
                data);
        return response;
    }

    @Override
    public PageResponse<ApartmentDTO> getApartmentList(int page, int size, String sortBy, String sortDir,
            Boolean isActive, Boolean isApproved) {
        Specification<Apartment> spec = Specification.where(null);
        if (isActive != null) {
            spec = spec.and(ApartmentSpecification.isActive(isActive));
        }
        if (isApproved != null) {
            spec = spec.and(ApartmentSpecification.isApproved(isApproved));
        }
        Pageable pageable = pagination(page, size, sortBy, sortDir);
        Page<Apartment> apartments = apartmentRepo.findAll(spec, pageable);

        List<ApartmentDTO> data = new ArrayList<>();
        apartments.getContent().forEach(apartment -> {
            data.add(getApartmentById(apartment.getId()));
        });

        PageResponse<ApartmentDTO> response = new PageResponse<>(
                apartments.getTotalElements(),
                apartments.getTotalPages(),
                apartments.getNumber(),
                apartments.getSize(),
                data);
        return response;
    }

    @Override
    public ApartmentDTO getApartmentById(Integer apartmentId) {
        Apartment apartment = apartmentRepo.findById(apartmentId).get();
        ApartmentDTO response = new ApartmentDTO(
                apartment.getId(),
                apartment.getImage(),
                apartment.getName(),
                apartment.getAddress(),
                apartment.getProvince(),
                apartment.getCity(),
                apartment.getPostalCode(),
                apartment.getLatitude(),
                apartment.getLongitude(),
                apartment.getIsActive(),
                apartment.getIsApproved());
        return response;
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
        Pageable pageable = pagination(page, size, sortBy, sortDir);
        Specification<ApartmentUnit> spec = Specification.where(ApartmentSpecification.hasApartmentId(apartmentId))
                                                        .and(ApartmentSpecification.hasUnitNumber(search));

        Page<ApartmentUnit> apartmentUnits = apartmentUnitRepo.findAll(spec, pageable);

        List<ApartmentUnitDTO> data = new ArrayList<>();
        apartmentUnits.getContent().forEach(apartmentUnit -> {
            data.add(new ApartmentUnitDTO(
                    apartmentUnit.getId(),
                    apartmentUnit.getApartmentId(),
                    apartmentUnit.getUnitNumber(),
                    apartmentUnit.getType()));
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
    public PageResponse<ApartmentUnitDTO> getApartmentUnitListByApartmentId(int page, int size, String sortBy,
            String sortDir, Integer apartmentId) {
        Specification<ApartmentUnit> spec = Specification.where(ApartmentSpecification.hasApartmentId(apartmentId));
        Pageable pageable = pagination(page, size, sortBy, sortDir);
        Page<ApartmentUnit> apartmentUnits = apartmentUnitRepo.findAll(spec, pageable);

        List<ApartmentUnitDTO> data = new ArrayList<>();
        apartmentUnits.getContent().forEach(apartmentUnit -> {
            data.add(new ApartmentUnitDTO(
                    apartmentUnit.getId(),
                    apartmentUnit.getApartmentId(),
                    apartmentUnit.getUnitNumber(),
                    apartmentUnit.getType()));
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
            false
        );
        return apartmentRepo.save(apartment);
    }

    @Override
    public Apartment updateApartment(Integer apartmentId, Boolean isActive, ApartmentDTO apartmentDTO) { 
        Apartment apartment = apartmentRepo.findById(apartmentId).get();
        if(isActive != null) {
            apartment.setIsActive(isActive);
        }
        if(apartmentDTO != null) {
            if(apartmentDTO.getName() != null) {
                apartment.setName(apartmentDTO.getName());
            }
            if(apartmentDTO.getAddress() != null) {
                apartment.setAddress(apartmentDTO.getAddress());
            }
            if(apartmentDTO.getProvince() != null) {
                apartment.setProvince(apartmentDTO.getProvince());
            }
            if(apartmentDTO.getCity() != null) {
                apartment.setCity(apartmentDTO.getCity());
            }
            if(apartmentDTO.getPostalCode() != null) {
                apartment.setPostalCode(apartmentDTO.getPostalCode());
            }
            if(apartmentDTO.getLatitude() != null) {
                apartment.setLatitude(apartmentDTO.getLatitude());
            }
            if(apartmentDTO.getLongitude() != null) {
                apartment.setLongitude(apartmentDTO.getLongitude());
            }
        }
        return apartmentRepo.save(apartment);
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
        if(apartmentUnitDTO != null) {
            if(apartmentUnitDTO.getUnitNumber() != null) {
                apartmentUnit.setUnitNumber(apartmentUnitDTO.getUnitNumber());
            }
            if(apartmentUnitDTO.getType() != null) {
                apartmentUnit.setType(apartmentUnitDTO.getType());
            }
        }
        return apartmentUnitRepo.save(apartmentUnit);
    }
}
