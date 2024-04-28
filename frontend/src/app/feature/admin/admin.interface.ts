export interface Resident {
    apartmentId?: any;
    apartmentName?: any;
    apartmentUnitId?: any;
    id?: any;
    image?: any;
    isActive?: any;
    isApproved?: any;
    name?: any;
    type?: any;
    unitNumber?: any;
    unitType?: any;
}

export interface Apartment {
    address?:any;
    city?:any;
    id?:any;
    image?:any;
    isActive?:any;
    isApproved?:any;
    latitude?:any;
    longitude?:any;
    name?:any;
    postalCode?:any;
    province?:any;
}

export interface Unit {
    apartmentId?:any;
    apartmentName?:any;
    id?:any;
    type?:any;
    unitNumber?:any;
}
