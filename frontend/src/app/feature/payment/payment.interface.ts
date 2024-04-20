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
    "payment"?: PaymentProof,
}

export interface PaymentCategory{
    "ID"?: any,
    "Apartment ID"?: any,
    "Category Name"?: any,
    "Status"?: any,
    "Created Date"?: any,
    "Modified Date"?: any
}

export interface PaymentProof{
    id: any,
    paymentProofImage?: any,
    paymentStatus?: any,
    paymentDate?: any,
    verifiedDate?: any
}