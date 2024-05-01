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
  private apiUser = `${environment.modules.general.user}`;
  private apiDetail = `${environment.modules.general.detail}`;
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
    this.storeAccessToken(response.token);
    this.storeUser(response);
  }

  storeAccessToken(token: string) {
    this.localStorage.store('accessToken', token);
  }

  storeUser(response: LoginResponse) {
    let obj = {
      id: response['id'],
      role: response['role'],
      email: response['email'],
      phone: response['phone'],
      apartmentId: response.profile['apartmentId'],
      apartmentUnitId: response.profile['apartmentUnitId'],
      apartmentName: response.profile['apartmentName'],
      image: response.profile['image'],
      name: response.profile['name'],
      type: response.profile['type'],
      unitNumber: response.profile['unitNumber'],
      unitType: response.profile['unitType'],
      bankAccount: response.profile['bankAccount'],
      accountNumber: response.profile['accountNumber'],
      accountName: response.profile['accountName'],
      category: response.profile['category'],
      address: response.profile['address'],
      province: response.profile['province'],
      city: response.profile['city'],
      postalCode: response.profile['postalCode'],
      latitude: response.profile['latitude'],
      longitude: response.profile['longitude'],
      isActive: response.profile['isActive'],
      isApproved: response.profile['isApproved'],
    };
    this.localStorage.store('user', obj);
  }

  clearLocalSession() {
    this.localStorage.clear('accessToken');
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

  public deleteUser() {
    this.clearLocalSession();
  }

  // User
  getUserDetail(userId: any): any {
    const apiUrl = `${this.apiUrl}/${this.apiUser}/${this.apiDetail}`;
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.retrieveAccessToken() });
    const params = new HttpParams({ fromObject: { 'userId': userId } });
    const options = { headers, params };
    return this.httpClient.get<any>(apiUrl, options);
  }

  // NOTIFICATION
  getNotifications(userId: any): any {
    const apiUrl = `${this.apiUrl}/${this.apiNotification}`;
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.retrieveAccessToken() });
    const params = new HttpParams({ fromObject: { 'userId': userId } });
    const options = { headers, params };
    return this.httpClient.get<any>(apiUrl, options);
  }

  sendBillingNotification(userId: any, billingDetailId:any): any {
    const apiUrl = `${this.apiUrl}/${this.apiNotification}/${this.apiBilling}`;
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.retrieveAccessToken() });
    const params = new HttpParams({ fromObject: { 'userId': userId, 'billingDetailId': billingDetailId } });
    const options = { headers, params };
    const body = {}
    return this.httpClient.post<any>(apiUrl, body, options);
  }

  sendMailboxNotification(userId: any, mailboxDetailId:any): any {
    const apiUrl = `${this.apiUrl}/${this.apiNotification}/${this.apiMailbox}`;
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.retrieveAccessToken() });
    const params = new HttpParams({ fromObject: { 'userId': userId, 'mailboxDetailId': mailboxDetailId } });
    const options = { headers, params };
    const body = {}
    return this.httpClient.post<any>(apiUrl, body, options);
  }
}
