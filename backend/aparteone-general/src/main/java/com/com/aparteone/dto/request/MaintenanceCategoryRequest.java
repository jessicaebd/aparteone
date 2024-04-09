package com.com.aparteone.dto.request;

import javax.persistence.Lob;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@NoArgsConstructor
@AllArgsConstructor
public class MaintenanceCategoryRequest {
    private Integer apartmentId;
    private @Lob byte[] image;
    private String category;
    private String description;
    private Boolean isActive;
}
