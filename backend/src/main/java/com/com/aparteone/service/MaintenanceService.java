package com.com.aparteone.service;

import java.util.List;

import com.com.aparteone.entity.Maintenance;
import com.com.aparteone.entity.MaintenanceRequest;

public interface MaintenanceService {
    public List<Maintenance> getAllMaintenance(Integer apartmentId);

    public List<MaintenanceRequest> getMaintenanceRequestList(Integer residentId, Integer maintenanceId);

}
