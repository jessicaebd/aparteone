package com.com.aparteone.service.general.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.com.aparteone.entity.general.Apartment;
import com.com.aparteone.entity.general.ApartmentUnit;
import com.com.aparteone.repository.general.ApartmentRepo;
import com.com.aparteone.repository.general.ApartmentUnitRepo;
import com.com.aparteone.service.general.ApartmentService;

@Service
public class ApartmentServiceImpl implements ApartmentService {

    @Autowired
    private ApartmentRepo apartmentRepo;

    @Autowired
    private ApartmentUnitRepo apartmentUnitRepo;

    @Override
    public List<Apartment> getAllApartments() {
        return apartmentRepo.findAll();
    }

    @Override
    public List<ApartmentUnit> getApartmentUnitList(Integer apartmentId) {
        return apartmentUnitRepo.findByApartmentId(apartmentId);
    }

}
