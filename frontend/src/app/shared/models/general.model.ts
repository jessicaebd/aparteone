export interface Header {
  Authorization?: string;
  Database?: string;
  Content_Type?: string;
}

export interface ResponseSchema<T> {
  error_schema: ErrorSchema;
  output_schema: OutputSchema<T>;
}

export interface ErrorSchema {
  error_code: string;
  error_message: ErrorMessage;
}

export interface ErrorMessage {
  english: string;
  indonesian: string;
}

export interface OutputSchema<T> {
  output_data_count: number;
  output_data: T;
}

export interface UserStorage {
  id?:any,
  role?:any,
  email?:any,
  phone?:any,
  apartmentId?:any,
  apartmentUnitId?:any,
  apartmentName?:any,
  image?:any,
  name?:any,
  type?:any,
  unitNumber?:any,
  unitType?:any,
  bankAccount?:any,
  accountNumber?:any,
  accountName?:any,
  category?:any,
  address?:any,
  province?:any,
  city?:any,
  postalCode?:any,
  latitude?:any,
  longitude?:any,
  isActive?:any,
  isApproved?:any,
}