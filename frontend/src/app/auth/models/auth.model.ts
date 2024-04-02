interface AuthResponseData {
    id?: string,
    user_name: string
    access_token: string
    refresh_token: string
    access_expires_in: string
    user_detail: User
    role_access: RoleAccess[]
}

interface RoleAccess {
    role_name: string
    role_access: AccessManagement[]
}

interface User {
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

interface Application {
    application_code: string
    application_name: string
}

interface Role {
    role_id: number
    role_code: string
    role_name: string
}

interface AccessManagement {
    access_name: string
    view: boolean
    edit: boolean
}

export interface Login {
    user_id: string,
    password: string,
}

export interface RefreshToken {
    access_token: string,
    refresh_token: string
}

export interface LoginResponse {
    access_token: string
    access_token_expires_in: string
    refresh_token: string
    refresh_token_expires_in: string
    user_detail: User
}