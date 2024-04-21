package com.com.aparteone.service.general;

import com.com.aparteone.dto.ApartmentDTO;
import com.com.aparteone.dto.ApartmentUnitDTO;
import com.com.aparteone.dto.base.PageResponse;
import com.com.aparteone.entity.general.Apartment;
import com.com.aparteone.entity.general.ApartmentUnit;

public interface ApartmentService {
    public PageResponse<ApartmentDTO> searchApartment(int page, int size, String sortBy, String sortDir, String search);
    public PageResponse<ApartmentDTO> getApartmentList(int page, int size, String sortBy, String sortDir, Boolean isActive, Boolean isApproved);
    public ApartmentDTO getApartmentById(Integer apartmentId);
    public Apartment approveApartment(Integer apartmentId, Boolean isApproved);
    public Apartment registerApartment(ApartmentDTO apartmentDTO);
    public Apartment updateApartment(Integer apartmentId, Boolean isActive, ApartmentDTO apartmentDTO);
    public Integer getApartmentTotal(String criteria);

    public PageResponse<ApartmentUnitDTO> searchApartmentUnit(int page, int size, String sortBy, String sortDir, Integer apartmentId, String search);
    public PageResponse<ApartmentUnitDTO> getApartmentUnitListByApartmentId(int page, int size, String sortBy, String sortDir, Integer apartmentId);
    public ApartmentUnit addApartmentUnit(ApartmentUnitDTO apartmentUnitDTO);
    public ApartmentUnit updateApartmentUnit(Integer apartmentUnitId, ApartmentUnitDTO apartmentUnitDTO);
}