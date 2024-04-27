package com.com.aparteone.service.impl;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.com.aparteone.constant.AparteoneConstant;
import com.com.aparteone.dto.auth.UserResponse;
import com.com.aparteone.dto.request.auth.LoginRequest;
import com.com.aparteone.dto.request.auth.RegisterApartmentRequest;
import com.com.aparteone.dto.request.auth.RegisterMerchantRequest;
import com.com.aparteone.dto.request.auth.RegisterResidentRequest;
import com.com.aparteone.entity.Apartment;
import com.com.aparteone.entity.Merchant;
import com.com.aparteone.entity.Resident;
import com.com.aparteone.entity.User;
import com.com.aparteone.repository.ApartmentRepo;
import com.com.aparteone.repository.MerchantRepo;
import com.com.aparteone.repository.ResidentRepo;
import com.com.aparteone.repository.UserRepo;
import com.com.aparteone.service.AuthService;
import com.com.aparteone.utils.JWTUtils;

import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
public class AuthServiceImpl implements AuthService {

    @Autowired
    private JWTUtils jwtUtils;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private ApartmentRepo apartmentRepo;

    @Autowired
    private MerchantRepo merchantRepo;

    @Autowired
    private ResidentRepo residentRepo;

    @Override
    public UserResponse registerApartment(RegisterApartmentRequest request) {
        UserResponse response = new UserResponse();
        try {
            if (userRepo.findByEmail(request.getEmail()) != null) {
                throw new RuntimeException("Email already exist");
            } else {
                User user = new User();
                user.setRoleId(AparteoneConstant.ROLE_ID_MANAGEMENT);
                user.setName(request.getName());
                user.setEmail(request.getEmail());
                user.setPhone(request.getPhone());
                user.setPassword(passwordEncoder.encode(request.getPassword()));
                userRepo.save(user);

                Apartment apartment = new Apartment();
                apartment.setId(user.getId());
                apartment.setImage(request.getImage());
                apartment.setName(request.getName());
                apartment.setAddress(request.getAddress());
                apartment.setProvince(request.getProvince());
                apartment.setCity(request.getCity());
                apartment.setPostalCode(request.getPostalCode());
                apartment.setLatitude(request.getLatitude());
                apartment.setLongitude(request.getLongitude());
                apartment.setIsActive(false);
                apartment.setIsApproved(false);
                apartmentRepo.save(apartment);

                if (apartment.getId() != null) {
                    response.setStatusCode(200);
                    response.setMessage("Successfully Registered");
                }
            }
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setError(e.getMessage());
        }
        return response;
    }

    @Override
    public UserResponse registerResident(RegisterResidentRequest request) {
        UserResponse response = new UserResponse();
        try {
            if (userRepo.findByEmail(request.getEmail()) != null) {
                throw new RuntimeException("Email already exist");
            } else {
                User user = new User();
                user.setRoleId(AparteoneConstant.ROLE_ID_RESIDENT);
                user.setName(request.getName());
                user.setEmail(request.getEmail());
                user.setPhone(request.getPhone());
                user.setPassword(passwordEncoder.encode(request.getPassword()));
                userRepo.save(user);

                Resident resident = new Resident();
                resident.setId(user.getId());
                resident.setApartmentId(request.getApartmentId());
                resident.setApartmentUnitId(request.getApartmentUnitId());
                resident.setImage(request.getImage());
                resident.setName(request.getName());
                resident.setType(request.getType());
                resident.setIsActive(false);
                resident.setIsApproved(false);
                residentRepo.save(resident);

                if (resident.getId() != null) {
                    response.setStatusCode(200);
                    response.setMessage("Successfully Registered");
                }
            }
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setError(e.getMessage());
        }
        return response;
    }

    @Override
    public UserResponse registerMerchant(RegisterMerchantRequest request) {
        UserResponse response = new UserResponse();
        try {
            if (userRepo.findByEmail(request.getEmail()) != null) {
                throw new RuntimeException("Email already exist");
            } else {
                User user = new User();
                user.setRoleId(AparteoneConstant.ROLE_ID_MERCHANT);
                user.setName(request.getName());
                user.setEmail(request.getEmail());
                user.setPhone(request.getPhone());
                user.setPassword(passwordEncoder.encode(request.getPassword()));
                userRepo.save(user);

                Merchant merchant = new Merchant();
                merchant.setId(user.getId());
                merchant.setApartmentId(request.getApartmentId());
                merchant.setImage(request.getImage());
                merchant.setName(request.getName());
                merchant.setBankAccount(request.getBankAccount());
                merchant.setAccountNumber(request.getAccountNumber());
                merchant.setAccountName(request.getAccountName());
                merchant.setCategory(request.getCategory());
                merchant.setAddress(request.getAddress());
                merchant.setIsActive(false);
                merchant.setIsApproved(false);
                merchantRepo.save(merchant);

                if (merchant.getId() != null) {
                    response.setStatusCode(200);
                    response.setMessage("Successfully Registered");
                }
            }
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setError(e.getMessage());
        }
        return response;
    }

    @Override
    public UserResponse login(LoginRequest request) {
        log.info("Request: {}", request);
        UserResponse response = new UserResponse();
        try {
            authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
            var user = userRepo.findByEmail(request.getEmail()).orElseThrow();
            var jwt = jwtUtils.generateToken(user);
            var refreshToken = jwtUtils.generateRefreshToken(new HashMap<>(), user);
            log.info("User-{} | jwt-{} | refreshToken-{}", user, jwt, refreshToken);
            response.setStatusCode(200);
            response.setToken(jwt);
            response.setRefreshToken(refreshToken);
            response.setExpirationTime("24Hr");
            response.setMessage("Successfully Signed In");

            response.setId(user.getId());
            response.setRoleId(user.getRoleId());
            response.setEmail(user.getEmail());
            response.setPhone(user.getPhone());
            
        } catch (Exception e) {
            response.setStatusCode(401);
            response.setError(e.getMessage());
            response.setMessage("Invalid Email or Password");
        }
        log.info("Response: {}", response);
        return response;
    }

    @Override
    public void logout() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'logout'");
    }

    public UserResponse refreshToken(UserResponse refreshTokenRequest) {
        UserResponse response = new UserResponse();
        String email = jwtUtils.extractUsername(refreshTokenRequest.getToken());
        User user = userRepo.findByEmail(email).orElseThrow();
        if (jwtUtils.isTokenValid(refreshTokenRequest.getToken(), user)) {
            var jwt = jwtUtils.generateToken(user);
            response.setStatusCode(200);
            response.setToken(jwt);
            response.setRefreshToken(refreshTokenRequest.getToken());
            response.setExpirationTime("24Hr");
            response.setMessage("Successfully Refreshed Token");
        }
        response.setStatusCode(500);
        return response;
    }
}
