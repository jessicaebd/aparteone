package com.com.aparteone.service.impl;

import java.time.LocalTime;
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
import com.com.aparteone.dto.request.FacilityReserveRequest;
import com.com.aparteone.dto.request.category.FacilityCategoryRequest;
import com.com.aparteone.dto.request.category.FacilityTimeRequest;
import com.com.aparteone.dto.response.FacilityRequestResponse;
import com.com.aparteone.dto.response.category.FacilityCategoryResponse;
import com.com.aparteone.dto.response.category.FacilityTimeResponse;
import com.com.aparteone.entity.Facility;
import com.com.aparteone.entity.FacilityTime;
import com.com.aparteone.repository.FacilityRepo;
import com.com.aparteone.repository.FacilityRequestRepo;
import com.com.aparteone.repository.FacilityTimeRepo;
import com.com.aparteone.service.FacilityService;
import com.com.aparteone.service.general.ResidentService;
import com.com.aparteone.specification.FacilityRequestSpecification;
import com.com.aparteone.specification.FacilitySpecification;

import jakarta.transaction.Transactional;

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
            pageable = PageRequest.of(page, size, sortDir.equals(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending());
        } else {
            pageable = PageRequest.of(page, size);
        }
        return pageable;
    }

    @Override
    public Facility addFacility(FacilityCategoryRequest facilityCategoryRequest) {
        Facility facility = new Facility();
        facility.setApartmentId(facilityCategoryRequest.getApartmentId());
        facility.setImage(facilityCategoryRequest.getImage());
        facility.setCategory(facilityCategoryRequest.getCategory());
        facility.setDescription(facilityCategoryRequest.getDescription());
        facility.setIsActive(true);
        facilityRepo.save(facility);

        facilityCategoryRequest.getFacilityTime().forEach(time -> {
            FacilityTime facilityTime = new FacilityTime();
            facilityTime.setFacilityId(facility.getId());
            facilityTime.setStartTime(LocalTime.parse(time.getStartTime()));
            facilityTime.setEndTime(LocalTime.parse(time.getEndTime()));
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
    public FacilityTime updateFacilityTime(Integer facilityTimeId, FacilityTimeRequest facilityTimeRequest, Boolean isActive) {
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
    public PageResponse<FacilityCategoryResponse> getFacilityListByApartmentId(int page, int size, String sortBy, String sortDir, Boolean isActive, Integer apartmentId) {
        Specification<Facility> spec = Specification.where(FacilitySpecification.hasApartmentId(apartmentId));
        if (isActive != null) {
            spec = spec.and(FacilitySpecification.isActive(isActive));
        }
        Pageable pageable = pagination(page, size, sortBy, sortDir);
        Page<Facility> facilities = facilityRepo.findAll(spec, pageable);

        List<FacilityCategoryResponse> data = new ArrayList<>();
        facilities.getContent().forEach(facility -> {
            List<FacilityTime> facilityTimes = facilityTimeRepo.findByFacilityId(facility.getId());
            List<FacilityTimeResponse> times = new ArrayList<>();
            facilityTimes.forEach(time -> {
                times.add(new FacilityTimeResponse(
                        time.getStartTime(),
                        time.getEndTime(),
                        time.getIsActive() ? AparteoneConstant.STATUS_ACTIVE : AparteoneConstant.STATUS_INACTIVE,
                        null));
            });
            data.add(new FacilityCategoryResponse(
                    facility.getId(),
                    facility.getApartmentId(),
                    facility.getImage(),
                    facility.getCategory(),
                    facility.getDescription(),
                    facility.getIsActive() ? AparteoneConstant.STATUS_ACTIVE : AparteoneConstant.STATUS_INACTIVE,
                    times,
                    facility.getCreatedDate(),
                    facility.getModifiedDate()));
        });

        PageResponse<FacilityCategoryResponse> response = new PageResponse<>(
                facilities.getTotalElements(),
                facilities.getTotalPages(),
                facilities.getNumber(),
                facilities.getSize(),
                data);
        return response;
    }

    // @Override
    // public PageResponse<FacilityRequestResponse>
    // getFacilityRequestListByResidentId(int page, int size, String sortBy,
    // String sortDir, String status, Integer residentId) {
    // Specification<FacilityCategoryRequest> spec = Specification
    // .where(FacilityRequestSpecification.hasResidentId(residentId));
    // if (status != null) {
    // if (status == AparteoneConstant.STATUS_REQUESTED) {
    // spec = spec.and(FacilityRequestSpecification.isRequested());
    // } else if (status == AparteoneConstant.STATUS_COMPLETED) {
    // spec = spec.and(FacilityRequestSpecification.isCompleted());
    // } else if (status == AparteoneConstant.STATUS_CANCELLED) {
    // spec = spec.and(FacilityRequestSpecification.isCancelled());
    // }
    // }
    // Pageable pageable = pagination(page, size, sortBy, sortDir);
    // Page<FacilityCategoryRequest> facilityRequests =
    // facilityRequestRepo.findAll(spec, pageable);

    // List<FacilityRequestResponse> data = new ArrayList<>();
    // facilityRequests.forEach(request -> {
    // data.add(getFacilityRequestById(request.getId()));
    // });

    // PageResponse<FacilityRequestResponse> response = new PageResponse<>(
    // facilityRequests.getTotalElements(),
    // facilityRequests.getTotalPages(),
    // facilityRequests.getNumber(),
    // facilityRequests.getSize(),
    // data);
    // return response;
    // }

    // @Override
    // public PageResponse<FacilityRequestResponse>
    // getFacilityRequestListByApartmentId(int page, int size, String sortBy,
    // String sortDir, String status, Integer apartmentId) {
    // Pageable pageable = pagination(page, size, sortBy, sortDir);
    // Page<FacilityCategoryRequest> facilityRequests = null;
    // if (status == null) {
    // facilityRequests = facilityRequestRepo.findByApartmentId(apartmentId,
    // pageable);
    // } else {
    // facilityRequests =
    // facilityRequestRepo.findByApartmentIdAndStatus(apartmentId, status,
    // pageable);
    // }

    // List<FacilityRequestResponse> data = new ArrayList<>();
    // facilityRequests.forEach(request -> {
    // data.add(getFacilityRequestById(request.getId()));
    // });

    // PageResponse<FacilityRequestResponse> response = new PageResponse<>(
    // facilityRequests.getTotalElements(),
    // facilityRequests.getTotalPages(),
    // facilityRequests.getNumber(),
    // facilityRequests.getSize(),
    // data);
    // return response;
    // }

    // @Override
    // public FacilityRequestResponse getFacilityRequestById(Integer
    // facilityRequestId) {
    // FacilityCategoryRequest request =
    // facilityRequestRepo.findById(facilityRequestId).get();
    // FacilityTime time =
    // facilityTimeRepo.findById(request.getFacilityTimeId()).get();
    // Facility category = facilityRepo.findById(time.getFacilityId()).get();
    // ResidentDTO resident =
    // residentService.getResidentById(request.getResidentId());
    // FacilityRequestResponse response = new FacilityRequestResponse(resident,
    // request, time, category);
    // return response;
    // }

    // @Override
    // public FacilityCategoryRequest insertFacilityRequest(FacilityReserveRequest
    // request) {
    // FacilityCategoryRequest facilityRequest = new
    // FacilityCategoryRequest(request);
    // return facilityRequestRepo.save(facilityRequest);
    // }

    // @Override
    // public FacilityCategoryRequest updateFacilityRequestStatusById(Integer
    // facilityRequestId, String status) {
    // FacilityCategoryRequest facilityRequest =
    // facilityRequestRepo.findById(facilityRequestId).get();
    // if (status.equals(AparteoneConstant.STATUS_COMPLETED)) {
    // facilityRequest.setStatus(status);
    // facilityRequest.setCompletedDate(new Date());
    // } else if (status.equals(AparteoneConstant.STATUS_CANCELLED)) {
    // facilityRequest.setStatus(status);
    // facilityRequest.setCancelledDate(new Date());
    // }
    // return facilityRequestRepo.save(facilityRequest);
    // }
}