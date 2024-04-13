package com.com.aparteone.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FacilityTimeRequest {
    private String startTime;
    private String endTime;
}
