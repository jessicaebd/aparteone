package com.com.aparteone.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CartRequest {
    private Integer residentId;
    private Integer merchantId;
    private Integer productId;
    private Integer quantity;
    private String notes;
}
