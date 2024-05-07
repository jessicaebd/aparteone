export interface User {
    id?: any,
    apartmentId?: any,
    apartmentUnitId?: any,
    image?: any,
    name?: any,
    type?: any,
    apartmentName?: any,
    unitNumber?: any,
    unitType?: any,
    isActive?: any,
    isApproved?: any,
    bankAccount?: any,
    accountNumber?: any,
    accountName?: any,
    category?: any,
    address?: any,
    province?: any,
    city?: any,
    postalCode?: any,
    latitude?: any,
    longitude?: any,
}

export interface LoginResponse {
    message: string
    token: string
    refreshToken: string
    expirationTime: string
    id: string
    role: string
    email: string
    phone: string
    profile: User
}

export interface Login {
    email: string,
    password: string,
}

