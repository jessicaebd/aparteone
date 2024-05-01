import { Injectable, OnInit } from '@angular/core';
import { LoginResponse } from './auth/models/auth.model';
import { Subject, Observable } from 'rxjs';
import { LocalStorageService } from 'ngx-webstorage';
import { UserStorage } from './shared/models/general.model';
import { Router } from '@angular/router';
import { environment } from 'src/environments/development';
import { HttpRequest, HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private apiUrl = `${environment.baseApiUrl}`;
  private apiNotification = `${environment.modules.feature.notification}`;
  private apiBilling = `${environment.modules.feature.billing}`;
  private apiMailbox = `${environment.modules.feature.mailbox}`;

  constructor(
    private localStorage: LocalStorageService,
    private router: Router,
    private httpClient: HttpClient
  ) { }

  public saveUser(response: LoginResponse) {
    this.storeToLocalStorage(response);
  }

  storeToLocalStorage(response: LoginResponse) {
    this.storeAccessToken(response.token, response.expirationTime);
    this.storeRefreshToken(response.refreshToken);
    this.storeUser(response);
  }

  storeAccessToken(token: string, expirationTime: string) {
    let accessToken = { token: token, expirationTime: expirationTime }
    this.localStorage.store('accessToken', accessToken);
  }

  storeRefreshToken(refreshToken: string) {
    this.localStorage.store('refreshToken', refreshToken);
  }

  storeUser(response: LoginResponse) {
    this.localStorage.store('user', response.profile);
  }

  clearLocalSession() {
    this.localStorage.clear('accessToken');
    this.localStorage.clear('refreshToken');
    this.localStorage.clear('user');
  }

  retrieveUser(): UserStorage {
    const user = this.localStorage.retrieve('user');
    return {
      id: user['id'],
      role: user['role'],
      email: user['email'],
      phone: user['phone'],
      apartmentId: user['apartmentId'],
      apartmentUnitId: user['apartmentUnitId'],
      apartmentName: user['apartmentName'],
      image: user['image'],
      name: user['name'],
      type: user['type'],
      unitNumber: user['unitNumber'],
      unitType: user['unitType'],
      bankAccount: user['bankAccount'],
      accountNumber: user['accountNumber'],
      accountName: user['accountName'],
      category: user['category'],
      address: user['address'],
      province: user['province'],
      city: user['city'],
      postalCode: user['postalCode'],
      latitude: user['latitude'],
      longitude: user['longitude'],
      isActive: user['isActive'],
      isApproved: user['isApproved'],
    };
  }

  retrieveAccessToken() {
    return this.localStorage.retrieve('accessToken');
  }

  retrieveRefreshToken() {
    return this.localStorage.retrieve('refreshToken');
  }

  public deleteUser() {
    this.clearLocalSession();
  }

  retrieveAccessTokenExpiredIn() {
    return this.localStorage.retrieve('accessToken').expirationTime;
  }

  // NOTIFICATION
  getNotifications(userId: any): any {
    const apiUrl = `${this.apiUrl}/${this.apiNotification}`;
    const headers = new HttpHeaders({ });
    const params = new HttpParams({ fromObject: { 'userId': userId } });
    const options = { headers, params };
    return this.httpClient.get<any>(apiUrl, options);
  }

  sendBillingNotification(userId: any, billingDetailId:any): any {
    const apiUrl = `${this.apiUrl}/${this.apiNotification}/${this.apiBilling}`;
    const headers = new HttpHeaders({ });
    const params = new HttpParams({ fromObject: { 'userId': userId, 'billingDetailId': billingDetailId } });
    const options = { headers, params };
    const body = {}
    return this.httpClient.post<any>(apiUrl, body, options);
  }

  sendMailboxNotification(userId: any, mailboxDetailId:any): any {
    const apiUrl = `${this.apiUrl}/${this.apiNotification}/${this.apiMailbox}`;
    const headers = new HttpHeaders({ });
    const params = new HttpParams({ fromObject: { 'userId': userId, 'mailboxDetailId': mailboxDetailId } });
    const options = { headers, params };
    const body = {}
    return this.httpClient.post<any>(apiUrl, body, options);
  }
}
