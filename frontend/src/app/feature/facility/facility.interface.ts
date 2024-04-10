export interface FacilityRequest{
    "Facility Type"?: any,
    "Book Date"?: any,
    "Book Time"?: any,
    "Status"?: any,
    "Request Date"?: any,
    "Completed Date"?: any,
    "Canceled Date"?: any,
  }

export interface FacilityCategory{
    "Category Name"?: any,
    "Category Image"?: any,
    "Category Time"?:[
        FacilityCategoryTime
    ],
    "Status"?: any,
    "Created Date"?: any,
    "Deleted Date"?: any
}

export interface FacilityCategoryTime{
    "id": any,
    "Start Time": any,
    "End Time": any,
}