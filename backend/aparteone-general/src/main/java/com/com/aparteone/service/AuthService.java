package com.com.aparteone.service;

import com.com.aparteone.dto.request.auth.LoginRequest;
import com.com.aparteone.dto.request.auth.RegisterApartmentRequest;
import com.com.aparteone.dto.request.auth.RegisterMerchantRequest;
import com.com.aparteone.dto.request.auth.RegisterResidentRequest;
import com.com.aparteone.entity.Apartment;
import com.com.aparteone.entity.Merchant;
import com.com.aparteone.entity.Resident;
import com.com.aparteone.entity.User;

public interface AuthService {
    public User login(LoginRequest request);
    public void logout();

    public Apartment registerApartment(RegisterApartmentRequest request) throws Exception;
    public Resident registerResident(RegisterResidentRequest request) throws Exception;
    public Merchant registerMerchant(RegisterMerchantRequest request) throws Exception;
}
