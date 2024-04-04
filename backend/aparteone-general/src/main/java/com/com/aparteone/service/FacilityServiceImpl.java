package com.com.aparteone.service;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.com.aparteone.constant.AparteoneConstant;
import com.com.aparteone.dto.general.PageDTO;
import com.com.aparteone.dto.response.FacilityCategoryResponse;
import com.com.aparteone.dto.response.FacilityRequestResponse;
import com.com.aparteone.entity.Facility;
import com.com.aparteone.entity.FacilityRequest;
import com.com.aparteone.entity.FacilityTime;
import com.com.aparteone.repository.FacilityRepo;
import com.com.aparteone.repository.FacilityRequestRepo;
import com.com.aparteone.repository.FacilityTimeRepo;

@Service
public class FacilityServiceImpl implements FacilityService {

    @Autowired
    private FacilityRepo facilityRepo;

    @Autowired
    private FacilityTimeRepo facilityTimeRepo;

    @Autowired
    private FacilityRequestRepo facilityRequestRepo;

    @Override
    public PageDTO<FacilityCategoryResponse> getFacilityListByApartmentId(int page, int size, Integer apartmentId) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Facility> facilities = facilityRepo.findByApartmentId(apartmentId, pageable);

        List<FacilityCategoryResponse> data = new ArrayList<>();
        for (Facility facility : facilities.getContent()) {
            List<FacilityTime> facilityTimes = facilityTimeRepo.findByFacilityId(facility.getId());
            data.add(new FacilityCategoryResponse(facility, facilityTimes));
        }

        PageDTO<FacilityCategoryResponse> response = new PageDTO<>(
                facilities.getTotalElements(),
                facilities.getTotalPages(),
                facilities.getNumber(),
                facilities.getSize(),
                data);
        return response;
    }

    @Override
    public Facility insertFacility(Facility facility) {
        return facilityRepo.save(facility);
    }

    @Override
    public Facility updateFacilityIsActive(Integer facilityId, Boolean isActive) {
        Facility facility = facilityRepo.findById(facilityId).get();
        facility.setIsActive(isActive);
        return facilityRepo.save(facility);
    }

    @Override
    public PageDTO<FacilityRequestResponse> getFacilityRequestListByResidentId(int page, int size, String sortBy,
            String sortDir, Integer residentId) {
        Pageable pageable = null;
        if (sortBy != null && sortDir != null) {
            pageable = PageRequest.of(page, size,
                    sortDir.equals(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending()
                            : Sort.by(sortBy).descending());
        } else {
            pageable = PageRequest.of(page, size);
        }

        Page<FacilityRequest> facilityRequests = facilityRequestRepo.findByResidentId(residentId, pageable);

        List<FacilityRequestResponse> data = new ArrayList<>();
        for (FacilityRequest request : facilityRequests.getContent()) {
            FacilityTime time = facilityTimeRepo.findById(request.getFacilityTimeId()).get();
            Facility facility = facilityRepo.findById(time.getFacilityId()).get();
            data.add(new FacilityRequestResponse(request, time, facility));
        }

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
            String sortDir, Integer apartmentId) {
        Pageable pageable = null;
        if (sortBy != null && sortDir != null) {
            pageable = PageRequest.of(page, size,
                    sortDir.equals(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending()
                            : Sort.by(sortBy).descending());
        } else {
            pageable = PageRequest.of(page, size);
        }

        Page<FacilityRequest> facilityRequests = facilityRequestRepo.findByApartmentId(apartmentId, pageable);

        List<FacilityRequestResponse> data = new ArrayList<>();
        for (FacilityRequest request : facilityRequests.getContent()) {
            FacilityTime time = facilityTimeRepo.findById(request.getFacilityTimeId()).get();
            Facility facility = facilityRepo.findById(time.getFacilityId()).get();
            data.add(new FacilityRequestResponse(request, time, facility));
        }

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
        FacilityRequestResponse response = new FacilityRequestResponse(request, time, category);
        return response;
    }

    @Override
    public FacilityRequest insertFacilityRequest(FacilityRequest facilityRequest) {
        return facilityRequestRepo.save(facilityRequest);
    }

    @Override
    public FacilityRequest updateFacilityRequestStatusById(Integer facilityRequestId, String status, String remarks) {
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



    
    // For Testing
    public void insertDummyData() {
        List<Facility> dummyFacilities = generateDummyFacilities(20);
        facilityRepo.saveAll(dummyFacilities);
    }

    private List<Facility> generateDummyFacilities(int count) {
        List<Facility> facilities = new ArrayList<>();
        Random random = new Random();
        for (int i = 0; i < count; i++) {
            Facility facility = new Facility();
            facility.setApartmentId(random.nextInt(100) + 1); // Assuming apartment IDs range from 1 to 100
            facility.setImageId(random.nextInt(1000) + 1); // Assuming image IDs range from 1 to 1000
            facility.setCategory("Category " + (i + 1));
            facility.setDescription("Description for facility " + (i + 1));
            facility.setIsActive(random.nextBoolean());
            facilities.add(facility);
        }
        return facilities;
    }

    public void insertDummyData2(int facilityId, int count) {
        List<FacilityTime> dummyFacilityTimes = generateDummyFacilityTimes(facilityId, count);
        facilityTimeRepo.saveAll(dummyFacilityTimes);
    }

    private List<FacilityTime> generateDummyFacilityTimes(int facilityId, int count) {
        List<FacilityTime> facilityTimes = new ArrayList<>();
        Random random = new Random();
        for (int i = 0; i < count; i++) {
            FacilityTime facilityTime = new FacilityTime();
            facilityTime.setFacilityId(facilityId);
            facilityTime.setStartTime(generateRandomTime());
            facilityTime.setEndTime(generateRandomTime());
            facilityTime.setIsActive(random.nextBoolean());
            facilityTimes.add(facilityTime);
        }
        return facilityTimes;
    }

    public LocalTime generateRandomTime() {
        Random random = new Random();
        int hour = random.nextInt(24); // 0-23
        int minute = random.nextInt(60); // 0-59
        return LocalTime.of(hour, minute);
    }

}
