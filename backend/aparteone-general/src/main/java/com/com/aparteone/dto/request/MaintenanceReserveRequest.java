package com.com.aparteone.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MaintenanceReserveRequest {
    private Integer maintenanceId;
    private Integer residentId;
    private String description;
}
