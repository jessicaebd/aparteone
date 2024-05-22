package com.com.aparteone.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.com.aparteone.dto.auth.UserResponse;
import com.com.aparteone.dto.request.auth.LoginRequest;
import com.com.aparteone.dto.request.auth.RegisterApartmentRequest;
import com.com.aparteone.dto.request.auth.RegisterMerchantRequest;
import com.com.aparteone.dto.request.auth.RegisterResidentRequest;
import com.com.aparteone.service.UserService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/auth")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/register/apartment")
    public ResponseEntity<UserResponse> registerApartment(@RequestBody RegisterApartmentRequest request)
            throws Exception {
        log.info("[Auth] Register Apartment: {}", request.toString());
        return ResponseEntity.ok(userService.registerApartment(request));
    }

    @PostMapping("/register/resident")
    public ResponseEntity<UserResponse> registerResident(@RequestBody RegisterResidentRequest request)
            throws Exception {
        log.info("[Auth] Register Resident: {}", request.toString());
        return ResponseEntity.ok(userService.registerResident(request));
    }

    @PostMapping("/register/merchant")
    public ResponseEntity<UserResponse> registerMerchant(@RequestBody RegisterMerchantRequest request)
            throws Exception {
        log.info("[Auth] Register Merchant: {}", request.toString());
        return ResponseEntity.ok(userService.registerMerchant(request));
    }

    @PostMapping("/login")
    public ResponseEntity<UserResponse> login(@RequestBody LoginRequest request) {
        log.info("[Auth] Login: {}", request.toString());
        return ResponseEntity.ok(userService.login(request));
    }

    @PostMapping("/detail")
    public ResponseEntity<UserResponse> getUserDetail(@RequestParam Integer userId) throws Exception {
        log.info("[Auth] Get User Detail: userId-{}", userId);
        return ResponseEntity.ok(userService.getUserById(userId));
    }
}
