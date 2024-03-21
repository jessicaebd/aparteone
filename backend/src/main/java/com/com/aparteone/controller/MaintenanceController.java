package com.com.aparteone.controller;

import java.util.List;

import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.com.aparteone.entity.Maintenance;
import com.com.aparteone.entity.MaintenanceRequest;
import com.com.aparteone.service.MaintenanceService;

@RestController
@RequestMapping("/api/maintenance")
public class MaintenanceController {

    @Autowired
    private MaintenanceService maintenanceService;

    @GetMapping("/{apartmentId}")
    public ResponseEntity<List<Maintenance>> getAllMaintenance(@PathVariable Integer apartmentId) {
        List<Maintenance> maintenanceList = maintenanceService.getAllMaintenance(apartmentId);

        if(maintenanceList.isEmpty()) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok().body(maintenanceList);
        }
    }

    @GetMapping("/{residentId}/{maintenanceId}")
    public ResponseEntity<List<MaintenanceRequest>> getMaintenanceRequestList(@PathVariable Integer residentId, @PathVariable Integer maintenanceId) {
        List<MaintenanceRequest> maintenanceList = maintenanceService.getMaintenanceRequestList(residentId, maintenanceId);

        if(maintenanceList.isEmpty()) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok().body(maintenanceList);
        }
    }
}
