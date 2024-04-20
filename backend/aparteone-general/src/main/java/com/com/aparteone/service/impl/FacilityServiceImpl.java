package com.com.aparteone.service.impl;

import java.text.ParseException;
import java.text.SimpleDateFormat;
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
import com.com.aparteone.entity.FacilityRequest;
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
    public PageResponse<FacilityCategoryResponse> getFacilityListByApartmentId(int page, int size, String sortBy, String sortDir, Boolean isActive, Integer apartmentId) {
        Specification<Facility> spec = Specification.where(FacilitySpecification.hasApartmentId(apartmentId));
        if (isActive != null) {
            spec = spec.and(FacilitySpecification.isActive(isActive));
        }
        Pageable pageable = pagination(page, size, sortBy, sortDir);
        Page<Facility> facilities = facilityRepo.findAll(spec, pageable);

        List<FacilityCategoryResponse> data = new ArrayList<>();
        facilities.getContent().forEach(facility -> {
            data.add(new FacilityCategoryResponse(
                    facility.getId(),
                    facility.getApartmentId(),
                    facility.getImage(),
                    facility.getCategory(),
                    facility.getDescription(),
                    facility.getIsActive() ? AparteoneConstant.STATUS_ACTIVE : AparteoneConstant.STATUS_INACTIVE,
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
            facilityTime.setIsActive(true);
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
    public List<FacilityTimeResponse> getFacilityTimeByFacilityId(Integer facilityId, String date) throws ParseException {
        List<FacilityTime> facilityTimes = facilityTimeRepo.findFacilityTimeAvailable(facilityId, date);

        List<FacilityTimeResponse> data = new ArrayList<>();
        facilityTimes.forEach(time -> {
            data.add(new FacilityTimeResponse(
                    time.getId(),
                    time.getStartTime(),
                    time.getEndTime(),
                    time.getIsActive() ? AparteoneConstant.STATUS_ACTIVE : AparteoneConstant.STATUS_INACTIVE,
                    time.getIsAvailable()));
        });
        return data;
    }

    @Override
    public FacilityTime addFacilityTime(Integer facilityId, FacilityTimeRequest facilityTimeRequest) {
        FacilityTime facilityTime = new FacilityTime();
        facilityTime.setFacilityId(facilityId);
        facilityTime.setStartTime(LocalTime.parse(facilityTimeRequest.getStartTime()));
        facilityTime.setEndTime(LocalTime.parse(facilityTimeRequest.getEndTime()));
        facilityTime.setIsActive(true);
        return facilityTimeRepo.save(facilityTime);
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
    public FacilityRequestResponse getFacilityRequestById(Integer facilityRequestId) {
        FacilityRequest request = facilityRequestRepo.findById(facilityRequestId).get();
        FacilityTime time = facilityTimeRepo.findById(request.getFacilityTimeId()).get();
        Facility category = facilityRepo.findById(time.getFacilityId()).get();
        ResidentDTO resident = residentService.getResidentById(request.getResidentId());
        FacilityRequestResponse response = new FacilityRequestResponse(
                request.getId(),
                request.getResidentId(),
                resident.getName(),
                resident.getUnitNumber(),
                category.getId(),
                category.getCategory(),
                time.getId(),
                time.getStartTime(),
                time.getEndTime(),
                request.getStatus(),
                request.getReserveDate(),
                request.getCompletedDate(),
                request.getCancelledDate(),
                request.getCreatedDate(),
                request.getModifiedDate()
        );
        return response;
    }

    @Override
    public PageResponse<FacilityRequestResponse> getFacilityRequestListByApartmentId(int page, int size, String sortBy, String sortDir, String status, Integer apartmentId) {
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

        PageResponse<FacilityRequestResponse> response = new PageResponse<>(
                facilityRequests.getTotalElements(),
                facilityRequests.getTotalPages(),
                facilityRequests.getNumber(),
                facilityRequests.getSize(),
                data);
        return response;
    }

    @Override
    public PageResponse<FacilityRequestResponse> getFacilityRequestListByResidentId(int page, int size, String sortBy, String sortDir, String status, Integer residentId) {
        Specification<FacilityRequest> spec = Specification.where(FacilityRequestSpecification.hasResidentId(residentId));
        if (status != null) {
            spec = spec.and(FacilityRequestSpecification.hasStatus(status));
        }
        Pageable pageable = pagination(page, size, sortBy, sortDir);
        Page<FacilityRequest> facilityRequests = facilityRequestRepo.findAll(spec, pageable);

        List<FacilityRequestResponse> data = new ArrayList<>();
        facilityRequests.forEach(request -> {
            data.add(getFacilityRequestById(request.getId()));
        });

        PageResponse<FacilityRequestResponse> response = new PageResponse<>(
                facilityRequests.getTotalElements(),
                facilityRequests.getTotalPages(),
                facilityRequests.getNumber(),
                facilityRequests.getSize(),
                data);
        return response;
    }

    @Override
    public FacilityRequest addFacilityRequest(FacilityReserveRequest request) {
        FacilityRequest facilityRequest = new FacilityRequest();
        facilityRequest.setFacilityTimeId(request.getFacilityTimeId());
        facilityRequest.setResidentId(request.getResidentId());
        facilityRequest.setStatus(AparteoneConstant.STATUS_REQUESTED);
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        try {
            facilityRequest.setReserveDate(sdf.parse(request.getReserveDate()));
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return facilityRequestRepo.save(facilityRequest);
    }

    @Override
    public FacilityRequest updateFacilityRequestStatus(Integer facilityRequestId, String status) {
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