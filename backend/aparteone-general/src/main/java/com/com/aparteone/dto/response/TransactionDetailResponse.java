package com.com.aparteone.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TransactionDetailResponse {
    Integer id;
    Integer productId;
    String name;
    Double price;
    String description;
    Integer quantity;
    String notes;
    Double totalPrice;
}
