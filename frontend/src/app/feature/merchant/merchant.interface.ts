export interface Merchant{
    id?:any;
    image?: any;
    name?: any;
    bankAccount?: any;
    accountNumber?: any;
    accountName?: any;
    category?: any;
    address?: any;
    isActive?: any;
    isApproved?: any;
}

export interface Product{
    id?:any
    merchantId?: any;
    merchantName?: any;
    image?: any;
    name?: any;
    price?: any;
    description?: any;
    isActive?: any;
    quantity?: any;
    notes?: any;
}

export interface Cart{
    id?:any
    merchantId?: any;
    merchantName?: any;
    residentId?: any;
    productId?: any;
    productImage?: any;
    productName?: any;
    productPrice?: any;
    quantity?: any;
    notes?: any;
    totalPrice?: any;
}

export interface Transaction{
    id?:any
    residentId?: any;
    residentName?: any;
    residentUnit?: any;
    merchantId?: any;
    merchantName?: any;
    merchantCategory?: any;
    grandTotal?: any;
    status?: any;
    transactionDate?: any;
    deliveredDate?: any;
    completedDate?: any;
    cancelledDate?: any;
    details?: TransactionDetail[];
    payment?: PaymentProof;
}

export interface TransactionDetail{
    id?:any
    productId?: any;
    name?: any;
    price?: any;
    description?: any;
    quantity?: any;
    notes?: any;
    totalPrice?: any;
}

export interface PaymentProof{
    id?:any;
    paymentDate?: any;
    paymentProofImage?: any;
    paymentStatus?: any;
    verifiedDate?: any;
}
