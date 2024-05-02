package com.com.aparteone.dto.response.stats;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MerchantStatsResponse {
    Integer totalIncome;
    Integer pendingTotal;
    Integer onDeliveryTotal;
    Integer completedTotal;
    Integer paymentApprovalTotal;
}
