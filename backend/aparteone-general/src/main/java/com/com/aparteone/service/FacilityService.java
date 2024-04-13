package com.com.aparteone.service;

import com.com.aparteone.dto.general.PageDTO;
import com.com.aparteone.dto.request.FacilityCategoryRequest;
import com.com.aparteone.dto.request.FacilityReserveRequest;
import com.com.aparteone.dto.request.FacilityTimeRequest;
import com.com.aparteone.dto.response.FacilityCategoryResponse;
import com.com.aparteone.dto.response.FacilityRequestResponse;
import com.com.aparteone.entity.Facility;
import com.com.aparteone.entity.FacilityRequest;
import com.com.aparteone.entity.FacilityTime;

public interface FacilityService {
    // Facility
    public PageDTO<FacilityCategoryResponse> getFacilityListByApartmentId(int page, int size, Boolean isActive, Integer apartmentId);
    public Facility insertFacility(FacilityCategoryRequest facilityRequest);
    public Facility updateFacilityIsActive(Integer facilityId, Boolean isActive);
    public FacilityTime updateFacilityTime(Integer facilityTimeId, FacilityTimeRequest facilityTimeRequest, Boolean isActive);

    // Facility Request
    public PageDTO<FacilityRequestResponse> getFacilityRequestListByResidentId(int page, int size, String sortBy, String sortDir, String status, Integer residentId);
    public PageDTO<FacilityRequestResponse> getFacilityRequestListByApartmentId(int page, int size, String sortBy, String sortDir, String status, Integer apartmentId);
    public FacilityRequestResponse getFacilityRequestById(Integer facilityRequestId);
    public FacilityRequest insertFacilityRequest(FacilityReserveRequest facilityReserveRequest);
    public FacilityRequest updateFacilityRequestStatusById(Integer facilityRequestId, String status);
}
