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
        {
            "ID": any,
            "Start Time": any,
            "End Time": any,
        }
    ],
    "Status"?: any,
    "Created Date"?: any,
    "Deleted Date"?: any
}