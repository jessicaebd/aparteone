import { HttpRequest, HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable,  } from '@angular/core';
import { environment } from 'src/environments/development';
import { AppService } from 'src/app/app.service';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceService {
  private apiUrl = `${environment.baseApiUrl}`;
  private apiMaintenance = `${environment.modules.feature.maintenance}`;
  private apiAdd = `${environment.modules.general.add}`;
  private apiUpdate = `${environment.modules.general.update}`;
  private apiRequest = `${environment.modules.general.request}`;
  private apiDetail = `${environment.modules.general.detail}`;
  private apiApartment = `${environment.modules.feature.apartment}`;
  private apiResident = `${environment.modules.feature.resident}`;

  constructor(private httpClient: HttpClient, private appService: AppService) { }

  // CATEGORY
  getMaintenanceCategoryApartment(apartmentId: any, size:number, page: number): any {
    const apiUrl = `${this.apiUrl}/${this.apiMaintenance}`;
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.appService.retrieveAccessToken() });
    const params = new HttpParams({ fromObject: { 'apartmentId': apartmentId, 'size': size, 'page': page } });
    // const params = new HttpParams({ fromObject: { 'apartmentId': apartmentId, 'size': size, 'page': page, 'sortBy': sortBy, 'sortDir': sortDir } });
    const options = { headers, params };
    return this.httpClient.get<any>(apiUrl, options);
  }

  getMaintenanceCategoryResident(apartmentId: any, isActive:any): any {
    const apiUrl = `${this.apiUrl}/${this.apiMaintenance}`;
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.appService.retrieveAccessToken() });
    const params = new HttpParams({ fromObject: { 'apartmentId': apartmentId, 'isActive': isActive } });
    const options = { headers, params };
    return this.httpClient.get<any>(apiUrl, options);
  }

  insertMaintenanceCategory(body:any): any {
    const apiUrl = `${this.apiUrl}/${this.apiMaintenance}/${this.apiAdd}`;
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.appService.retrieveAccessToken() });
    const options = { headers }
    return this.httpClient.post<any>(apiUrl, body, options);
  }

  updateMaintenanceCategory(maintenanceId:any, isActive:any): any {
    const apiUrl = `${this.apiUrl}/${this.apiMaintenance}/${this.apiUpdate}`;
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.appService.retrieveAccessToken() });
    const params = new HttpParams({ fromObject: { 'maintenanceId': maintenanceId, 'isActive': isActive } });
    const options = { headers, params };
    const body = { };
    return this.httpClient.post<any>(apiUrl, body, options);
  }

  // REQUEST
  getMaintenanceAllRequest(apartmentId: any, size:number, page: number): any {
    const apiUrl = `${this.apiUrl}/${this.apiMaintenance}/${this.apiRequest}/${this.apiApartment}`;
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.appService.retrieveAccessToken() });
    const params = new HttpParams({ fromObject: { 'apartmentId': apartmentId, 'size': size, 'page': page } });
    const options = { headers, params }
    return this.httpClient.get<any>(apiUrl, options);
  }

  searchMaintenanceAllRequest(apartmentId: any, size:number, page: number, search:any): any {
    const apiUrl = `${this.apiUrl}/${this.apiMaintenance}/${this.apiRequest}/${this.apiApartment}`;
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.appService.retrieveAccessToken() });
    const params = new HttpParams({ fromObject: { 'apartmentId': apartmentId, 'size': size, 'page': page, 'search': search } });
    const options = { headers, params }
    return this.httpClient.get<any>(apiUrl, options);
  }

  getMaintenanceResidentRequest(residentId: any, size:number, page: number, status: any): any {
    const apiUrl = `${this.apiUrl}/${this.apiMaintenance}/${this.apiRequest}/${this.apiResident}`;
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.appService.retrieveAccessToken() });
    let params;
    if(status=='' || status==null){
      params = new HttpParams({ fromObject: { 'residentId': residentId, 'size': size, 'page': page} });
    }
    else{
      params = new HttpParams({ fromObject: { 'residentId': residentId, 'size': size, 'page': page, 'status': status } });
    }
    const options = { headers, params }
    return this.httpClient.get<any>(apiUrl, options);
  }

  searchMaintenanceResidentRequest(residentId: any, size:number, page: number, search: any): any {
    const apiUrl = `${this.apiUrl}/${this.apiMaintenance}/${this.apiRequest}/${this.apiResident}`;
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.appService.retrieveAccessToken() });
    const params = new HttpParams({ fromObject: { 'residentId': residentId, 'size': size, 'page': page, 'search': search } });
    const options = { headers, params }
    return this.httpClient.get<any>(apiUrl, options);
  }

  insertMaintenanceRequest(body:any): any {
    const apiUrl = `${this.apiUrl}/${this.apiMaintenance}/${this.apiRequest}/${this.apiAdd}`;
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.appService.retrieveAccessToken() });
    const options = { headers }
    return this.httpClient.post<any>(apiUrl, body, options);
  }

  updateMaintenanceRequest(maintenanceRequestId: any, status: any, remarks: any): any {
    const apiUrl = `${this.apiUrl}/${this.apiMaintenance}/${this.apiRequest}/${this.apiUpdate}`;
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.appService.retrieveAccessToken() });
    let params;
    if(remarks=='' || remarks == null || remarks == undefined){
      params = new HttpParams({ fromObject: { 'status': status, 'maintenanceRequestId': maintenanceRequestId } });
    }
    else{
      params = new HttpParams({ fromObject: { 'status': status, 'remarks': remarks, 'maintenanceRequestId': maintenanceRequestId } });
    }
    const options = { headers, params }
    const body = { }
    return this.httpClient.post<any>(apiUrl, body, options);
  }
}
