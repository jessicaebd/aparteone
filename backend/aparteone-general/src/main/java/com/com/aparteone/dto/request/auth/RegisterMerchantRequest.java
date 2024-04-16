package com.com.aparteone.dto.request.auth;

import jakarta.persistence.Lob;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegisterMerchantRequest {
    private String email;
    private String phone;
    private String password;

    private Integer apartmentId;
    @Lob
    private String image;
    private String name;
    private String bankAccount;
    private String accountNumber;
    private String accountName;
    private String category;
    private String address;
}
