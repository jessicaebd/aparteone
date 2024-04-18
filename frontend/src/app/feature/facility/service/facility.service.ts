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
  private apiRequest = `${environment.modules.general.request}`;
  private apiAdd = `${environment.modules.general.add}`;
  private apiUpdate = `${environment.modules.general.update}`;
  private apiApartment = `${environment.modules.feature.apartment}`;
  private apiResident = `${environment.modules.feature.resident}`;

  constructor(private httpClient: HttpClient, private appService: AppService) { }

  // CATEGORY
  getFacilityCategory(apartmentId: any, size:number, page: number, sortBy: any, sortDir: any): any {
    const apiUrl = `${this.apiUrl}/${this.apiFacility}`;
    const headers = new HttpHeaders({
    });
    const params = new HttpParams({ fromObject: { 'apartmentId': apartmentId, 'size': size, 'page': page, 'sortBy': sortBy, 'sortDir': sortDir } });
    const options = { headers, params };
    return this.httpClient.get<any>(apiUrl, options);
  }

  getFacilityActiveCategory(apartmentId: any, isActive: any): any {
    const apiUrl = `${this.apiUrl}/${this.apiFacility}`;
    const headers = new HttpHeaders({
    });
    const params = new HttpParams({ fromObject: { 'apartmentId': apartmentId, 'isActive': isActive } });
    const options = { headers, params };
    return this.httpClient.get<any>(apiUrl, options);
  }

  insertFacilityCategory(body:any): any {
    const apiUrl = `${this.apiUrl}/${this.apiFacility}/${this.apiAdd}`;
    return this.httpClient.post<any>(apiUrl, body);
  }

  updateFacilityCategory(facilityId:any, isActive:any): any {
    const apiUrl = `${this.apiUrl}/${this.apiFacility}/${this.apiUpdate}`;
    const headers = new HttpHeaders({
    });
    // const params = new HttpParams({ });
    const params = new HttpParams({ fromObject: { 'facilityId': facilityId, 'isActive': isActive } });
    // const body = { };
    const options = { headers, params };
    return this.httpClient.put<any>(apiUrl, options);
  }

  // REQUEST
  getFacilityAllRequest(apartmentId: any, size:number, page: number, sortBy: any, sortDir: any): any {
    const apiUrl = `${this.apiUrl}/${this.apiFacility}/${this.apiRequest}/${this.apiApartment}`;
    const params = new HttpParams({ fromObject: { 'apartmentId': apartmentId, 'size': size, 'page': page, 'sortBy': sortBy, 'sortDir': sortDir } });
    const options = { params }
    return this.httpClient.get<any>(apiUrl, options);
  }

  getFacilityResidentRequest(residentId: any, size:number, page: number, sortBy: any, sortDir: any): any {
    const apiUrl = `${this.apiUrl}/${this.apiFacility}/${this.apiRequest}/${this.apiResident}`;
    const params = new HttpParams({ fromObject: { 'residentId': residentId, 'size': size, 'page': page, 'sortBy': sortBy, 'sortDir': sortDir } });
    const options = { params }
    return this.httpClient.get<any>(apiUrl, options);
  }
}
