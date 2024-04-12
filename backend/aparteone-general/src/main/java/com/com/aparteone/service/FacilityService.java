package com.com.aparteone.service;

import com.com.aparteone.dto.general.PageDTO;
import com.com.aparteone.dto.response.FacilityCategoryResponse;
import com.com.aparteone.dto.response.FacilityRequestResponse;
import com.com.aparteone.entity.Facility;
import com.com.aparteone.entity.FacilityRequest;

public interface FacilityService {
    // Facility
    public PageDTO<FacilityCategoryResponse> getFacilityListByApartmentId(int page, int size, Integer apartmentId);
    public Facility insertFacility(Facility facility);
    public Facility updateFacilityIsActive(Integer facilityId, Boolean isActive);



    // Facility Request
    public PageDTO<FacilityRequestResponse> getFacilityRequestListByResidentId(int page, int size, String sortBy, String sortDir, Integer residentId);
    public PageDTO<FacilityRequestResponse> getFacilityRequestListByApartmentId(int page, int size, String sortBy, String sortDir, Integer apartmentId);
    public FacilityRequestResponse getFacilityRequestById(Integer facilityRequestId);
    public FacilityRequest insertFacilityRequest(FacilityRequest facilityRequest);
    public FacilityRequest updateFacilityRequestStatusById(Integer facilityRequestId, String status, String remarks);
}
