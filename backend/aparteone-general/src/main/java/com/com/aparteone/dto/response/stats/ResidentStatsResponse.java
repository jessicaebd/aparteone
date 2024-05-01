package com.com.aparteone.dto.response.stats;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResidentStatsResponse {
    Integer facilityTotal;
    Integer maintenanceTotal;
    Integer mailboxTotal;
    Integer billsTotal;
}
