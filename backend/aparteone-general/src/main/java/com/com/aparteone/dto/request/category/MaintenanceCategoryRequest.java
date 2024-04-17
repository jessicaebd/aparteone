package com.com.aparteone.dto.request.category;

import jakarta.persistence.Lob;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MaintenanceCategoryRequest {
    private Integer apartmentId;
    @Lob
    private String image;
    private String category;
    private String description;
}
