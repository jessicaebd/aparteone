export interface FacilityRequest{
    "id"?: any,
    "receiptId"?: any,
    "residentId"?: any,
    "residentName"?: any,
    "residentUnit"?: any,
    "facilityId"?: any,
    "facilityCategory"?: any,
    "facilityTimeId"?: any,
    "reserveDate"?: any,
    "startTime"?: any,
    "endTime"?: any,
    "facilityRequeststatus"?: any,
    "createdDate"?: any,
    "completedDate"?: any,
    "cancelledDate"?: any,
  }

export interface FacilityCategory{
    "id"?: any,
    "apartmentId"?: any,
    "category"?: any,
    "description"?: any,
    "image"?: any,
    "isActive"?: any,
    "createdDate"?: any,
    "modifiedDate"?: any
}

export interface FacilityCategoryTime{
    "id": any,
    "startTime": any,
    "endTime": any,
    "isActive"?: any,
    "isAvailable"?: any,
}