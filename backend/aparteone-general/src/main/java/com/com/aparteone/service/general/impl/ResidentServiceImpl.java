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

import com.com.aparteone.dto.ResidentDTO;
import com.com.aparteone.dto.base.PageResponse;
import com.com.aparteone.dto.request.auth.RegisterResidentRequest;
import com.com.aparteone.entity.general.Apartment;
import com.com.aparteone.entity.general.ApartmentUnit;
import com.com.aparteone.entity.general.Resident;
import com.com.aparteone.entity.general.User;
import com.com.aparteone.repository.general.ApartmentRepo;
import com.com.aparteone.repository.general.ApartmentUnitRepo;
import com.com.aparteone.repository.general.ResidentRepo;
import com.com.aparteone.repository.general.UserRepo;
import com.com.aparteone.service.general.ResidentService;
import com.com.aparteone.specification.ResidentSpecification;

@Service
public class ResidentServiceImpl implements ResidentService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private ResidentRepo residentRepo;

    @Autowired
    private ApartmentRepo apartmentRepo;

    @Autowired
    private ApartmentUnitRepo apartmentUnitRepo;

    @Override
    public ResidentDTO getResidentById(Integer residentId) {
        User user = userRepo.findById(residentId).get();
        Resident resident = residentRepo.findById(residentId).get();
        ApartmentUnit apartmentUnit = apartmentUnitRepo.findById(resident.getApartmentUnitId()).get();
        Apartment apartment = apartmentRepo.findById(apartmentUnit.getApartmentId()).get();
        return new ResidentDTO(user, resident, apartmentUnit, apartment);
    }

    @Override
    public PageResponse<ResidentDTO> searchResident(int page, int size, String sortBy, String sortDir, Integer apartmentId, String search) {
        Pageable pageable = PageRequest.of(page, size, sortDir.equals(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending());
        Specification<Resident> spec = Specification.where(null);
        Page<Resident> residents = null;
        if(apartmentId != null) {
            residents = residentRepo.findByApartmentIdAndName(apartmentId, search, pageable);
        } else {
            residents = residentRepo.findByName(search, pageable);
        }

        List<ResidentDTO> data = new ArrayList<>();
        residents.getContent().forEach(resident -> {
            data.add(getResidentById(resident.getId()));
        });

        PageResponse<ResidentDTO> response = new PageResponse<>(
                residents.getTotalElements(),
                residents.getTotalPages(),
                residents.getNumber(),
                residents.getSize(),
                data);
        return response;
    }

    @Override
    public PageResponse<ResidentDTO> getResidentList(int page, int size, String sortBy, String sortDir, Boolean isActive, Integer apartmentId) {
        Pageable pageable = PageRequest.of(page, size, sortDir.equals(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending());
        Specification<Resident> spec = Specification.where(null);

        Page<Resident> residents = null;
        if (apartmentId != null) {
            if(isActive != null) {
                residents = residentRepo.findByApartmentIdAndIsActive(apartmentId, isActive, pageable);
            } else {
                residents = residentRepo.findByApartmentId(apartmentId, pageable);
            }
        } else {
            if (isActive != null) {
                spec = spec.and(ResidentSpecification.isActive(isActive));
            }
            residents = residentRepo.findAll(spec, pageable);
        }

        List<ResidentDTO> data = new ArrayList<>();
        residents.getContent().forEach(resident -> {
            data.add(getResidentById(resident.getId()));
        });

        PageResponse<ResidentDTO> response = new PageResponse<>(
                residents.getTotalElements(),
                residents.getTotalPages(),
                residents.getNumber(),
                residents.getSize(),
                data);
        return response;
    }

    @Override
    public Resident updateResidentStatus(Integer residentId, Boolean isActive) {
        Resident resident = residentRepo.findById(residentId).get();
        resident.setIsActive(isActive);
        return residentRepo.save(resident);
    }

    @Override
    public Resident approveResident(Integer residentId, Boolean isApproved) {
        Resident resident = residentRepo.findById(residentId).get();
        resident.setIsActive(isApproved);
        resident.setIsApproved(isApproved);
        return residentRepo.save(resident);
    }

    @Override
    public Resident addResident(Integer userId, RegisterResidentRequest request) {
        Resident resident = new Resident(
            userId,
            request.getApartmentUnitId(),
            request.getStatus(),
            false,
            false
        );
        return residentRepo.save(resident);
    }
}
