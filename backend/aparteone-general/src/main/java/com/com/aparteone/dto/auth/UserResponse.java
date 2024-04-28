package com.com.aparteone.dto.auth;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserResponse {
    Integer statusCode;
    String error;
    String message;
    String token;
    String refreshToken;
    String expirationTime;

    Integer id;
    String role;
    String email;
    String phone;
    String password;

    Object profile;
}
