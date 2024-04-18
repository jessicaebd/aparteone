package com.com.aparteone.dto.response;

import java.util.Date;

import com.com.aparteone.constant.AparteoneConstant;
import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Lob;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AnnouncementResponse {
    Integer id;
    Integer apartmentId;
    @Lob
    String image;
    String title;
    @Lob
    String description;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = AparteoneConstant.FORMAT_DATE_TIME, timezone = "Asia/Bangkok")
    Date startDate;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = AparteoneConstant.FORMAT_DATE_TIME, timezone = "Asia/Bangkok")
    Date endDate;
    String status;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = AparteoneConstant.FORMAT_DATE_TIME, timezone = "Asia/Bangkok")
    Date createdDate;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = AparteoneConstant.FORMAT_DATE_TIME, timezone = "Asia/Bangkok")
    Date modifiedDate;
}
