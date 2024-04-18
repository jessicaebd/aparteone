package com.com.aparteone.service;

import java.util.List;

import com.com.aparteone.dto.base.PageResponse;
import com.com.aparteone.dto.request.category.FacilityCategoryRequest;
import com.com.aparteone.dto.request.category.FacilityTimeRequest;
import com.com.aparteone.dto.response.category.FacilityCategoryResponse;
import com.com.aparteone.dto.response.category.FacilityTimeResponse;
import com.com.aparteone.entity.Facility;
import com.com.aparteone.entity.FacilityTime;

public interface FacilityService {
    // Facility - Category
    public Facility addFacility(FacilityCategoryRequest facilityCategoryRequest);
    public Facility updateFacilityIsActive(Integer facilityId, Boolean isActive);
    public PageResponse<FacilityCategoryResponse> getFacilityListByApartmentId(int page, int size, String sortBy, String sortDir, Boolean isActive, Integer apartmentId);
    
    // Facility - Time
    public FacilityTime addFacilityTime(Integer facilityId, FacilityTimeRequest facilityTimeRequest);
    public FacilityTime updateFacilityTime(Integer facilityTimeId, FacilityTimeRequest facilityTimeRequest, Boolean isActive);
    public List<FacilityTimeResponse> getAvailableFacilityTimeListByFacilityId(Integer facilityId); 

    // Facility Request
    // public PageResponse<FacilityRequestResponse> getFacilityRequestListByResidentId(int page, int size, String sortBy, String sortDir, String status, Integer residentId);
    // public PageResponse<FacilityRequestResponse> getFacilityRequestListByApartmentId(int page, int size, String sortBy, String sortDir, String status, Integer apartmentId);
    // public FacilityRequestResponse getFacilityRequestById(Integer facilityRequestId);
    // public FacilityCategoryRequest insertFacilityRequest(FacilityReserveRequest facilityReserveRequest);
    // public FacilityCategoryRequest updateFacilityRequestStatusById(Integer facilityRequestId, String status);
}
