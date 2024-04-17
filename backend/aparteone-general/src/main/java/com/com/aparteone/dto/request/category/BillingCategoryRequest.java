package com.com.aparteone.dto.request.category;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BillingCategoryRequest {
    private Integer apartmentId;
    private String category;
}
