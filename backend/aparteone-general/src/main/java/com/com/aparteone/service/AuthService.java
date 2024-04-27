package com.com.aparteone.service;

import com.com.aparteone.dto.auth.UserResponse;
import com.com.aparteone.dto.request.auth.LoginRequest;
import com.com.aparteone.dto.request.auth.RegisterApartmentRequest;
import com.com.aparteone.dto.request.auth.RegisterMerchantRequest;
import com.com.aparteone.dto.request.auth.RegisterResidentRequest;

public interface AuthService {
    public UserResponse login(LoginRequest request);
    public void logout();

    public UserResponse registerApartment(RegisterApartmentRequest request) throws Exception;
    public UserResponse registerResident(RegisterResidentRequest request) throws Exception;
    public UserResponse registerMerchant(RegisterMerchantRequest request) throws Exception;
}
