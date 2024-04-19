package com.com.aparteone.dto.response;

import java.time.LocalTime;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FacilityRequestResponse {
    Integer id;
    Integer residentId;
    String residentName;
    String residentUnit;
    Integer facilityId;
    String facilityCategory;
    Integer facilityTimeId;
    @JsonFormat(pattern = "HH:mm")
    LocalTime startTime;
    @JsonFormat(pattern = "HH:mm")
    LocalTime endTime;
    String facilityRequeststatus;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MMM-yyyy", timezone = "Asia/Bangkok")
    Date requestDate;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MMM-yyyy", timezone = "Asia/Bangkok")
    Date completedDate;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MMM-yyyy", timezone = "Asia/Bangkok")
    Date cancelledDate;
}
