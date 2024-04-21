package com.com.aparteone.dto;

import java.util.List;

import jakarta.persistence.Lob;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ApartmentDTO {
    Integer id;
    @Lob
    String image;
    String name;
    String address;
    String province;
    String city;
    String postalCode;
    String latitude;
    String longitude;
    Boolean isActive;
    Boolean isApproved;
}
