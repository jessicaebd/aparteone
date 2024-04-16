package com.com.aparteone.dto.response;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TransactionMerchantResponse {
    Integer id;
    Integer merchantId;
    Integer residentId;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MMM-yyyy", timezone = "Asia/Bangkok")
    Date transactionDate;
    String residentName;
    String residentUnit;
    Double grandTotal;
    String status;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MMM-yyyy", timezone = "Asia/Bangkok")
    Date deliveredDate;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MMM-yyyy", timezone = "Asia/Bangkok")
    Date completedDate;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MMM-yyyy", timezone = "Asia/Bangkok")
    Date cancelledDate;
    List<TransactionDetailResponse> details;
    PaymentResponse payment;
}
