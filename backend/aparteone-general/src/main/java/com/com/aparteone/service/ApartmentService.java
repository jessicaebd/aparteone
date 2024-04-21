package com.com.aparteone.service;

import com.com.aparteone.dto.ApartmentResponse;
import com.com.aparteone.dto.ApartmentUnitDTO;
import com.com.aparteone.dto.base.PageResponse;
import com.com.aparteone.dto.request.auth.RegisterApartmentRequest;
import com.com.aparteone.entity.Apartment;
import com.com.aparteone.entity.ApartmentUnit;

public interface ApartmentService {
    public PageResponse<ApartmentResponse> searchApartment(int page, int size, String sortBy, String sortDir, Boolean isActive, String search);
    public PageResponse<ApartmentResponse> getApartmentList(int page, int size, String sortBy, String sortDir, Boolean isActive, Boolean isApproved);
    public ApartmentResponse getApartmentById(Integer apartmentId);
    public Apartment approveApartment(Integer apartmentId, Boolean isApproved);
    public Apartment addApartment(Integer userId, RegisterApartmentRequest reqisterApartmentRequest);
    public Apartment updateApartment(Integer apartmentId, Boolean isActive, ApartmentResponse apartmentDTO);
    public Integer getApartmentTotal(String criteria);

    public PageResponse<ApartmentUnitDTO> searchApartmentUnit(int page, int size, String sortBy, String sortDir, Integer apartmentId, String search);
    public PageResponse<ApartmentUnitDTO> getApartmentUnitListByApartmentId(int page, int size, String sortBy, String sortDir, Integer apartmentId);
    public ApartmentUnitDTO getApartmentUnitById(Integer apartmentUnitId);
    public ApartmentUnit addApartmentUnit(ApartmentUnitDTO apartmentUnitDTO);
    public ApartmentUnit updateApartmentUnit(Integer apartmentUnitId, ApartmentUnitDTO apartmentUnitDTO);
}