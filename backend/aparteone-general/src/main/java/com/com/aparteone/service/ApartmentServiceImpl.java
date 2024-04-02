package com.com.aparteone.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.com.aparteone.entity.Apartment;
import com.com.aparteone.entity.ApartmentUnit;
import com.com.aparteone.repository.ApartmentRepo;
import com.com.aparteone.repository.ApartmentUnitRepo;

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
