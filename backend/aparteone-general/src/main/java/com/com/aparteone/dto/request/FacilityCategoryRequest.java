package com.com.aparteone.dto.request;

import java.util.List;

import javax.persistence.Lob;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FacilityCategoryRequest {
    private Integer apartmentId;
    @Lob
    private String image;
    private String category;
    private String description;
    private Boolean isActive;
    List<FacilityTimeRequest> facilityTime;
}
