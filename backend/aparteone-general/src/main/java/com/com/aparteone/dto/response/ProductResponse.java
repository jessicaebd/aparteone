
package com.com.aparteone.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductResponse {
    Integer id;
    Integer merchantId;
    String merchantName;
    String image;
    String name;
    Double price;
    String description;
    String isActive;
}
