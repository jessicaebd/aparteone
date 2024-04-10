import { ResponseSchema } from './../../shared/models/general.model';
import { LoginResponse, RefreshToken } from './../models/auth.model';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from 'src/environments/development';
import { Login } from "../models/auth.model";
import { AppService } from 'src/app/app.service';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {

    private apiUrl = `${environment.baseApiUrl}`;

    constructor(private http: HttpClient, private appService: AppService, private router: Router) { }

    login(user_id: string, password: string) {
        const apiUrl = `${this.apiUrl}/login`
        const body: Login = {
            user_id: user_id,
            password: password
        }

        return this.http.post<ResponseSchema<LoginResponse>>(`${apiUrl}`, body);
    }

    refreshToken() {
        const access_token = this.appService.retrieveAccessToken().token;
        const refresh_token = this.appService.retrieveRefreshToken().token;

        const apiUrl = `${this.apiUrl}/refresh`
        const body: RefreshToken = {
            access_token: access_token,
            refresh_token: refresh_token
        }

        return this.http.post<ResponseSchema<LoginResponse>>(`${apiUrl}`, body);
    }

    logout() {
        this.appService.deleteUser();
        this.router.navigateByUrl('login');
    }
}