package com.com.aparteone.dto.response.category;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Lob;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FacilityCategoryResponse {
    Integer id;
    Integer apartmentId;
    @Lob
    String image;
    String category;
    String description;
    String isActive;
    List<FacilityTimeResponse> facilityTimes;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MMM-yyyy HH:mm:ss", timezone = "Asia/Bangkok")
    Date createdDate;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MMM-yyyy HH:mm:ss", timezone = "Asia/Bangkok")
    Date modifiedDate;
}
