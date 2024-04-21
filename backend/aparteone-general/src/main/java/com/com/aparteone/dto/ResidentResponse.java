package com.com.aparteone.dto;

import jakarta.persistence.Lob;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResidentResponse {
    Integer id;
    Integer apartmentId;
    Integer apartmentUnitId;
    @Lob
    String image;
    String name;
    String type;
    String apartmentName;
    String unitNumber;
    String unitType;
    String isActive;
    String isApproved;
}
