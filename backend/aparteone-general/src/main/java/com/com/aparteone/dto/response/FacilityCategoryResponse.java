package com.com.aparteone.dto.response;

import java.util.List;

import com.com.aparteone.entity.Facility;
import com.com.aparteone.entity.FacilityTime;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@NoArgsConstructor
@AllArgsConstructor
public class FacilityCategoryResponse {
    Facility facility;
    List<FacilityTime> facilityTimes;
}
