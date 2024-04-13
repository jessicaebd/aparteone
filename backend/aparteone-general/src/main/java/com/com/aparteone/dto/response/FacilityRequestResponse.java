package com.com.aparteone.dto.response;

import java.time.LocalTime;
import java.util.Date;

import com.com.aparteone.dto.ResidentDTO;
import com.com.aparteone.entity.Facility;
import com.com.aparteone.entity.FacilityRequest;
import com.com.aparteone.entity.FacilityTime;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@NoArgsConstructor
@AllArgsConstructor
public class FacilityRequestResponse {
    Integer id;
    // Detail Resident
    Integer residentId;
    String residentName;
    String residentUnit;

    // Detail Facility & Facility Time
    Integer facilityId;
    String facilityCategory;
    Integer facilityTimeId;
    @JsonFormat(pattern = "HH:mm")
    LocalTime startTime;
    @JsonFormat(pattern = "HH:mm")
    LocalTime endTime;

    // Detail Facility Request
    String facilityRequeststatus;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MMM-yyyy", timezone = "Asia/Bangkok")
    Date requestDate;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MMM-yyyy", timezone = "Asia/Bangkok")
    Date completedDate;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MMM-yyyy", timezone = "Asia/Bangkok")
    Date cancelledDate;
    
    public FacilityRequestResponse(ResidentDTO resident, FacilityRequest request, FacilityTime time, Facility category) {
        this.id = request.getId();
        this.residentId = resident.getId();
        this.residentName = resident.getName();
        this.residentUnit = resident.getUnitNumber();
        this.facilityId = time.getFacilityId();
        this.facilityCategory = category.getCategory();
        this.facilityTimeId = time.getId();
        this.startTime = time.getStartTime();
        this.endTime = time.getEndTime();
        this.facilityRequeststatus = request.getStatus();
        this.requestDate = request.getCreatedDate();
        this.completedDate = request.getCompletedDate();
        this.cancelledDate = request.getCancelledDate();
    }
}
