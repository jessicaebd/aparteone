export interface Payment{
    "id"?: any,
    "residentId"?: any,
    "residentUnit"?: any,
    "residentName"?: any,
    "billingId"?: any,
    "billingCategory"?: any,
    "status"?: any,
    "amount"?: any,
    "billingDate"?: any,
    "dueDate"?: any,
    "completedDate"?: any,
    "cancelledDate"?: any,
    "payment"?: any,
    // "Modified Date"?: any,
}

export interface PaymentCategory{
    "ID"?: any,
    "Apartment ID"?: any,
    "Category Name"?: any,
    "Status"?: any,
    "Created Date"?: any,
    "Modified Date"?: any
}