package com.com.aparteone.dto.response;

import java.util.Date;
import java.util.List;

import com.com.aparteone.entity.Transaction;
import com.com.aparteone.entity.general.Merchant;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@NoArgsConstructor
@AllArgsConstructor
public class TransactionResidentResponse {
    Integer id;
    Integer residentId;
    Integer merchantId;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MMM-yyyy", timezone = "Asia/Bangkok")
    Date transactionDate;
    String merchantName;
    String merchantCategory;
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

    public TransactionResidentResponse(Transaction transaction, Merchant merchant) {
        this.id = transaction.getId();
        this.residentId = transaction.getResidentId();
        this.merchantId = transaction.getMerchantId();
        this.transactionDate = transaction.getCreatedDate();
        this.grandTotal = transaction.getGrandTotal();
        this.status = transaction.getStatus();
        this.merchantName = merchant.getName();
        this.merchantCategory = merchant.getCategory();
    }
}
