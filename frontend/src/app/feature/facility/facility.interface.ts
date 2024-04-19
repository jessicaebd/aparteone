export interface FacilityRequest{
    "ID"?: any,
    "Resident ID"?: any,
    "Resident Unit"?: any,
    "Resident Name"?: any,
    "Facility ID"?: any,
    "Facility Category"?: any,
    "Facility Time ID"?: any,
    "Book Date"?: any,
    "Start Time"?: any,
    "End Time"?: any,
    "Status"?: any,
    "Request Date"?: any,
    "Completed Date"?: any,
    "Cancelled Date"?: any,
  }

export interface Facility {
    'Category' : FacilityCategory,
    'Time': FacilityCategoryTime
}

export interface FacilityCategory{
    "ID"?: any,
    "Apartment ID"?: any,
    "Category Name"?: any,
    "Category Desc"?: any,
    "Category Image"?: any,
    "Category Time"?: FacilityCategoryTime[],
    "Status"?: any,
    "Created Date"?: any,
    "Modified Date"?: any
    "Deleted Date"?: any
}

export interface FacilityCategoryTime{
    "id": any,
    "startTime": any,
    "endTime": any,
    "isActive"?: any,
    "isAvailable"?: any,
}