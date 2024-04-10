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

  constructor(private httpClient: HttpClient, private appService: AppService) { }

  getMaintenanceAllCategory(apartmentId: any, size:number, page: number): any {
    const apiUrl = `${this.apiUrl}/${this.apiMaintenance}`;
    const headers = new HttpHeaders({
      // 'Authorization': 'Bearer ' + this.appService.retrieveAccessToken().token,
      // 'Content-Type': 'application/json',
      // 'Database': 'K2SmartObject'
    });
    const params = new HttpParams({ fromObject: { 'apartmentId': apartmentId, 'size': size, 'page': page} });
    const options = { headers, params };
    return this.httpClient.get<any>(apiUrl, options);
  }

  getMaintenanceAllRequest(apartmentId: any, size:number, page: number): any {
    const apiUrl = `${this.apiUrl}/${this.apiMaintenance}`;
    return this.httpClient.get<any>(apiUrl);
  }
}
