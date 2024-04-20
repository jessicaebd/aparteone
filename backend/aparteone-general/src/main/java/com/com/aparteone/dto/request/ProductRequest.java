package com.com.aparteone.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductRequest {
    private Integer merchantId;
    private String image;
    private String name;
    private Double price;
    private String description;
}
