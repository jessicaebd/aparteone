import { HttpRequest, HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/development';
import { AppService } from 'src/app/app.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = `${environment.baseApiUrl}`;
  private apiPayment = `${environment.modules.feature.payment}`;
  private apiPaymentProof = `${environment.modules.feature.paymentProof}`;
  private apiAdd = `${environment.modules.general.add}`;
  private apiUpdate = `${environment.modules.general.update}`;
  private apiDetail = `${environment.modules.general.detail}`;
  private apiApartment = `${environment.modules.feature.apartment}`;
  private apiResident = `${environment.modules.feature.resident}`;

  constructor(private httpClient: HttpClient, private appService: AppService) { }

  // CATEGORY
  getPaymentCategory(apartmentId: any, size:number, page: number, sortBy: any, sortDir: any): any {
    const apiUrl = `${this.apiUrl}/${this.apiPayment}`;
    const headers = new HttpHeaders({
    });
    const params = new HttpParams({ fromObject: { 'apartmentId': apartmentId, 'size': size, 'page': page, 'sortBy': sortBy, 'sortDir': sortDir } });
    const options = { headers, params };
    return this.httpClient.get<any>(apiUrl, options);
  }

  getPaymentActiveCategory(apartmentId: any, isActive:any): any {
    const apiUrl = `${this.apiUrl}/${this.apiPayment}`;
    const headers = new HttpHeaders({
    });
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

  insertPaymentCategory(body:any): any {
    const apiUrl = `${this.apiUrl}/${this.apiPayment}/${this.apiAdd}`;
    return this.httpClient.post<any>(apiUrl, body);
  }

  updatePaymentCategory(billingId:any, isActive:any): any {
    const apiUrl = `${this.apiUrl}/${this.apiPayment}/${this.apiUpdate}`;
    const params = new HttpParams({ fromObject: { 'billingId': billingId, 'isActive': isActive } });
    const options = { params };
    const body = { };
    return this.httpClient.post<any>(apiUrl, body, options);
  }

  // REQUEST
  getPaymentDetailApartment(apartmentId: any, size:number, page: number, sortBy: any, sortDir: any, status: any): any {
    const apiUrl = `${this.apiUrl}/${this.apiPayment}/${this.apiDetail}/${this.apiApartment}`;
    const params = new HttpParams({ fromObject: { 'apartmentId': apartmentId, 'size': size, 'page': page, 'sortBy': sortBy, 'sortDir': sortDir, 'status': status } });
    const options = { params }
    return this.httpClient.get<any>(apiUrl, options);
  }

  getPaymentDetailResident(residentId: any, size:number, page: number, sortBy: any, sortDir: any, status: any): any {
    const apiUrl = `${this.apiUrl}/${this.apiPayment}/${this.apiDetail}/${this.apiResident}`;
    const params = new HttpParams({ fromObject: { 'residentId': residentId, 'size': size, 'page': page, 'sortBy': sortBy, 'sortDir': sortDir, 'status': status } });
    const options = { params }
    return this.httpClient.get<any>(apiUrl, options);
  }

  getPaymentDetailByID(billingDetailId: any): any {
    const apiUrl = `${this.apiUrl}/${this.apiPayment}/${this.apiDetail}`;
    const params = new HttpParams({ fromObject: { 'billingDetailId': billingDetailId } });
    const options = { params }
    return this.httpClient.get<any>(apiUrl, options);
  }

  insertPayment(body:any): any {
    const apiUrl = `${this.apiUrl}/${this.apiPayment}/${this.apiDetail}`;
    return this.httpClient.post<any>(apiUrl, body);
  }

  updatePayment(status: any, remarks: any, billingDetailId: any): any {
    const apiUrl = `${this.apiUrl}/${this.apiPayment}/${this.apiDetail}/${this.apiUpdate}-status`;
    const params = new HttpParams({ fromObject: { 'status': status, 'remarks': remarks, 'billingDetailId': billingDetailId } });
    const options = { params }
    const body = { }
    return this.httpClient.post<any>(apiUrl, body, options);
  }
  
  insertPaymentProof(body:any): any {
    const apiUrl = `${this.apiUrl}/${this.apiPayment}/${this.apiDetail}/${this.apiPaymentProof}`;
    return this.httpClient.post<any>(apiUrl, body);
  }

  verifyPayment(isValid: any, billingDetailId: any): any {
    const apiUrl = `${this.apiUrl}/${this.apiPayment}/${this.apiDetail}/${this.apiUpdate}-status`;
    const params = new HttpParams({ fromObject: { 'isValid': isValid, 'billingDetailId': billingDetailId } });
    const options = { params }
    const body = { }
    return this.httpClient.post<any>(apiUrl, body, options);
  }
}
