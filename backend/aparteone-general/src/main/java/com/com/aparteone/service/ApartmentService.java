package com.com.aparteone.service;

import java.util.List;

import com.com.aparteone.entity.Apartment;
import com.com.aparteone.entity.ApartmentUnit;

public interface ApartmentService {
    public List<Apartment> getAllApartments();

    public List<ApartmentUnit> getApartmentUnitList(Integer apartmentId);
}