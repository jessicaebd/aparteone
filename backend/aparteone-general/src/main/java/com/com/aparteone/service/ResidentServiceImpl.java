package com.com.aparteone.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.com.aparteone.dto.ResidentDTO;
import com.com.aparteone.entity.Apartment;
import com.com.aparteone.entity.ApartmentUnit;
import com.com.aparteone.entity.Resident;
import com.com.aparteone.entity.User;
import com.com.aparteone.repository.ApartmentRepo;
import com.com.aparteone.repository.ApartmentUnitRepo;
import com.com.aparteone.repository.ResidentRepo;
import com.com.aparteone.repository.UserRepo;

@Service
public class ResidentServiceImpl implements ResidentService {
    
    @Autowired
    private UserRepo userRepo;

    @Autowired
    private ResidentRepo residentRepo;

    @Autowired
    private ApartmentRepo apartmentRepo;

    @Autowired
    private ApartmentUnitRepo apartmentUnitRepo;

    @Override
    public ResidentDTO getResidentById(Integer residentId) {
        User user = userRepo.findById(residentId).get();
        Resident resident = residentRepo.findById(residentId).get();
        ApartmentUnit apartmentUnit = apartmentUnitRepo.findById(resident.getApartmentUnitId()).get();
        Apartment apartment = apartmentRepo.findById(apartmentUnit.getApartmentId()).get();
        return new ResidentDTO(user, resident, apartmentUnit, apartment);
    }
}
