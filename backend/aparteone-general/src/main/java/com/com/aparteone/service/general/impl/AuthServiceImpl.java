package com.com.aparteone.service.general.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.com.aparteone.constant.AparteoneConstant;
import com.com.aparteone.dto.request.auth.LoginRequest;
import com.com.aparteone.dto.request.auth.RegisterApartmentRequest;
import com.com.aparteone.dto.request.auth.RegisterMerchantRequest;
import com.com.aparteone.dto.request.auth.RegisterResidentRequest;
import com.com.aparteone.entity.general.Apartment;
import com.com.aparteone.entity.general.Merchant;
import com.com.aparteone.entity.general.Resident;
import com.com.aparteone.entity.general.User;
import com.com.aparteone.repository.general.UserRepo;
import com.com.aparteone.service.MerchantService;
import com.com.aparteone.service.general.ApartmentService;
import com.com.aparteone.service.general.AuthService;
import com.com.aparteone.service.general.ResidentService;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class AuthServiceImpl implements AuthService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private ApartmentService apartmentService;

    @Autowired
    private MerchantService merchantService;

    @Autowired
    private ResidentService residentService;

    @Override
    public Apartment registerApartment(RegisterApartmentRequest request) throws Exception {
        if (isEmailExist(request.getEmail())) {
            throw new RuntimeException("Email already exist");
        } else {
            User user = new User(
                    AparteoneConstant.ROLE_ID_ADMIN,
                    request.getName(),
                    request.getEmail(),
                    request.getPhone(),
                    request.getPassword());
            userRepo.save(user);

            Apartment apartment = apartmentService.addApartment(user.getId(), request);
            return apartment;
        }
    }

    @Override
    public Resident registerResident(RegisterResidentRequest request) throws Exception {
        if (isEmailExist(request.getEmail())) {
            throw new RuntimeException("Email already exist");
        } else {
            User user = new User(
                    AparteoneConstant.ROLE_ID_RESIDENT,
                    request.getName(),
                    request.getEmail(),
                    request.getPhone(),
                    request.getPassword());
            userRepo.save(user);

            Resident resident = residentService.addResident(user.getId(), request);
            return resident;
        }
    }

    @Override
    public Merchant registerMerchant(RegisterMerchantRequest request) throws Exception {
        if (isEmailExist(request.getEmail())) {
            throw new RuntimeException("Email already exist");
        } else {
            User user = new User(
                    AparteoneConstant.ROLE_ID_RESIDENT,
                    request.getName(),
                    request.getEmail(),
                    request.getPhone(),
                    request.getPassword());
            userRepo.save(user);

            Merchant merchant = merchantService.addMerchant(user.getId(), request);
            return merchant;
        }
    }

    @Override
    public User login(LoginRequest request) {
        User user = userRepo.findByEmail(request.getEmail());
        if (user == null) {
            throw new RuntimeException("User not found");
        } else if (!user.getPassword().equals(request.getPassword())) {
            throw new RuntimeException("Invalid password");
        }
        return user;
    }

    @Override
    public void logout() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'logout'");
    }

    public Boolean isEmailExist(String email) {
        User user = userRepo.findByEmail(email);
        return user != null;
    }

}
