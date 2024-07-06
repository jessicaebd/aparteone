import { HttpRequest, HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable,  } from '@angular/core';
import { environment } from 'src/environments/development';
import { AppService } from 'src/app/app.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = `${environment.baseApiUrl}`;
  private apiMerchant = `${environment.modules.feature.merchant}`;
  private apiSearch = `${environment.modules.general.search}`;
  private apiUpdate = `${environment.modules.general.update}`;
  private apiDetail = `${environment.modules.general.detail}`;
  private apiDelete = `${environment.modules.general.delete}`;
  private apiVerify = `${environment.modules.general.verify}`;
  private apiApprove = `${environment.modules.general.approve}`;
  private apiAdd = `${environment.modules.general.add}`;
  private apiApartment = `${environment.modules.feature.apartment}`;
  private apiResident = `${environment.modules.feature.resident}`;
  private apiUnit = `${environment.modules.feature.unit}`;

  constructor(private httpClient: HttpClient, private appService: AppService) { }

  // RESIDENT
  getResidentList(apartmentId: any, size:number, page: number, isApproved:any): any {
    const apiUrl = `${this.apiUrl}/${this.apiResident}`;
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.appService.retrieveAccessToken() });
    let params;
    if(apartmentId=='' || apartmentId == null){
      params = new HttpParams({ fromObject: { 'size': size, 'page': page, 'isApproved': isApproved  } });
    }
    else{
      params = new HttpParams({ fromObject: { 'apartmentId': apartmentId, 'size': size, 'page': page, 'isApproved': isApproved } });
    }
    const options = { headers, params };
    return this.httpClient.get<any>(apiUrl, options);
  }

  searchResident(apartmentId: any, size:number, page: number, search:any): any {
    const apiUrl = `${this.apiUrl}/${this.apiResident}/${this.apiSearch}`;
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.appService.retrieveAccessToken() });
    let params;
    if(search!='' && apartmentId == null){
      params = new HttpParams({ fromObject: { 'size': size, 'page': page, 'search': search } });
    }
    else if(search=='' && apartmentId == null){
      params = new HttpParams({ fromObject: { 'size': size, 'page': page} });
    }
    else if(search!=''){
      params = new HttpParams({ fromObject: { 'apartmentId': apartmentId, 'size': size, 'page': page, 'search': search } });
    }
    else{
      params = new HttpParams({ fromObject: { 'apartmentId': apartmentId, 'size': size, 'page': page } });
    }
    const options = { headers, params };
    return this.httpClient.get<any>(apiUrl, options);
  }

  approveResident(residentId: any, isApproved:any): any {
    const apiUrl = `${this.apiUrl}/${this.apiResident}/${this.apiApprove}`;
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.appService.retrieveAccessToken() });
    let params = new HttpParams({ fromObject: { 'residentId': residentId, 'isApproved': isApproved } });
    const options = { headers, params };
    const body = { };
    return this.httpClient.post<any>(apiUrl, body, options);
  }

  updateResidentStatus(residentId:any, isActive:any): any {
    const apiUrl = `${this.apiUrl}/${this.apiResident}/${this.apiUpdate}`;
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.appService.retrieveAccessToken() });
    const params = new HttpParams({ fromObject: { 'residentId': residentId, 'isActive': isActive } });
    const options = { headers, params };
    const body = { };
    return this.httpClient.post<any>(apiUrl, body, options);
  }

  //APARTMENT
  getApartmentList(size:number, page: number, isApproved:any): any {
    const apiUrl = `${this.apiUrl}/${this.apiApartment}`;
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.appService.retrieveAccessToken() });
    const params = new HttpParams({ fromObject: { 'size': size, 'page': page, 'isApproved': isApproved } });
    const options = { headers, params };
    return this.httpClient.get<any>(apiUrl, options);
  }

  getActiveApartmentList(): any {
    const apiUrl = `${this.apiUrl}/${this.apiApartment}`;
    // const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.appService.retrieveAccessToken() });
    const params = new HttpParams({ fromObject: { 'size': 100, 'page': 0, 'isApproved': 'Approved', 'isActive': true } });
    const options = { params };
    return this.httpClient.get<any>(apiUrl, options);
  }

  searchApartment(size:number, page: number, search:any): any {
    const apiUrl = `${this.apiUrl}/${this.apiApartment}/${this.apiSearch}`;
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.appService.retrieveAccessToken() });
    let params;
    if(search!=''){
      params = new HttpParams({ fromObject: { 'size': size, 'page': page, 'search': search } });
    }
    else{
      params = new HttpParams({ fromObject: { 'size': size, 'page': page } });
    }
    const options = { headers, params };
    return this.httpClient.get<any>(apiUrl, options);
  }

  getApartmentDetail(apartmentId: any): any {
    const apiUrl = `${this.apiUrl}/${this.apiApartment}/${this.apiDetail}`;
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.appService.retrieveAccessToken() });
    let params = new HttpParams({ fromObject: { 'apartmentId': apartmentId } });
    const options = { headers, params };
    return this.httpClient.get<any>(apiUrl, options);
  }

  approveApartment(apartmentId: any, isApproved:any): any {
    const apiUrl = `${this.apiUrl}/${this.apiApartment}/${this.apiApprove}`;
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.appService.retrieveAccessToken() });
    let params = new HttpParams({ fromObject: { 'apartmentId': apartmentId, 'isApproved': isApproved } });
    const options = { headers, params };
    const body = { };
    return this.httpClient.post<any>(apiUrl, body, options);
  }

  updateApartmentStatus(apartmentId:any, isActive:any): any {
    const apiUrl = `${this.apiUrl}/${this.apiApartment}/${this.apiUpdate}`;
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.appService.retrieveAccessToken() });
    const params = new HttpParams({ fromObject: { 'apartmentId': apartmentId, 'isActive': isActive } });
    const options = { headers, params };
    const body = { };
    return this.httpClient.post<any>(apiUrl, body, options);
  }

  //UNIT
  getApartmentUnitList(apartmentId:any, size:number, page: number): any {
    const apiUrl = `${this.apiUrl}/${this.apiApartment}/${this.apiUnit}`;
    const headers = new HttpHeaders({ });
    const params = new HttpParams({ fromObject: { 'apartmentId': apartmentId, 'size': size, 'page': page } });
    const options = { headers, params };
    return this.httpClient.get<any>(apiUrl, options);
  }

  searchApartmentUnit(apartmentId:any, size:number, page: number, search:any): any {
    const apiUrl = `${this.apiUrl}/${this.apiApartment}/${this.apiUnit}/${this.apiSearch}`;
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.appService.retrieveAccessToken() });
    let params;
    if(search!=''){
      params = new HttpParams({ fromObject: { 'apartmentId': apartmentId, 'size': size, 'page': page, 'search': search } });
    }
    else{
      params = new HttpParams({ fromObject: { 'apartmentId': apartmentId, 'size': size, 'page': page } });
    }
    const options = { headers, params };
    return this.httpClient.get<any>(apiUrl, options);
  }

  addApartmentUnit(body:any): any {
    const apiUrl = `${this.apiUrl}/${this.apiApartment}/${this.apiUnit}/${this.apiAdd}`;
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.appService.retrieveAccessToken() });
    const options = { headers };
    return this.httpClient.post<any>(apiUrl, body, options);
  }

  updateApartmentUnit(apartmentUnitId: any, body:any): any {
    const apiUrl = `${this.apiUrl}/${this.apiApartment}/${this.apiUnit}/${this.apiUpdate}`;
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.appService.retrieveAccessToken() });
    let params = new HttpParams({ fromObject: { 'apartmentUnitId': apartmentUnitId } });
    const options = { headers, params };
    return this.httpClient.post<any>(apiUrl, body, options);
  }

}
