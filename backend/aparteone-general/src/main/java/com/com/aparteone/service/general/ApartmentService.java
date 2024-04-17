package com.com.aparteone.service.general;

import java.util.List;

import com.com.aparteone.entity.general.Apartment;
import com.com.aparteone.entity.general.ApartmentUnit;

public interface ApartmentService {
    public List<Apartment> getAllApartments();
    public List<ApartmentUnit> getApartmentUnitList(Integer apartmentId);
}