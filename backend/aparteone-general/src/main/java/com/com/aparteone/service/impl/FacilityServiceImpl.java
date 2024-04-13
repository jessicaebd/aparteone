package com.com.aparteone.service.impl;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.com.aparteone.constant.AparteoneConstant;
import com.com.aparteone.dto.ResidentDTO;
import com.com.aparteone.dto.general.PageDTO;
import com.com.aparteone.dto.request.FacilityCategoryRequest;
import com.com.aparteone.dto.request.FacilityReserveRequest;
import com.com.aparteone.dto.request.FacilityTimeRequest;
import com.com.aparteone.dto.response.FacilityCategoryResponse;
import com.com.aparteone.dto.response.FacilityRequestResponse;
import com.com.aparteone.entity.Facility;
import com.com.aparteone.entity.FacilityRequest;
import com.com.aparteone.entity.FacilityTime;
import com.com.aparteone.repository.FacilityRepo;
import com.com.aparteone.repository.FacilityRequestRepo;
import com.com.aparteone.repository.FacilityTimeRepo;
import com.com.aparteone.service.FacilityService;
import com.com.aparteone.service.ResidentService;
import com.com.aparteone.specification.FacilityRequestSpecification;
import com.com.aparteone.specification.FacilitySpecification;

@Service
@Transactional
public class FacilityServiceImpl implements FacilityService {

    @Autowired
    private FacilityRepo facilityRepo;

    @Autowired
    private FacilityTimeRepo facilityTimeRepo;

    @Autowired
    private FacilityRequestRepo facilityRequestRepo;

    @Autowired
    private ResidentService residentService;

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
    public PageDTO<FacilityCategoryResponse> getFacilityListByApartmentId(int page, int size, Boolean isActive, Integer apartmentId) {
        Specification<Facility> spec = Specification.where(FacilitySpecification.hasApartmentId(apartmentId));
        if (isActive != null) {
            if (isActive) {
                spec = spec.and(FacilitySpecification.isActive());
            } else {
                spec = spec.and(FacilitySpecification.isNotActive());
            }
        }
        Pageable pageable = pagination(page, size, null, null);
        Page<Facility> facilities = facilityRepo.findAll(spec, pageable);

        List<FacilityCategoryResponse> data = new ArrayList<>();
        facilities.getContent().forEach(facility -> {
            List<FacilityTime> facilityTimes = facilityTimeRepo.findByFacilityId(facility.getId());
            data.add(new FacilityCategoryResponse(facility, facilityTimes));
        });

        PageDTO<FacilityCategoryResponse> response = new PageDTO<>(
                facilities.getTotalElements(),
                facilities.getTotalPages(),
                facilities.getNumber(),
                facilities.getSize(),
                data);
        return response;
    }

    @Override
    public Facility insertFacility(FacilityCategoryRequest request) {
        Facility facility = new Facility(request);
        facilityRepo.save(facility);

        request.getFacilityTime().forEach(time -> {
            FacilityTime facilityTime = new FacilityTime(
                    facility.getId(),
                    time.getStartTime(),
                    time.getEndTime());
            facilityTimeRepo.save(facilityTime);
        });
        return facilityRepo.save(facility);
    }

    @Override
    public Facility updateFacilityIsActive(Integer facilityId, Boolean isActive) {
        Facility facility = facilityRepo.findById(facilityId).get();
        facility.setIsActive(isActive);
        return facilityRepo.save(facility);
    }

    @Override
    public FacilityTime updateFacilityTime(Integer facilityTimeId, FacilityTimeRequest facilityTimeRequest,
            Boolean isActive) {
        FacilityTime facilityTime = facilityTimeRepo.findById(facilityTimeId).get();
        if (isActive != null) {
            facilityTime.setIsActive(isActive);
        }
        if (facilityTimeRequest.getStartTime() != null) {
            facilityTime.setStartTime(LocalTime.parse(facilityTimeRequest.getStartTime()));
        }
        if (facilityTimeRequest.getEndTime() != null) {
            facilityTime.setEndTime(LocalTime.parse(facilityTimeRequest.getEndTime()));
        }
        return facilityTimeRepo.save(facilityTime);
    }

