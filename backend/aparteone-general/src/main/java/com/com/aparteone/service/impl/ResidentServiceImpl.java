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
import com.com.aparteone.dto.ApartmentUnitDTO;
import com.com.aparteone.dto.ResidentResponse;
import com.com.aparteone.dto.base.PageResponse;
import com.com.aparteone.dto.request.auth.RegisterResidentRequest;
import com.com.aparteone.entity.Resident;
import com.com.aparteone.repository.ResidentRepo;
import com.com.aparteone.service.ApartmentService;
import com.com.aparteone.service.NotificationService;
import com.com.aparteone.service.ResidentService;
import com.com.aparteone.specification.ResidentSpecification;

@Service
public class ResidentServiceImpl implements ResidentService {

    @Autowired
    private ResidentRepo residentRepo;

    @Autowired
    private ApartmentService apartmentService;

    @Autowired
    private NotificationService notificationService;

    @Override
    public PageResponse<ResidentResponse> searchResident(int page, int size, String sortBy, String sortDir, Integer apartmentId, Boolean isActive, String search) {
        Pageable pageable = PageRequest.of(page, size, sortDir.equals(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending());
        Specification<Resident> spec = Specification.where(null);
        if (apartmentId != null) {
            spec = spec.and(ResidentSpecification.hasApartmentId(apartmentId));
        }
        if (isActive != null) {
            spec = spec.and(ResidentSpecification.isActive(isActive));
        }
        if (search != null) {
            spec = spec.and(ResidentSpecification.hasName(search));
        }
        Page<Resident> residents = residentRepo.findAll(spec, pageable);

        List<ResidentResponse> data = new ArrayList<>();
        residents.getContent().forEach(resident -> {
            data.add(getResidentById(resident.getId()));
        });

        PageResponse<ResidentResponse> response = new PageResponse<>(
                residents.getTotalElements(),
                residents.getTotalPages(),
                residents.getNumber(),
                residents.getSize(),
                data);
        return response;
    }

    @Override
    public PageResponse<ResidentResponse> getResidentList(int page, int size, String sortBy, String sortDir, Boolean isActive, Boolean isApproved, Integer apartmentId) {
        Pageable pageable = PageRequest.of(page, size, sortDir.equals(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending());
        Specification<Resident> spec = Specification.where(null);
        if (isActive != null) {
            spec = spec.and(ResidentSpecification.isActive(isActive));
        }
        if (apartmentId != null) {
            spec = spec.and(ResidentSpecification.hasApartmentId(apartmentId));
        }
        if (isApproved != null) {
            spec = spec.and(ResidentSpecification.isApproved(isApproved));
        }
        Page<Resident> residents = residentRepo.findAll(spec, pageable);

        List<ResidentResponse> data = new ArrayList<>();
        residents.getContent().forEach(resident -> {
            data.add(getResidentById(resident.getId()));
        });

        PageResponse<ResidentResponse> response = new PageResponse<>(
                residents.getTotalElements(),
                residents.getTotalPages(),
                residents.getNumber(),
                residents.getSize(),
                data);
        return response;
    }

    @Override
    public ResidentResponse getResidentById(Integer residentId) {
        Resident resident = residentRepo.findById(residentId).get();
        ApartmentUnitDTO apartmentUnit = apartmentService.getApartmentUnitById(resident.getApartmentUnitId());

        ResidentResponse response = new ResidentResponse(
                residentId,
                apartmentUnit.getApartmentId(),
                apartmentUnit.getId(),
                resident.getImage(),
                resident.getName(),
                resident.getType(),
                apartmentUnit.getApartmentName(),
                apartmentUnit.getUnitNumber(),
                apartmentUnit.getType(),
                resident.getIsActive() ? AparteoneConstant.STATUS_ACTIVE : AparteoneConstant.STATUS_INACTIVE,
                resident.getIsApproved() == null ? AparteoneConstant.STATUS_PENDING : (resident.getIsApproved() ? AparteoneConstant.STATUS_APPROVED : AparteoneConstant.STATUS_REJECTED));
        return response;
    }

    @Override
    public Resident approveResident(Integer residentId, Boolean isApproved) {
        Resident resident = residentRepo.findById(residentId).get();
        resident.setIsActive(isApproved);
        resident.setIsApproved(isApproved);

        notificationService.sendNotification(residentId, "Hello!", "Your registration has been " + (isApproved ? "approved" : "rejected"));
        return residentRepo.save(resident);
    }

    @Override
    public Resident addResident(Integer userId, RegisterResidentRequest request) {
        Resident resident = new Resident(
                userId,
                request.getApartmentId(),
                request.getApartmentUnitId(),
                request.getImage(),
                request.getName(),
                request.getType(),
                false,
                null);

        notificationService.sendNotification(request.getApartmentId(), "Resident Approval", "You have a new resident to approve");
        return residentRepo.save(resident);
    }

    @Override
    public Resident updateResidentStatus(Integer residentId, Boolean isActive) {
        Resident resident = residentRepo.findById(residentId).get();
        resident.setIsActive(isActive);
        return residentRepo.save(resident);
    }
}
