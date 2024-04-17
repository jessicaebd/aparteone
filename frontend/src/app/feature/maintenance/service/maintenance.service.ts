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
  private apiAddCategory = `${environment.modules.general.addCategory}`;
  private apiUpdateStatus = `${environment.modules.general.updateStatus}`;
  private apiUpdate = `${environment.modules.general.update}`;
  private apiRequest = `${environment.modules.general.request}`;
  private apiApartment = `${environment.modules.feature.apartment}`;
  private apiResident = `${environment.modules.feature.resident}`;

  constructor(private httpClient: HttpClient, private appService: AppService) { }

  // CATEGORY
  getMaintenanceCategoryApartment(apartmentId: any, size:number, page: number, sortBy: any, sortDir: any): any {
    const apiUrl = `${this.apiUrl}/${this.apiMaintenance}`;
    const headers = new HttpHeaders({
    });
    const params = new HttpParams({ fromObject: { 'apartmentId': apartmentId, 'size': size, 'page': page, 'sortBy': sortBy, 'sortDir': sortDir } });
    const options = { headers, params };
    return this.httpClient.get<any>(apiUrl, options);
  }

  getMaintenanceCategoryResident(apartmentId: any, isActive:any): any {
    const apiUrl = `${this.apiUrl}/${this.apiMaintenance}`;
    const headers = new HttpHeaders({
    });
    const params = new HttpParams({ fromObject: { 'apartmentId': apartmentId, 'isActive': isActive } });
    const options = { headers, params };
    return this.httpClient.get<any>(apiUrl, options);
  }

  insertMaintenanceCategory(body:any): any {
    const apiUrl = `${this.apiUrl}/${this.apiMaintenance}/${this.apiAddCategory}`;
    return this.httpClient.post<any>(apiUrl, body);
  }

  updateMaintenanceCategory(maintenanceId:any, isActive:any): any {
    const apiUrl = `${this.apiUrl}/${this.apiMaintenance}/${this.apiUpdateStatus}`;
    const params = new HttpParams({ fromObject: { 'maintenanceId': maintenanceId, 'isActive': isActive } });
    const options = { params };
    const body = { };
    return this.httpClient.post<any>(apiUrl, body, options);
  }

  // REQUEST
  getMaintenanceAllRequest(apartmentId: any, size:number, page: number, sortBy: any, sortDir: any): any {
    const apiUrl = `${this.apiUrl}/${this.apiMaintenance}/${this.apiRequest}/${this.apiApartment}`;
    const params = new HttpParams({ fromObject: { 'apartmentId': apartmentId, 'size': size, 'page': page, 'sortBy': sortBy, 'sortDir': sortDir } });
    const options = { params }
    return this.httpClient.get<any>(apiUrl, options);
  }

  getMaintenanceResidentRequest(residentId: any, size:number, page: number, sortBy: any, sortDir: any, status: any): any {
    const apiUrl = `${this.apiUrl}/${this.apiMaintenance}/${this.apiRequest}/${this.apiResident}`;
    let params;
    if(status=='' || status==null){
      params = new HttpParams({ fromObject: { 'residentId': residentId, 'size': size, 'page': page, 'sortBy': sortBy, 'sortDir': sortDir } });
    }
    else{
      params = new HttpParams({ fromObject: { 'residentId': residentId, 'size': size, 'page': page, 'sortBy': sortBy, 'sortDir': sortDir, 'status': status } });
    }
    const options = { params }
    return this.httpClient.get<any>(apiUrl, options);
  }

  insertMaintenanceRequest(body:any): any {
    const apiUrl = `${this.apiUrl}/${this.apiMaintenance}/${this.apiRequest}`;
    return this.httpClient.post<any>(apiUrl, body);
  }

  updateMaintenanceRequest(status: any, remarks: any, maintenanceRequestId: any): any {
    const apiUrl = `${this.apiUrl}/${this.apiMaintenance}/${this.apiRequest}/${this.apiUpdate}`;
    const params = new HttpParams({ fromObject: { 'status': status, 'remarks': remarks, 'maintenanceRequestId': maintenanceRequestId } });
    const options = { params }
    const body = { }
    return this.httpClient.post<any>(apiUrl, body, options);
  }
}
