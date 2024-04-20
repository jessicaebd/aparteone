package com.com.aparteone.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.com.aparteone.dto.request.auth.RegisterApartmentRequest;
import com.com.aparteone.entity.general.Apartment;
import com.com.aparteone.service.general.AuthService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    // @Autowired
    // private AuthService authService;

    // @PostMapping("/register-apartment")
    // public ResponseEntity<Apartment> registerApartment(@RequestBody RegisterApartmentRequest request) throws Exception {
    //     log.info("[Auth] Register Apartment: {}", request.toString());
    //     return ResponseEntity.ok(authService.registerApartment(request));
    // }

    // @PostMapping("/register-resident")
    // public ResponseEntity<Apartment> registerResident(@RequestBody RegisterApartmentRequest request) throws Exception {
    //     log.info("[Auth] Register Resident: {}", request.toString());
    //     return ResponseEntity.ok(authService.registerApartment(request));
    // }

    // @PostMapping("/register-merchant")
    // public ResponseEntity<Apartment> registerMerchant(@RequestBody RegisterApartmentRequest request) throws Exception {
    //     log.info("[Auth] Register Merchant: {}", request.toString());
    //     return ResponseEntity.ok(authService.registerApartment(request));
    // }
}
