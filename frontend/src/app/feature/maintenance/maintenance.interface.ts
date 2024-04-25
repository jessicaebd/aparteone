export interface MaintenanceRequest{
    "id"?: any,
    "receiptId"?: any,
    "residentId"?: any,
    "residentName"?: any,
    "residentUnit"?: any,
    "maintenanceId"?: any,
    "maintenanceCategory"?: any,
    "description"?: any,
    "status"?: any,
    "requestDate"?: any,
    "assignedTo"?: any,
    "assignedDate"?: any,
    "completedDate"?: any,
    "cancelledDate"?: any
}

export interface MaintenanceCategory{
    "id"?: any,
    "apartmentId"?: any,
    "image"?: any,
    "category"?: any,
    "description"?: any,
    "isActive"?: any,
    "createdDate"?: any,
    "modifiedDate"?: any
}