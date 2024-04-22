package com.com.aparteone.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ApartmentUnitDTO {
    Integer id;
    Integer apartmentId;
    String apartmentName;
    String unitNumber;
    String type;
}
