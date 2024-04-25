export interface Mailbox{
    "id"?: any,
    "receiptId"?: any,
    "residentId"?: any,
    "residentName"?: any,
    "residentUnit"?: any,
    "mailboxId"?: any,
    "mailboxCategory"?: any,
    "description"?: any,
    "status"?: any,
    "receivedDate"?: any,
    "completedDate"?: any
}

export interface MailboxCategory{
    "id"?: any,
    "apartmentId"?: any,
    "category"?: any,
    "isActive"?: any,
    "createdDate"?: any,
    "modifiedDate"?: any
}