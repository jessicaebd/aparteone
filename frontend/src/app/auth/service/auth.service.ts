import { ResponseSchema } from './../../shared/models/general.model';
import { LoginResponse } from './../models/auth.model';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from 'src/environments/development';
import { Login } from "../models/auth.model";
import { AppService } from 'src/app/app.service';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private apiUrl = `${environment.baseApiUrl}`;
    private apiAuth = `${environment.modules.general.auth}`;
    private apiLogin = `${environment.modules.general.login}`;
    private apiRegister = `${environment.modules.general.register}`;
    private apiApartment = `${environment.modules.feature.apartment}`;
    private apiResident = `${environment.modules.feature.resident}`;
    private apiMerchant = `${environment.modules.feature.merchant}`;

    constructor(private http: HttpClient, private appService: AppService, private router: Router) { }

    login(email: string, password: string) {
        const apiUrl = `${this.apiUrl}/${this.apiAuth}/${this.apiLogin}`
        const body: Login = {
            email: email,
            password: password
        }
        return this.http.post<ResponseSchema<LoginResponse>>(`${apiUrl}`, body);
    }

    logout() {
        this.appService.deleteUser();
        this.router.navigateByUrl('login');
    }

    registerApartment(body:any): any {
        const apiUrl = `${this.apiUrl}/${this.apiAuth}/${this.apiRegister}/${this.apiApartment}`;
        return this.http.post<any>(apiUrl, body);
    }

    registerResident(body:any): any {
        const apiUrl = `${this.apiUrl}/${this.apiAuth}/${this.apiRegister}/${this.apiResident}`;
        return this.http.post<any>(apiUrl, body);
    }

    registerMerchant(body:any): any {
        const apiUrl = `${this.apiUrl}/${this.apiAuth}/${this.apiRegister}/${this.apiMerchant}`;
        return this.http.post<any>(apiUrl, body);
    }
}