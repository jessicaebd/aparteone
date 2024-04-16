package com.com.aparteone.dto.response;

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
    Boolean isActive;
}
