package com.com.aparteone.dto.response;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@NoArgsConstructor
@AllArgsConstructor
public class TransactionDetailResponse {
    Integer productId;
    String name;
    Double price;
    String description;
    Integer quantity;
    String notes;
    Double totalPrice;
}
