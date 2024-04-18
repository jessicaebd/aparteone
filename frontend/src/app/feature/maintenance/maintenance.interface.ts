export interface MaintenanceRequest{
    "ID"?: any,
    "Resident Name"?: any,
    "Maintenance ID"?: any,
    "Maintenance Category"?: any,
    "Maintenance Detail"?: any,
    "Status"?: any,
    "Request Date"?: any,
    "Assigned Date"?: any,
    "Assigned Name"?: any,
    "Completed Date"?: any,
    "Cancelled Date"?: any,
    // "Modified Date"?: any,
}

export interface MaintenanceCategory{
    "ID"?: any,
    "Apartment ID"?: any,
    "Category Name"?: any,
    "Category Desc"?: any,
    "Category Image"?: any,
    "Status"?: any,
    "Created Date"?: any,
    "Modified Date"?: any
}