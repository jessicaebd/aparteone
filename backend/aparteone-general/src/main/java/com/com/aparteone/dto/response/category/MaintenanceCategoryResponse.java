package com.com.aparteone.dto.response.category;

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
public class MaintenanceCategoryResponse {
    Integer id;
    Integer apartmentId;
    @Lob
    String image;
    String category;
    String description;
    String isActive;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = AparteoneConstant.FORMAT_DATE_TIME, timezone = "Asia/Bangkok")
    Date createdDate;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = AparteoneConstant.FORMAT_DATE_TIME, timezone = "Asia/Bangkok")
    Date modifiedDate;
}
