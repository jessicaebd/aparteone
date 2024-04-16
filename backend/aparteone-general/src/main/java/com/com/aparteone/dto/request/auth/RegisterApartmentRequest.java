package com.com.aparteone.dto.request.auth;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegisterApartmentRequest {
    private String email;
    private String phone;
    private String password;
    
    private String name;
    private String address;
    private String province;
    private String city;
    private String postalCode;
    private String latitude;
    private String longitude;
}
