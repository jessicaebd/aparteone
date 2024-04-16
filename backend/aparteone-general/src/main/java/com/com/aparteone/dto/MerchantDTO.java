package com.com.aparteone.dto;

import com.com.aparteone.entity.general.Apartment;

import jakarta.persistence.Lob;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MerchantDTO {
    Integer id;
    @Lob
    String image;
    String name;
    String bankName;
    String accountNumber;
    String accountName;
    String phoneNumber;
    String category;
    String address;
    Boolean isActive;
    Apartment apartment;
}
