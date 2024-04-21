package com.com.aparteone.service.impl;

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
import com.com.aparteone.dto.ResidentResponse;
import com.com.aparteone.dto.base.PageResponse;
import com.com.aparteone.dto.request.MaintenanceReserveRequest;
import com.com.aparteone.dto.request.category.MaintenanceCategoryRequest;
import com.com.aparteone.dto.response.MaintenanceRequestResponse;
import com.com.aparteone.dto.response.category.MaintenanceCategoryResponse;
import com.com.aparteone.entity.Maintenance;
import com.com.aparteone.entity.MaintenanceRequest;
import com.com.aparteone.repository.MaintenanceRepo;
import com.com.aparteone.repository.MaintenanceRequestRepo;
import com.com.aparteone.service.MaintenanceService;
import com.com.aparteone.service.ResidentService;
import com.com.aparteone.specification.MaintenanceRequestSpecification;
import com.com.aparteone.specification.MaintenanceSpecification;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class MaintenanceServiceImpl implements MaintenanceService {

    @Autowired
    private MaintenanceRepo maintenanceRepo;

    @Autowired
    private MaintenanceRequestRepo maintenanceRequestRepo;

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
    public PageResponse<MaintenanceCategoryResponse> getMaintenanceListByApartmentId(int page, int size, String sortBy, String sortDir, Boolean isActive, Integer apartmentId) {
        Pageable pageable = pagination(page, size, sortBy, sortDir);
        Specification<Maintenance> spec = Specification.where(MaintenanceSpecification.hasApartmentId(apartmentId));
        if (isActive != null) {
            spec = spec.and(MaintenanceSpecification.isActive(isActive));
        }
        Page<Maintenance> maintenances = maintenanceRepo.findAll(spec, pageable);

        List<MaintenanceCategoryResponse> data = new ArrayList<>();
        maintenances.getContent().forEach(maintenance -> {
            data.add(new MaintenanceCategoryResponse(
                    maintenance.getId(),
                    maintenance.getApartmentId(),
                    maintenance.getImage(),
                    maintenance.getCategory(),
                    maintenance.getDescription(),
                    maintenance.getIsActive() ? AparteoneConstant.STATUS_ACTIVE : AparteoneConstant.STATUS_INACTIVE,
                    maintenance.getCreatedDate(),
                    maintenance.getModifiedDate()));
        });

        PageResponse<MaintenanceCategoryResponse> response = new PageResponse<>(
                maintenances.getTotalElements(),
                maintenances.getTotalPages(),
                maintenances.getNumber(),
                maintenances.getSize(),
                data);
        return response;
    }

    @Override
    public Maintenance addMaintenance(MaintenanceCategoryRequest request) {
        Maintenance maintenance = new Maintenance();
        maintenance.setApartmentId(request.getApartmentId());
        maintenance.setImage(request.getImage());
        maintenance.setCategory(request.getCategory());
        maintenance.setDescription(request.getDescription());
        maintenance.setIsActive(true);
        return maintenanceRepo.save(maintenance);
    }

    @Override
    public Maintenance updateMaintenanceIsActive(Integer maintenanceId, Boolean isActive) {
        Maintenance maintenance = maintenanceRepo.findById(maintenanceId).get();
        maintenance.setIsActive(isActive);
        return maintenanceRepo.save(maintenance);
    }

    @Override
    public PageResponse<MaintenanceRequestResponse> getMaintenanceRequestListByResidentId(int page, int size, String sortBy, String sortDir, String status, Integer residentId) {
        Specification<MaintenanceRequest> spec = Specification.where(MaintenanceRequestSpecification.hasResidentId(residentId));
        if (status != null) {
            spec = spec.and(MaintenanceRequestSpecification.hasStatus(status));
        }
        Pageable pageable = pagination(page, size, sortBy, sortDir);
        Page<MaintenanceRequest> maintenanceRequests = maintenanceRequestRepo.findAll(spec, pageable);

        List<MaintenanceRequestResponse> data = new ArrayList<>();
        maintenanceRequests.forEach(request -> {
            data.add(getMaintenanceRequestById(request.getId()));
        });

        PageResponse<MaintenanceRequestResponse> response = new PageResponse<>(
                maintenanceRequests.getTotalElements(),
                maintenanceRequests.getTotalPages(),
                maintenanceRequests.getNumber(),
                maintenanceRequests.getSize(),
                data);
        return response;
    }

    @Override
    public PageResponse<MaintenanceRequestResponse> getMaintenanceRequestListByApartmentId(int page, int size, String sortBy, String sortDir, String status, Integer apartmentId) {
        Pageable pageable = pagination(page, size, sortBy, sortDir);
        Page<MaintenanceRequest> maintenanceRequests = null;
        if (status == null) {
            maintenanceRequests = maintenanceRequestRepo.findByApartmentId(apartmentId, pageable);
        } else {
            maintenanceRequests = maintenanceRequestRepo.findByApartmentIdAndStatus(apartmentId, status, pageable);
        }

        List<MaintenanceRequestResponse> data = new ArrayList<>();
        maintenanceRequests.forEach(request -> {
            data.add(getMaintenanceRequestById(request.getId()));
        });

        PageResponse<MaintenanceRequestResponse> response = new PageResponse<>(
                maintenanceRequests.getTotalElements(),
                maintenanceRequests.getTotalPages(),
                maintenanceRequests.getNumber(),
                maintenanceRequests.getSize(),
                data);
        return response;
    }
    
    @Override
    public MaintenanceRequestResponse getMaintenanceRequestById(Integer maintenanceRequestId) {
        MaintenanceRequest maintenanceRequest = maintenanceRequestRepo.findById(maintenanceRequestId).get();
        Maintenance maintenance = maintenanceRepo.findById(maintenanceRequest.getMaintenanceId()).get();
        ResidentResponse resident = residentService.getResidentById(maintenanceRequest.getResidentId());

        MaintenanceRequestResponse response = new MaintenanceRequestResponse();
        response.setId(maintenanceRequest.getId());
        response.setResidentId(maintenanceRequest.getResidentId());
        response.setResidentName(resident.getName());
        response.setResidentUnit(resident.getUnitNumber());
        response.setMaintenanceId(maintenanceRequest.getMaintenanceId());
        response.setMaintenanceCategory(maintenance.getCategory());
        response.setDescription(maintenanceRequest.getDescription());
        response.setStatus(maintenanceRequest.getStatus());
        response.setRequestDate(maintenanceRequest.getCreatedDate());
        response.setAssignedTo(maintenanceRequest.getAssignedTo());
        response.setAssignedDate(maintenanceRequest.getAssignedDate());
        response.setCompletedDate(maintenanceRequest.getCompletedDate());
        response.setCancelledDate(maintenanceRequest.getCancelledDate());
        return response;
    }

    @Override
    public MaintenanceRequest addMaintenanceRequest(MaintenanceReserveRequest request) {
        MaintenanceRequest maintenanceRequest = new MaintenanceRequest();
        maintenanceRequest.setMaintenanceId(request.getMaintenanceId());
        maintenanceRequest.setResidentId(request.getResidentId());
        maintenanceRequest.setDescription(request.getDescription());
        maintenanceRequest.setStatus(AparteoneConstant.STATUS_REQUESTED);
        return maintenanceRequestRepo.save(maintenanceRequest);
    }

    @Override
    public MaintenanceRequest updateMaintenanceRequestStatus(Integer maintenanceRequestId, String status, String remarks) {
        MaintenanceRequest maintenanceRequest = maintenanceRequestRepo.findById(maintenanceRequestId).get();
        if (status.equals(AparteoneConstant.STATUS_COMPLETED)) {
            maintenanceRequest.setStatus(status);
            maintenanceRequest.setCompletedDate(new Date());
        } else if (status.equals(AparteoneConstant.STATUS_CANCELLED)) {
            maintenanceRequest.setStatus(status);
            maintenanceRequest.setCancelledDate(new Date());
        } else if (status.equals(AparteoneConstant.STATUS_ASSIGNED)) {
            maintenanceRequest.setStatus(status);
            maintenanceRequest.setAssignedTo(remarks);
            maintenanceRequest.setAssignedDate(new Date());
        }
        return maintenanceRequestRepo.save(maintenanceRequest);
    }
}
