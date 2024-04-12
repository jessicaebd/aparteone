
package com.com.aparteone.dto.response.merchant;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@NoArgsConstructor
@AllArgsConstructor
public class CartResponse {
    Integer id;
    Integer residentId;
    Integer merchantId;
    String merchantName;
    Integer productId;
    String productImage;
    String productName;
    Double productPrice;
    Integer quantity;
    String notes;
    Double totalPrice;
}
