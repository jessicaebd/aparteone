package com.com.aparteone.dto.response;

import java.time.LocalTime;
import java.util.Date;

import com.com.aparteone.constant.AparteoneConstant;
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
    Integer facilityId;
    Integer facilityTimeId;
    String facilityCategory;
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
    String facilityCategoryisActive;
    String facilityTimeisActive;
    
    public FacilityRequestResponse(FacilityRequest request, FacilityTime time, Facility category) {
        this.id = request.getId();
        this.facilityId = time.getFacilityId();
        this.facilityTimeId = time.getId();
        this.facilityCategory = category.getCategory();
        this.startTime = time.getStartTime();
        this.endTime = time.getEndTime();
        this.facilityRequeststatus = request.getStatus();
        this.requestDate = request.getCreatedDate();
        this.completedDate = request.getCompletedDate();
        this.cancelledDate = request.getCancelledDate();
        this.facilityCategoryisActive = category.getIsActive() ? AparteoneConstant.STATUS_ACTIVE : AparteoneConstant.STATUS_INACTIVE;
        this.facilityTimeisActive = time.getIsActive() ? AparteoneConstant.STATUS_ACTIVE : AparteoneConstant.STATUS_INACTIVE;
    }
}
