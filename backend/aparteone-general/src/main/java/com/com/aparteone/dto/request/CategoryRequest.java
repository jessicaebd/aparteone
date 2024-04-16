package com.com.aparteone.dto.request;

import jakarta.persistence.Lob;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CategoryRequest {
    private Integer apartmentId;
    @Lob
    private String image;
    private String category;
    private String description;
    private Boolean isActive;
}
