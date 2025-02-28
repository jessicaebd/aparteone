
package com.com.aparteone.dto.response;

import jakarta.persistence.Lob;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartResponse {
    Integer id;
    Integer residentId;
    Integer merchantId;
    String merchantName;
    Integer productId;
    @Lob
    String productImage;
    String productName;
    Double productPrice;
    Integer quantity;
    String notes;
    Double totalPrice;
}
