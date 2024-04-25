export interface Billing{
    "id"?: any,
    "receiptId"?: any,
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

export interface BillingCategory{
    "id"?: any,
    "apartmentId"?: any,
    "category"?: any,
    "isActive"?: any,
    "createdDate"?: any,
    "modifiedDate"?: any
}

export interface PaymentProof{
    'id': any,
    'paymentProofImage'?: any,
    'paymentStatus'?: any,
    'paymentDate'?: any,
    'verifiedDate'?: any
}