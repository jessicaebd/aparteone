package com.com.aparteone.service;

import com.com.aparteone.dto.auth.UserResponse;

public interface UserService {
    public UserResponse getUserById(Integer userId);
}
