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
    // id?:any
    // merchantId?: any;
    // merchantName?: any;
    // residentId?: any;
    // productId?: any;
    // productImage?: any;
    // productName?: any;
    // productPrice?: any;
    // quantity?: any;
    // notes?: any;
    // totalPrice?: any;
}
