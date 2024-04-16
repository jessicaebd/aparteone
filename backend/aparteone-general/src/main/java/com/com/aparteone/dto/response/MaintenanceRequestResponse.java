package com.com.aparteone.dto.response;

import java.util.Date;

import com.com.aparteone.entity.Maintenance;
import com.com.aparteone.entity.MaintenanceRequest;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MaintenanceRequestResponse {
    Integer id;
    Integer maintenanceId;
    String maintenanceCategory;
    String status;
    Date requestDate;
    String assignedTo;
    Date assignedDate;
    Date completedDate;
    Date cancelledDate;
    
    public MaintenanceRequestResponse(MaintenanceRequest request, Maintenance maintenance) {
        this.id = request.getId();
        this.maintenanceCategory = maintenance.getCategory();
        this.status = request.getStatus();
        this.requestDate = request.getCreatedDate();
        this.assignedTo = request.getAssignedTo();
        this.assignedDate = request.getAssignedDate();
        this.completedDate = request.getCompletedDate();
        this.cancelledDate = request.getCancelledDate();
    }
}
