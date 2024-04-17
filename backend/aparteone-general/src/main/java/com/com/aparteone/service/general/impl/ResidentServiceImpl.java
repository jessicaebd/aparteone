package com.com.aparteone.service.general.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.com.aparteone.dto.ResidentDTO;
import com.com.aparteone.entity.general.Apartment;
import com.com.aparteone.entity.general.ApartmentUnit;
import com.com.aparteone.entity.general.Resident;
import com.com.aparteone.entity.general.User;
import com.com.aparteone.repository.general.ApartmentRepo;
import com.com.aparteone.repository.general.ApartmentUnitRepo;
import com.com.aparteone.repository.general.ResidentRepo;
import com.com.aparteone.repository.general.UserRepo;
import com.com.aparteone.service.general.ResidentService;

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
