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
  private apiRequest = `${environment.modules.feature.request}`;
  private apiApartment = `${environment.modules.feature.apartment}`;
  private apiResident = `${environment.modules.feature.resident}`;

  constructor(private httpClient: HttpClient, private appService: AppService) { }

  // CATEGORY
  getMaintenanceAllCategory(apartmentId: any, size:number, page: number, sortBy: any, sortDir: any): any {
    const apiUrl = `${this.apiUrl}/${this.apiMaintenance}`;
    const headers = new HttpHeaders({
    });
    const params = new HttpParams({ fromObject: { 'apartmentId': apartmentId, 'size': size, 'page': page, 'sortBy': sortBy, 'sortDir': sortDir } });
    const options = { headers, params };
    return this.httpClient.get<any>(apiUrl, options);
  }

  insertMaintenanceCategory(body:any): any {
    const apiUrl = `${this.apiUrl}/${this.apiMaintenance}`;
    return this.httpClient.post<any>(apiUrl, body);
  }

  updateMaintenanceCategory(maintenanceId:any, isActive:any): any {
    // const apiUrl = `${this.apiUrl}/${this.apiMaintenance}/maintenanceId=${maintenanceId}&isActive=${isActive}`;
    const apiUrl = `${this.apiUrl}/${this.apiMaintenance}`;
    const headers = new HttpHeaders({
    });
    // const params = new HttpParams({ });
    const params = new HttpParams({ fromObject: { 'maintenanceId': maintenanceId, 'isActive': isActive } });
    // const body = { };
    const options = { headers, params };
    return this.httpClient.put<any>(apiUrl, options);
  }

  // REQUEST
  getMaintenanceAllRequest(apartmentId: any, size:number, page: number, sortBy: any, sortDir: any): any {
    const apiUrl = `${this.apiUrl}/${this.apiMaintenance}/${this.apiRequest}/${this.apiApartment}`;
    const params = new HttpParams({ fromObject: { 'apartmentId': apartmentId, 'size': size, 'page': page, 'sortBy': sortBy, 'sortDir': sortDir } });
    const options = { params }
    return this.httpClient.get<any>(apiUrl, options);
  }

  getMaintenanceResidentRequest(residentId: any, size:number, page: number, sortBy: any, sortDir: any): any {
    const apiUrl = `${this.apiUrl}/${this.apiMaintenance}/${this.apiRequest}/${this.apiResident}`;
    const params = new HttpParams({ fromObject: { 'residentId': residentId, 'size': size, 'page': page, 'sortBy': sortBy, 'sortDir': sortDir } });
    const options = { params }
    return this.httpClient.get<any>(apiUrl, options);
  }
}
