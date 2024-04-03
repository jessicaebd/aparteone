package com.com.aparteone.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.com.aparteone.constant.AparteoneConstant;
import com.com.aparteone.dto.general.PageDTO;
import com.com.aparteone.dto.response.MaintenanceRequestResponse;
import com.com.aparteone.entity.Maintenance;
import com.com.aparteone.entity.MaintenanceRequest;
import com.com.aparteone.repository.MaintenanceRepo;
import com.com.aparteone.repository.MaintenanceRequestRepo;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class MaintenanceServiceImpl implements MaintenanceService {

    @Autowired
    private MaintenanceRepo maintenanceRepo;

    @Autowired
    private MaintenanceRequestRepo maintenanceRequestRepo;

    @Override
    public PageDTO<Maintenance> getMaintenanceListByApartmentId(int page, int size, Integer apartmentId) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Maintenance> maintenances = maintenanceRepo.findByApartmentId(apartmentId, pageable);

        PageDTO<Maintenance> response = new PageDTO<>(
            maintenances.getTotalElements(),
            maintenances.getTotalPages(),
            maintenances.getNumber(),
            maintenances.getSize(),
            maintenances.getContent()
        );
        return response;
    }


    // @Override
    // public List<Maintenance> getMaintenanceListByApartmentId(Integer apartmentId) {
    //     List<Maintenance> maintenances = maintenanceRepo.findByApartmentId(apartmentId);
    //     try {
    //         return maintenances;
    //     } catch (Exception e) {
    //         throw new RuntimeException("Error while fetching maintenance list by apartment id: " + apartmentId);
    //     }
        
    // }

    @Override
    public Maintenance insertMaintenance(Maintenance maintenance) {
        return maintenanceRepo.save(maintenance);
    }

    @Override
    public Maintenance updateMaintenanceIsActive(Integer maintenanceId, Boolean isActive) {
        Maintenance maintenance = maintenanceRepo.findById(maintenanceId).get();
        maintenance.setIsActive(isActive);
        return maintenanceRepo.save(maintenance);
    }

    @Override
    public PageDTO<MaintenanceRequestResponse> getMaintenanceRequestListByResidentId(int page, int size, String sortBy, String sortDir, Integer residentId) {
        Pageable pageable = null;
        if(sortBy != null && sortDir != null) {
            pageable = PageRequest.of(page, size, sortDir.equals(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending());
        } else {
            pageable = PageRequest.of(page, size);
        }
        Page<MaintenanceRequest> maintenanceRequests = maintenanceRequestRepo.findByResidentId(residentId, pageable);
        
        List<MaintenanceRequestResponse> data = new ArrayList<>();
        if(maintenanceRequests.getContent().size() > 0) {
            Maintenance maintenance = maintenanceRepo.findById(maintenanceRequests.getContent().get(0).getMaintenanceId()).orElseThrow(() -> new RuntimeException("Maintenance not found"));
            for (MaintenanceRequest request : maintenanceRequests.getContent()) {
                data.add(new MaintenanceRequestResponse(request, maintenance));
            }
        }

        PageDTO<MaintenanceRequestResponse> response = new PageDTO<>(
            maintenanceRequests.getTotalElements(),
            maintenanceRequests.getTotalPages(),
            maintenanceRequests.getNumber(),
            maintenanceRequests.getSize(),
            data
        );
        return response;
    }

    @Override
    public PageDTO<MaintenanceRequestResponse> getMaintenanceRequestListByApartmentId(int page, int size, String sortBy, String sortDir, Integer apartmentId) {
        Pageable pageable = null;
        if(sortBy != null && sortDir != null) {
            pageable = PageRequest.of(page, size, sortDir.equals(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending());
        } else {
            pageable = PageRequest.of(page, size);
        }
        Page<MaintenanceRequest> maintenanceRequests = maintenanceRequestRepo.findByApartmentId(apartmentId, pageable);

        List<MaintenanceRequestResponse> data = new ArrayList<>();
        if(maintenanceRequests.getContent().size() > 0) {
            Maintenance maintenance = maintenanceRepo.findById(maintenanceRequests.getContent().get(0).getMaintenanceId()).orElseThrow(() -> new RuntimeException("Maintenance not found"));
            for (MaintenanceRequest request : maintenanceRequests.getContent()) {
                data.add(new MaintenanceRequestResponse(request, maintenance));
            }
        }
        
        PageDTO<MaintenanceRequestResponse> response = new PageDTO<>(
            maintenanceRequests.getTotalElements(),
            maintenanceRequests.getTotalPages(),
            maintenanceRequests.getNumber(),
            maintenanceRequests.getSize(),
            data
        );
        return response;
    }

    @Override
    public MaintenanceRequestResponse getMaintenanceRequestById(Integer maintenanceRequestId) {
        MaintenanceRequest maintenanceRequest = maintenanceRequestRepo.findById(maintenanceRequestId).get();
        Maintenance maintenance = maintenanceRepo.findById(maintenanceRequest.getMaintenanceId()).get();
        MaintenanceRequestResponse response = new MaintenanceRequestResponse(maintenanceRequest, maintenance);
        return response;
    }

    @Override
    public MaintenanceRequest insertMaintenanceRequest(MaintenanceRequest maintenanceRequest) {
        return maintenanceRequestRepo.save(maintenanceRequest);
    }

    @Override
    public MaintenanceRequest updateMaintenanceRequestStatusById(Integer maintenanceRequestId, String status, String remarks) {
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
