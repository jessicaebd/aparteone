export interface User {
    id: number,
    apartmentId: number,
    apartmentUnitId: number,
    image: string,
    name: string,
    type: string,
    apartmentName: string,
    unitNumber: string,
    unitType: string,
    isActive: string,
    isApproved: string
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

