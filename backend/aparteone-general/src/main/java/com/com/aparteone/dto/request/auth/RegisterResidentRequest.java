package com.com.aparteone.dto.request.auth;

import jakarta.persistence.Lob;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegisterResidentRequest {
    private String email;
    private String phone;
    private String password;
    private Integer apartmentId;
    private Integer apartmentUnitId;
    @Lob
    private String image;
    private String name;
    private String type;
}
