package com.com.aparteone.service;

import com.com.aparteone.dto.ResidentResponse;
import com.com.aparteone.dto.base.PageResponse;
import com.com.aparteone.dto.request.auth.RegisterResidentRequest;
import com.com.aparteone.entity.Resident;

public interface ResidentService {
    public PageResponse<ResidentResponse> searchResident(int page, int size, String sortBy, String sortDir, Integer apartmentId, Boolean isActive, String search);
    public PageResponse<ResidentResponse> getResidentList(int page, int size, String sortBy, String sortDir, Boolean isActive, String isApproved, Integer apartmentId);
    public ResidentResponse getResidentById(Integer residentId);
    
    public Resident approveResident(Integer residentId, Boolean isApproved);
    public Resident addResident(Integer userId, RegisterResidentRequest registerResidentRequest);
    public Resident updateResident(Integer residentId, Boolean isActive, RegisterResidentRequest registerResidentRequest);

    public Integer countResidentByApartmentId(Integer apartmentId);
}
