package com.com.aparteone.dto.response;

import java.util.List;

import com.com.aparteone.entity.Facility;
import com.com.aparteone.entity.FacilityTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FacilityCategoryResponse {
    Facility facility;
    List<FacilityTime> facilityTimes;
}
