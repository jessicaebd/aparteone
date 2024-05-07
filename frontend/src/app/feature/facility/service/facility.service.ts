import { HttpRequest, HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable,  } from '@angular/core';
import { environment } from 'src/environments/development';
import { AppService } from 'src/app/app.service';

@Injectable({
  providedIn: 'root'
})
export class FacilityService {
  private apiUrl = `${environment.baseApiUrl}`;
  private apiFacility = `${environment.modules.feature.facility}`;
  private apiTime = `${environment.modules.feature.time}`;
  private apiRequest = `${environment.modules.general.request}`;
  private apiAdd = `${environment.modules.general.add}`;
  private apiUpdate = `${environment.modules.general.update}`;
  private apiApartment = `${environment.modules.feature.apartment}`;
  private apiResident = `${environment.modules.feature.resident}`;

  constructor(private httpClient: HttpClient, private appService: AppService) { }

  // CATEGORY
  getFacilityCategory(apartmentId: any, size:number, page: number): any {
    const apiUrl = `${this.apiUrl}/${this.apiFacility}`;
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.appService.retrieveAccessToken() });
    const params = new HttpParams({ fromObject: { 'apartmentId': apartmentId, 'size': size, 'page': page } });
    const options = { headers, params };
    return this.httpClient.get<any>(apiUrl, options);
  }

  getFacilityActiveCategory(apartmentId: any, isActive: any): any {
    const apiUrl = `${this.apiUrl}/${this.apiFacility}`;
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.appService.retrieveAccessToken() });
    const params = new HttpParams({ fromObject: { 'apartmentId': apartmentId, 'isActive': isActive } });
    const options = { headers, params };
    return this.httpClient.get<any>(apiUrl, options);
  }

  insertFacilityCategory(body:any): any {
    const apiUrl = `${this.apiUrl}/${this.apiFacility}/${this.apiAdd}`;
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.appService.retrieveAccessToken() });
    const options = { headers };
    return this.httpClient.post<any>(apiUrl, body, options);
  }

  updateFacilityCategory(facilityId:any, isActive:any): any {
    const apiUrl = `${this.apiUrl}/${this.apiFacility}/${this.apiUpdate}`;
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.appService.retrieveAccessToken() });
    const params = new HttpParams({ fromObject: { 'facilityId': facilityId, 'isActive': isActive } });
    const options = { headers, params };
    const body = {};
    return this.httpClient.post<any>(apiUrl, body, options);
  }
  
  // TIME
  getFacilityTime(facilityId: any, date: any): any {
    const apiUrl = `${this.apiUrl}/${this.apiFacility}/${this.apiTime}`;
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.appService.retrieveAccessToken() });
    const params = new HttpParams({ fromObject: { 'facilityId': facilityId, 'date': date } });
    const options = { headers, params };
    return this.httpClient.get<any>(apiUrl, options);
  }
  
  insertFacilityTime(facilityId: any, body:any): any {
    const apiUrl = `${this.apiUrl}/${this.apiFacility}/${this.apiTime}/${this.apiAdd}`;
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.appService.retrieveAccessToken() });
    const params = new HttpParams({ fromObject: { 'facilityId': facilityId } });
    const options = { headers, params };
    return this.httpClient.post<any>(apiUrl, body, options);
  }

  updateFacilityTime(facilityTimeId:any, isActive:any): any {
    const apiUrl = `${this.apiUrl}/${this.apiFacility}/${this.apiTime}/${this.apiUpdate}`;
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.appService.retrieveAccessToken() });
    const params = new HttpParams({ fromObject: { 'facilityTimeId': facilityTimeId, 'isActive': isActive } });
    const options = { headers, params };
    const body = {};
    return this.httpClient.post<any>(apiUrl, body, options);
  }

  // REQUEST
  getFacilityApartmentRequest(apartmentId: any, size:number, page: number): any {
    const apiUrl = `${this.apiUrl}/${this.apiFacility}/${this.apiRequest}/${this.apiApartment}`;
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.appService.retrieveAccessToken() });
    const params = new HttpParams({ fromObject: { 'apartmentId': apartmentId, 'size': size, 'page': page} });
    const options = { headers, params }
    return this.httpClient.get<any>(apiUrl, options);
  }

  searchFacilityApartmentRequest(apartmentId: any, size:number, page: number, search:any): any {
    const apiUrl = `${this.apiUrl}/${this.apiFacility}/${this.apiRequest}/${this.apiApartment}`;
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.appService.retrieveAccessToken() });
    const params = new HttpParams({ fromObject: { 'apartmentId': apartmentId, 'size': size, 'page': page, 'search': search} });
    const options = { headers, params }
    return this.httpClient.get<any>(apiUrl, options);
  }
  
  getFacilityResidentRequest(residentId: any, size:number, page: number, status: any): any {
    const apiUrl = `${this.apiUrl}/${this.apiFacility}/${this.apiRequest}/${this.apiResident}`;
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.appService.retrieveAccessToken() });
    let params;
    if(status == '' || status == null){
      params = new HttpParams({ fromObject: { 'residentId': residentId, 'size': size, 'page': page } });
    }
    else{
      params = new HttpParams({ fromObject: { 'residentId': residentId, 'size': size, 'page': page, 'status': status } });
    }
    const options = { headers, params }
    return this.httpClient.get<any>(apiUrl, options);
  }

  searchFacilityResidentRequest(residentId: any, size:number, page: number, search:any): any {
    const apiUrl = `${this.apiUrl}/${this.apiFacility}/${this.apiRequest}/${this.apiResident}`;
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.appService.retrieveAccessToken() });
    const params = new HttpParams({ fromObject: { 'residentId': residentId, 'size': size, 'page': page, 'search': search} });
    const options = { headers, params }
    return this.httpClient.get<any>(apiUrl, options);
  }

  insertFacilityRequest(body:any): any {
    const apiUrl = `${this.apiUrl}/${this.apiFacility}/${this.apiRequest}/${this.apiAdd}`;
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.appService.retrieveAccessToken() });
    const options = { headers }
    return this.httpClient.post<any>(apiUrl, body, options);
  }

  updateFacilityRequest(facilityRequestId:any, status:any): any {
    const apiUrl = `${this.apiUrl}/${this.apiFacility}/${this.apiRequest}/${this.apiUpdate}`;
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.appService.retrieveAccessToken() });
    const params = new HttpParams({ fromObject: { 'facilityRequestId': facilityRequestId, 'status': status } });
    const options = { headers, params };
    const body = {};
    return this.httpClient.post<any>(apiUrl, body, options);
  }
}
