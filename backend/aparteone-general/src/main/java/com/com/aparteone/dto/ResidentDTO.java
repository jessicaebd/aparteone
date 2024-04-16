package com.com.aparteone.dto;

import com.com.aparteone.entity.general.Apartment;
import com.com.aparteone.entity.general.ApartmentUnit;
import com.com.aparteone.entity.general.Resident;
import com.com.aparteone.entity.general.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResidentDTO {
    Integer id;
    String name;
    String email;
    String phone;
    String status;
    String isActive;
    String apartmentName;
    String unitNumber;
    String unitType;

    public ResidentDTO(User user, Resident resident, ApartmentUnit apartmentUnit, Apartment apartment) {
        this.id = user.getId();
        this.name = user.getName();
        this.email = user.getEmail();
        this.phone = user.getPhone();
        this.status = resident.getStatus();
        this.isActive = (resident.getIsActive() == true) ? "Active" : "Inactive";
        this.unitNumber = apartmentUnit.getUnitNumber();
        this.unitType = apartmentUnit.getType();
        this.apartmentName = apartment.getName();
    }
}
