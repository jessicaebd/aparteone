package com.com.aparteone.dto.request;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TransactionRequest {
    private Integer residentId;
    private Integer merchantId;
    private List<Integer> carts;
}
