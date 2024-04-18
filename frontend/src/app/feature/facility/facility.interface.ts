export interface FacilityRequest{
    "ID"?: any,
    "Resident Name"?: any,
    "Facility ID"?: any,
    "Facility Category"?: any,
    "Book Date"?: any,
    "Book Time"?: any,
    "Status"?: any,
    "Request Date"?: any,
    "Assigned Date"?: any,
    "Assigned Name"?: any,
    "Completed Date"?: any,
    "Canceled Date"?: any,
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
}