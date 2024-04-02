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
  user_id: string,
  nip: string,
  name: string,
  email: string,
  company: string,
  division_code: string,
  division_name: string,
  sub_division_code: string,
  sub_division_name: string,
  position_code: string,
  position_name: string,
  job_code: string,
  job_description: string,
  personal_title: string,
}