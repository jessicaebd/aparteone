package com.com.aparteone.dto.response;

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
public class MaintenanceCategoryResponse {
    Integer id;
    Integer apartmentId;
    @Lob
    String image;
    String category;
    String description;
    Boolean isActive;
}
