package com.com.aparteone.service;

import java.text.ParseException;
import java.util.List;

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

public interface FacilityService {
    // Facility Category
    public PageResponse<FacilityCategoryResponse> getFacilityListByApartmentId(int page, int size, String sortBy, String sortDir, Boolean isActive, Integer apartmentId);
    public Facility addFacility(FacilityCategoryRequest facilityCategoryRequest);
    public Facility updateFacilityIsActive(Integer facilityId, Boolean isActive);

    // Facility Time
    public List<FacilityTimeResponse> getFacilityTimeByFacilityId(Integer facilityId, String date, String search) throws ParseException; 
    public FacilityTime addFacilityTime(Integer facilityId, FacilityTimeRequest facilityTimeRequest);
    public FacilityTime updateFacilityTime(Integer facilityTimeId, FacilityTimeRequest facilityTimeRequest, Boolean isActive);

    // Facility Request
    public PageResponse<FacilityRequestResponse> getFacilityRequestListByApartmentId(int page, int size, String sortBy, String sortDir, String status, Integer apartmentId, String search);
    public PageResponse<FacilityRequestResponse> getFacilityRequestListByResidentId(int page, int size, String sortBy, String sortDir, String status, Integer residentId, String search);
    public FacilityRequestResponse getFacilityRequestById(Integer facilityRequestId);
    public FacilityRequest addFacilityRequest(FacilityReserveRequest facilityReserveRequest);
    public FacilityRequest updateFacilityRequestStatus(Integer facilityRequestId, String status);
}
