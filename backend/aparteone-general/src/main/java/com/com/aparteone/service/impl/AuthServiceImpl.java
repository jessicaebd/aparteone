package com.com.aparteone.service.impl;

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
import com.com.aparteone.repository.general.ApartmentRepo;
import com.com.aparteone.repository.general.MerchantRepo;
import com.com.aparteone.repository.general.ResidentRepo;
import com.com.aparteone.repository.general.UserRepo;
import com.com.aparteone.service.AuthService;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private ApartmentRepo apartmentRepo;

    @Autowired
    private ResidentRepo residentRepo;

    @Autowired
    private MerchantRepo merchantRepo;

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

            Apartment apartment = new Apartment(
                    user.getId(),
                    request.getName(),
                    request.getAddress(),
                    request.getProvince(),
                    request.getCity(),
                    request.getPostalCode(),
                    request.getLatitude(),
                    request.getLongitude(),
                    false
            );
            return apartmentRepo.save(apartment);
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

            Resident resident = new Resident(
                    user.getId(),
                    request.getApartmentUnitId(),
                    request.getStatus(),
                    false
            );
            return residentRepo.save(resident);
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

            Merchant merchant = new Merchant(
                    user.getId(),
                    request.getApartmentId(),
                    request.getImage(),
                    request.getName(),
                    request.getBankAccount(),
                    request.getAccountNumber(),
                    request.getAccountName(),
                    request.getCategory(),
                    request.getAddress(),
                    false

            );
            return merchantRepo.save(merchant);
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
