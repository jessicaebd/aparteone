package com.com.aparteone.dto;

import javax.persistence.Lob;

import com.com.aparteone.entity.general.Apartment;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
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
