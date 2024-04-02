import { Injectable, OnInit } from '@angular/core';
import { LoginResponse } from './auth/models/auth.model';
import { Subject, Observable } from 'rxjs';
import { LocalStorageService } from 'ngx-webstorage';
import { UserStorage } from './shared/models/general.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private domain = 'DTIDOMAIN';

  constructor(
    private localStorage: LocalStorageService,
    private router: Router
  ) { }

  public saveUser(response: LoginResponse) {
    this.storeToLocalStorage(response);
  }

  storeToLocalStorage(response: LoginResponse) {
    this.storeAccessToken(response.access_token, response.access_token_expires_in);
    this.storeRefreshToken(response.refresh_token, response.refresh_token_expires_in);
    this.storeUser(response);
  }

  storeAccessToken(accessToken: string, accessTokenExpiredIn: string) {
    let access_token = { token: accessToken, expired_in: accessTokenExpiredIn }
    this.localStorage.store('access_token', access_token);
  }

  storeRefreshToken(refreshToken: string, refreshTokenExpiredIn: string) {
    let refresh_token = { token: refreshToken, expired_in: refreshTokenExpiredIn }
    this.localStorage.store('refresh_token', refresh_token);
  }

  storeUser(response: LoginResponse) {
    this.localStorage.store('user', response.user_detail);
  }

  clearLocalSession() {
    this.localStorage.clear('access_token');
    this.localStorage.clear('refresh_token');
    this.localStorage.clear('user');
  }

  retrieveUser(): UserStorage {
    const user = this.localStorage.retrieve('user');
    return {
      user_id: user['user_id'],
      nip: user['nip'],
      name: user['name'],
      email: user['email'],
      company: user['company'],
      division_code: user['division_code'],
      division_name: user['division_name'],
      sub_division_code: user['sub_division_code'],
      sub_division_name: user['sub_division_name'],
      position_code: user['sub_division_name'],
      position_name: user['position_name'],
      job_code: user['job_code'],
      job_description: user['job_description'],
      personal_title: user['personal_title'],
    };
  }

  retrieveAccessToken() {
    return this.localStorage.retrieve('access_token');
  }

  retrieveRefreshToken() {
    return this.localStorage.retrieve('refresh_token');
  }

  public deleteUser() {
    this.clearLocalSession();
  }

  retrieveAccessTokenExpiredIn() {
    return this.localStorage.retrieve('access_token').expired_in;
  }

  retrieveDomain() {
    return this.domain;
  }
}
