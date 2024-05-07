package com.com.aparteone.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.com.aparteone.constant.AparteoneConstant;
import com.com.aparteone.dto.auth.UserResponse;
import com.com.aparteone.entity.User;
import com.com.aparteone.repository.UserRepo;
import com.com.aparteone.service.ApartmentService;
import com.com.aparteone.service.MerchantService;
import com.com.aparteone.service.ResidentService;
import com.com.aparteone.service.UserService;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private ApartmentService apartmentService;

    @Autowired
    private ResidentService residentService;

    @Autowired
    private MerchantService merchantService;

    @Override
    public UserResponse getUserById(Integer userId) {
        User user = userRepo.findById(userId).orElse(null);
        UserResponse response = null;
        if(user != null) {
            response = new UserResponse();
            response.setId(user.getId());
            response.setEmail(user.getEmail());
            response.setPhone(user.getPhone());

            if(user.getRoleId() == AparteoneConstant.ROLE_ID_ADMIN) {
                response.setRole(AparteoneConstant.ROLE_ADMIN);
            } else if(user.getRoleId() == AparteoneConstant.ROLE_ID_MERCHANT) {
                response.setRole(AparteoneConstant.ROLE_MERCHANT);
                response.setProfile(merchantService.getMerchantById(user.getId()));
            } else if(user.getRoleId() == AparteoneConstant.ROLE_ID_RESIDENT) {
                response.setRole(AparteoneConstant.ROLE_RESIDENT);
                response.setProfile(residentService.getResidentById(user.getId()));
            } else if(user.getRoleId() == AparteoneConstant.ROLE_ID_MANAGEMENT) {
                response.setRole(AparteoneConstant.ROLE_MANAGEMENT);
                response.setProfile(apartmentService.getApartmentById(user.getId()));
            }
        }
        return response; 
    }
    
}
