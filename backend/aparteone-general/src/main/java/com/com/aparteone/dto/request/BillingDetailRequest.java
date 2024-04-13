package com.com.aparteone.dto.request;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BillingDetailRequest {
    private Integer billingId;
    private Integer residentId;
    private Double amount;
    private Date dueDate;
}
