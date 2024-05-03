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
  private apiCount = `${environment.modules.general.count}`;
  private apiBilling = `${environment.modules.feature.billing}`;
  private apiMailbox = `${environment.modules.feature.mailbox}`;
  private apiMaintenance = `${environment.modules.feature.maintenance}`;
  private apiFacility = `${environment.modules.feature.facility}`;
  private apiMerchant = `${environment.modules.feature.merchant}`;
  private apiUpdate = `${environment.modules.general.update}`;
  private apiRequest = `${environment.modules.general.request}`;
  private apiApartment = `${environment.modules.feature.apartment}`;
  private apiResident = `${environment.modules.feature.resident}`;

  constructor(
    private localStorage: LocalStorageService,
    private router: Router,
    private httpClient: HttpClient
  ) { }

  saveUser(response: LoginResponse): Promise<any> {
    return new Promise<any> (async resolve => {
      await this.storeToLocalStorage(response);
      resolve(true);
    })
  }

  storeToLocalStorage(response: LoginResponse): Promise<any> {
    return new Promise<any> (async resolve => {
      await this.storeAccessToken(response.token);
      if(response.profile){
        await this.storeUser(response);
      }
      else {
        await this.storeAdmin(response);
      }
      resolve(true);
    })
  }

  storeAccessToken(token: string): Promise<any> {
    return new Promise<any> (resolve => {
      this.localStorage.store('accessToken', token);
      resolve(true);
    })
  }

  storeAdmin(response: LoginResponse): Promise<any> {
    return new Promise<any> (resolve => {
      let obj = {
        id: response['id'],
        role: response['role'],
        email: response['email'],
        phone: response['phone'],
      };
      this.localStorage.store('user', obj);
      resolve(true);
    })
  }

  storeUser(response: LoginResponse): Promise<any> {
    return new Promise<any> (resolve => {
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
      resolve(true);
    })
  }

  updateUser(response: any) {
    const user = this.localStorage.retrieve('user');
    this.localStorage.clear('user');
    let obj = {
      id: user['id'],
      role: user['role'],
      email: user['email'],
      phone: user['phone'],
      apartmentId: user['apartmentId'],
      apartmentUnitId: user['apartmentUnitId'],
      apartmentName: user['apartmentName'],
      image: response.image,
      name: response.name,
      type: user['type'],
      unitNumber: user['unitNumber'],
      unitType: user['unitType'],
      bankAccount: response.bankAccount,
      accountNumber: response.accountNumber,
      accountName: response.accountName,
      category: response.category,
      address: response.address,
      province: response.province,
      city: response.city,
      postalCode: response.postalCode,
      latitude: response.latitude,
      longitude: response.longitude,
      isActive: user['isActive'],
      isApproved: user['isApproved'],
    };
    this.localStorage.store('user', obj);
  }

  clearLocalSession() {
    this.localStorage.clear('accesstoken');
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

  // Home
  getApartmentTotal(): any {
    const apiUrl = `${this.apiUrl}/${this.apiApartment}/${this.apiCount}`;
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.retrieveAccessToken() });
    const options = { headers };
    return this.httpClient.get<any>(apiUrl, options);
  }
  
  countResidentByApartmentId(apartmentId: any): any {
    const apiUrl = `${this.apiUrl}/${this.apiResident}/${this.apiCount}`;
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.retrieveAccessToken() });
    const params = new HttpParams({ fromObject: { 'apartmentId': apartmentId } });
    const options = { headers, params };
    return this.httpClient.get<any>(apiUrl, options);
  }
  
  countMerchantByApartmentId(apartmentId: any): any {
    const apiUrl = `${this.apiUrl}/${this.apiMerchant}/${this.apiCount}`;
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.retrieveAccessToken() });
    const params = new HttpParams({ fromObject: { 'apartmentId': apartmentId } });
    const options = { headers, params };
    return this.httpClient.get<any>(apiUrl, options);
  }
  
  countBillingDetailByResidentId(residentId: any): any {
    const apiUrl = `${this.apiUrl}/${this.apiBilling}/${this.apiBilling}/${this.apiCount}`;
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.retrieveAccessToken() });
    const params = new HttpParams({ fromObject: { 'residentId': residentId } });
    const options = { headers, params };
    return this.httpClient.get<any>(apiUrl, options);
  }
  
  countFacilityRequestByResidentId(residentId: any): any {
    const apiUrl = `${this.apiUrl}/${this.apiFacility}/${this.apiRequest}/${this.apiCount}`;
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.retrieveAccessToken() });
    const params = new HttpParams({ fromObject: { 'residentId': residentId } });
    const options = { headers, params };
    return this.httpClient.get<any>(apiUrl, options);
  }
  
  countMailboxDetailByResidentId(residentId: any): any {
    const apiUrl = `${this.apiUrl}/${this.apiMailbox}/${this.apiDetail}/${this.apiCount}`;
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.retrieveAccessToken() });
    const params = new HttpParams({ fromObject: { 'residentId': residentId } });
    const options = { headers, params };
    return this.httpClient.get<any>(apiUrl, options);
  }
  
  countMaintenanceRequestByResidentId(residentId: any): any {
    const apiUrl = `${this.apiUrl}/${this.apiMaintenance}/${this.apiRequest}/${this.apiCount}`;
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.retrieveAccessToken() });
    const params = new HttpParams({ fromObject: { 'residentId': residentId } });
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

  // UPDATE PROFILE
  updateResident(residentId:any, body:any): any {
    const apiUrl = `${this.apiUrl}/${this.apiResident}/${this.apiUpdate}`;
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.retrieveAccessToken() });
    const params = new HttpParams({ fromObject: { 'residentId': residentId } });
    const options = { headers, params };
    return this.httpClient.post<any>(apiUrl, body, options);
  }

  updateApartment(apartmentId:any, body:any): any {
    const apiUrl = `${this.apiUrl}/${this.apiApartment}/${this.apiUpdate}`;
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.retrieveAccessToken() });
    const params = new HttpParams({ fromObject: { 'apartmentId': apartmentId } });
    const options = { headers, params };
    return this.httpClient.post<any>(apiUrl, body, options);
  }

  updateMerchant(merchantId:any, body:any): any {
    const apiUrl = `${this.apiUrl}/${this.apiMerchant}/${this.apiMerchant}/${this.apiUpdate}`;
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.retrieveAccessToken() });
    const params = new HttpParams({ fromObject: { 'merchantId': merchantId } });
    const options = { headers, params };
    return this.httpClient.post<any>(apiUrl, body, options);
  }
}
