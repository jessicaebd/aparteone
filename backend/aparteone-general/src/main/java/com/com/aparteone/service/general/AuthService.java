package com.com.aparteone.service.general;

import com.com.aparteone.dto.request.auth.LoginRequest;
import com.com.aparteone.dto.request.auth.RegisterApartmentRequest;
import com.com.aparteone.dto.request.auth.RegisterMerchantRequest;
import com.com.aparteone.dto.request.auth.RegisterResidentRequest;
import com.com.aparteone.entity.general.Apartment;
import com.com.aparteone.entity.general.Merchant;
import com.com.aparteone.entity.general.Resident;
import com.com.aparteone.entity.general.User;

public interface AuthService {
    public User login(LoginRequest request);
    public void logout();

    public Apartment registerApartment(RegisterApartmentRequest request) throws Exception;
    public Resident registerResident(RegisterResidentRequest request) throws Exception;
    public Merchant registerMerchant(RegisterMerchantRequest request) throws Exception;
}
