package com.com.aparteone.dto.response;

import com.com.aparteone.entity.general.Apartment;
import com.com.aparteone.entity.general.Merchant;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MerchantResponse {
    Integer apartmentId;
    String apartmentName;
    String image;
    Integer merchantId;
    String merchantName;
    String phoneNumber;
    String category;
    String address;
    String bankName;
    String accountName;
    String accountNumber;
    Boolean isActive;

    public MerchantResponse(Merchant merchant, Apartment apartment) {
        this.apartmentId = apartment.getId();
        this.apartmentName = apartment.getName();
        this.image = merchant.getImage();
        this.merchantId = merchant.getId();
        this.merchantName = merchant.getName();
        //this.phoneNumber = merchant.getPhoneNumber();
        this.phoneNumber = null;
        this.category = merchant.getCategory();
        this.address = merchant.getAddress();
        //this.bankName = merchant.getBankName();
        this.bankName = null;
        this.accountName = merchant.getAccountName();
        this.accountNumber = merchant.getAccountNumber();
        this.isActive = merchant.getIsActive();
    }
}
