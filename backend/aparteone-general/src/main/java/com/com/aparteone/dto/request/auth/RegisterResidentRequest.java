package com.com.aparteone.dto.request.auth;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegisterResidentRequest {
    private String name;
    private String email;
    private String phone;
    private String password;
    
    private Integer apartmentUnitId;
    private String status;
}
