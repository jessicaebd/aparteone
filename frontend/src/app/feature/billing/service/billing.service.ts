import { HttpRequest, HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/development';
import { AppService } from 'src/app/app.service';

@Injectable({
  providedIn: 'root'
})
export class BillingService {
  private apiUrl = `${environment.baseApiUrl}`;
  private apiBilling = `${environment.modules.feature.billing}`;
  private apiPaymentProof = `${environment.modules.feature.paymentProof}`;
  private apiAdd = `${environment.modules.general.add}`;
  private apiUpdate = `${environment.modules.general.update}`;
  private apiDetail = `${environment.modules.general.detail}`;
  private apiVerify = `${environment.modules.general.verify}`;
  private apiApartment = `${environment.modules.feature.apartment}`;
  private apiResident = `${environment.modules.feature.resident}`;

  constructor(private httpClient: HttpClient, private appService: AppService) { }

  // CATEGORY
  getBillingCategory(apartmentId: any, size:number, page: number, sortBy: any, sortDir: any): any {
    const apiUrl = `${this.apiUrl}/${this.apiBilling}`;
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.appService.retrieveAccessToken() });
    const params = new HttpParams({ fromObject: { 'apartmentId': apartmentId, 'size': size, 'page': page, 'sortBy': sortBy, 'sortDir': sortDir } });
    const options = { headers, params };
    return this.httpClient.get<any>(apiUrl, options);
  }

  getBillingActiveCategory(apartmentId: any, isActive:any): any {
    const apiUrl = `${this.apiUrl}/${this.apiBilling}`;
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.appService.retrieveAccessToken() });
    let params;
    if(isActive=='' || isActive == null){
      params = new HttpParams({ fromObject: { 'apartmentId': apartmentId } });
    }
    else{
      params = new HttpParams({ fromObject: { 'apartmentId': apartmentId, 'isActive': isActive } });
    }
    const options = { headers, params };
    return this.httpClient.get<any>(apiUrl, options);
  }

  insertBillingCategory(body:any): any {
    const apiUrl = `${this.apiUrl}/${this.apiBilling}/${this.apiAdd}`;
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.appService.retrieveAccessToken() });
    const options = { headers }
    return this.httpClient.post<any>(apiUrl, body, options);
  }

  updateBillingCategory(billingId:any, isActive:any): any {
    const apiUrl = `${this.apiUrl}/${this.apiBilling}/${this.apiUpdate}`;
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.appService.retrieveAccessToken() });
    const params = new HttpParams({ fromObject: { 'billingId': billingId, 'isActive': isActive } });
    const options = { headers, params };
    const body = { };
    return this.httpClient.post<any>(apiUrl, body, options);
  }

  // REQUEST
  getBillingDetailApartment(apartmentId: any, size:number, page: number): any {
    const apiUrl = `${this.apiUrl}/${this.apiBilling}/${this.apiDetail}/${this.apiApartment}`;
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.appService.retrieveAccessToken() });
    const params = new HttpParams({ fromObject: { 'apartmentId': apartmentId, 'size': size, 'page': page} });
    const options = { headers, params }
    return this.httpClient.get<any>(apiUrl, options);
  }

  searchBillingDetailApartment(apartmentId: any, size:number, page: number, search:any): any {
    const apiUrl = `${this.apiUrl}/${this.apiBilling}/${this.apiDetail}/${this.apiApartment}`;
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.appService.retrieveAccessToken() });
    const params = new HttpParams({ fromObject: { 'apartmentId': apartmentId, 'size': size, 'page': page, 'search': search} });
    const options = { headers, params }
    return this.httpClient.get<any>(apiUrl, options);
  }
  
  getBillingDetailResident(residentId: any, size:number, page: number, status: any): any {
    const apiUrl = `${this.apiUrl}/${this.apiBilling}/${this.apiDetail}/${this.apiResident}`;
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.appService.retrieveAccessToken() });
    let params;
    if(status=='' || status == null){
      params = new HttpParams({ fromObject: { 'residentId': residentId, 'size': size, 'page': page } });
    }
    else{
      params = new HttpParams({ fromObject: { 'residentId': residentId, 'size': size, 'page': page, 'status': status } });
    }
    const options = { headers, params }
    return this.httpClient.get<any>(apiUrl, options);
  }
  
  searchBillingDetailResident(residentId: any, size:number, page: number, search:any): any {
    const apiUrl = `${this.apiUrl}/${this.apiBilling}/${this.apiDetail}/${this.apiResident}`;
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.appService.retrieveAccessToken() });
    const params = new HttpParams({ fromObject: { 'residentId': residentId, 'size': size, 'page': page, 'search': search} });
    const options = { headers, params }
    return this.httpClient.get<any>(apiUrl, options);
  }

  getBillingDetailByID(billingDetailId: any): any {
    const apiUrl = `${this.apiUrl}/${this.apiBilling}/${this.apiDetail}`;
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.appService.retrieveAccessToken() });
    const params = new HttpParams({ fromObject: { 'billingDetailId': billingDetailId } });
    const options = { headers, params }
    return this.httpClient.get<any>(apiUrl, options);
  }

  insertBillingDetail(body:any): any {
    const apiUrl = `${this.apiUrl}/${this.apiBilling}/${this.apiDetail}/${this.apiAdd}`;
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.appService.retrieveAccessToken() });
    const options = { headers }
    return this.httpClient.post<any>(apiUrl, body, options);
  }

  updateBillingDetail(billingDetailId: any, status: any): any {
    const apiUrl = `${this.apiUrl}/${this.apiBilling}/${this.apiDetail}/${this.apiUpdate}`;
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.appService.retrieveAccessToken() });
    const params = new HttpParams({ fromObject: { 'billingDetailId': billingDetailId, 'status': status } });
    const options = { headers, params }
    const body = { }
    return this.httpClient.post<any>(apiUrl, body, options);
  }
  
  insertPaymentProof(body:any): any {
    const apiUrl = `${this.apiUrl}/${this.apiBilling}/${this.apiPaymentProof}`;
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.appService.retrieveAccessToken() });
    const options = { headers }
    return this.httpClient.post<any>(apiUrl, body, options);
  }

  verifyPayment(billingDetailId: any, isValid: any): any {
    const apiUrl = `${this.apiUrl}/${this.apiBilling}/${this.apiPaymentProof}/${this.apiVerify}`;
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.appService.retrieveAccessToken() });
    const params = new HttpParams({ fromObject: { 'isValid': isValid, 'billingDetailId': billingDetailId } });
    const options = { headers, params }
    const body = { }
    return this.httpClient.post<any>(apiUrl, body, options);
  }
}
