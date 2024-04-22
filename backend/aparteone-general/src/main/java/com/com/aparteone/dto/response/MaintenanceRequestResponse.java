package com.com.aparteone.dto.response;

import java.util.Date;

import com.com.aparteone.constant.AparteoneConstant;
import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MaintenanceRequestResponse {
    Integer id;
    String receiptId;
    Integer residentId;
    String residentName;
    String residentUnit;
    Integer maintenanceId;
    String maintenanceCategory;
    String description;
    String status;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = AparteoneConstant.FORMAT_DATE_TIME, timezone = "Asia/Bangkok")
    Date requestDate;
    String assignedTo;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = AparteoneConstant.FORMAT_DATE_TIME, timezone = "Asia/Bangkok")
    Date assignedDate;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = AparteoneConstant.FORMAT_DATE_TIME, timezone = "Asia/Bangkok")
    Date completedDate;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = AparteoneConstant.FORMAT_DATE_TIME, timezone = "Asia/Bangkok")
    Date cancelledDate;
}
