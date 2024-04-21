package com.com.aparteone.service.general;

import com.com.aparteone.dto.ResidentDTO;
import com.com.aparteone.dto.base.PageResponse;
import com.com.aparteone.dto.request.auth.RegisterResidentRequest;
import com.com.aparteone.entity.general.Resident;

public interface ResidentService {
    public PageResponse<ResidentDTO> searchResident(int page, int size, String sortBy, String sortDir, Integer apartmentId, String search);
    public PageResponse<ResidentDTO> getResidentList(int page, int size, String sortBy, String sortDir, Boolean isActive, Integer apartmentId);
    public ResidentDTO getResidentById(Integer residentId);
    public Resident addResident(Integer userId, RegisterResidentRequest registerResidentRequest);
    public Resident approveResident(Integer residentId, Boolean isApproved);
    public Resident updateResidentStatus(Integer residentId, Boolean isActive);
}