    @Override
    public PageDTO<FacilityRequestResponse> getFacilityRequestListByResidentId(int page, int size, String sortBy,
            String sortDir, String status, Integer residentId) {
        Specification<FacilityRequest> spec = Specification
                .where(FacilityRequestSpecification.hasResidentId(residentId));
        if (status != null) {
            if (status == AparteoneConstant.STATUS_REQUESTED) {
                spec = spec.and(FacilityRequestSpecification.isRequested());
            } else if (status == AparteoneConstant.STATUS_COMPLETED) {
                spec = spec.and(FacilityRequestSpecification.isCompleted());
            } else if (status == AparteoneConstant.STATUS_CANCELLED) {
                spec = spec.and(FacilityRequestSpecification.isCancelled());
            }
        }
        Pageable pageable = pagination(page, size, sortBy, sortDir);
        Page<FacilityRequest> facilityRequests = facilityRequestRepo.findAll(spec, pageable);

        List<FacilityRequestResponse> data = new ArrayList<>();
        facilityRequests.forEach(request -> {
            data.add(getFacilityRequestById(request.getId()));
        });

        PageDTO<FacilityRequestResponse> response = new PageDTO<>(
                facilityRequests.getTotalElements(),
                facilityRequests.getTotalPages(),
                facilityRequests.getNumber(),
                facilityRequests.getSize(),
                data);
        return response;
    }

    @Override
    public PageDTO<FacilityRequestResponse> getFacilityRequestListByApartmentId(int page, int size, String sortBy,
            String sortDir, String status, Integer apartmentId) {
        Pageable pageable = pagination(page, size, sortBy, sortDir);
        Page<FacilityRequest> facilityRequests = null;
        if (status == null) {
            facilityRequests = facilityRequestRepo.findByApartmentId(apartmentId, pageable);
        } else {
            facilityRequests = facilityRequestRepo.findByApartmentIdAndStatus(apartmentId, status, pageable);
        }

        List<FacilityRequestResponse> data = new ArrayList<>();
        facilityRequests.forEach(request -> {
            data.add(getFacilityRequestById(request.getId()));
        });

        PageDTO<FacilityRequestResponse> response = new PageDTO<>(
                facilityRequests.getTotalElements(),
                facilityRequests.getTotalPages(),
                facilityRequests.getNumber(),
                facilityRequests.getSize(),
                data);
        return response;
    }

    @Override
    public FacilityRequestResponse getFacilityRequestById(Integer facilityRequestId) {
        FacilityRequest request = facilityRequestRepo.findById(facilityRequestId).get();
        FacilityTime time = facilityTimeRepo.findById(request.getFacilityTimeId()).get();
        Facility category = facilityRepo.findById(time.getFacilityId()).get();
        ResidentDTO resident = residentService.getResidentById(request.getResidentId());
        FacilityRequestResponse response = new FacilityRequestResponse(resident, request, time, category);
        return response;
    }

    @Override
    public FacilityRequest insertFacilityRequest(FacilityReserveRequest request) {
        FacilityRequest facilityRequest = new FacilityRequest(request);
        return facilityRequestRepo.save(facilityRequest);
    }

    @Override
    public FacilityRequest updateFacilityRequestStatusById(Integer facilityRequestId, String status) {
        FacilityRequest facilityRequest = facilityRequestRepo.findById(facilityRequestId).get();
        if (status.equals(AparteoneConstant.STATUS_COMPLETED)) {
            facilityRequest.setStatus(status);
            facilityRequest.setCompletedDate(new Date());
        } else if (status.equals(AparteoneConstant.STATUS_CANCELLED)) {
            facilityRequest.setStatus(status);
            facilityRequest.setCancelledDate(new Date());
        }
        return facilityRequestRepo.save(facilityRequest);
    }
}