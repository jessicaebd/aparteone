package com.com.aparteone.dto;

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
    String bankAccount;
    String accountNumber;
    String accountName;
    String category;
    String address;
    String isActive;
}
