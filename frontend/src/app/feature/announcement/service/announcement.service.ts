import { HttpRequest, HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable,  } from '@angular/core';
import { environment } from 'src/environments/development';
import { AppService } from 'src/app/app.service';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {
  private apiUrl = `${environment.baseApiUrl}`;
  private apiAnnouncement = `${environment.modules.feature.announcement}`;
  private apiUpdate = `${environment.modules.general.update}`;
  private apiDetail = `${environment.modules.general.detail}`;
  private apiAdd = `${environment.modules.general.add}`;

  constructor(private httpClient: HttpClient, private appService: AppService) { }

  // GET LIST
  getListAnnouncement(apartmentId: any, size:number, page: number, sortBy: any, sortDir: any): any {
    const apiUrl = `${this.apiUrl}/${this.apiAnnouncement}`;
    const headers = new HttpHeaders({
    });
    const params = new HttpParams({ fromObject: { 'apartmentId': apartmentId, 'size': size, 'page': page, 'sortBy': sortBy, 'sortDir': sortDir } });
    const options = { headers, params };
    return this.httpClient.get<any>(apiUrl, options);
  }

  // GET LIST
  getListAnnouncementResident(apartmentId: any, criteria: any): any {
    const apiUrl = `${this.apiUrl}/${this.apiAnnouncement}`;
    const headers = new HttpHeaders({
    });
    const params = new HttpParams({ fromObject: { 'apartmentId': apartmentId, 'criteria': criteria } });
    const options = { headers, params };
    return this.httpClient.get<any>(apiUrl, options);
  }
  
  // GET DETAIL
  getDetailAnnouncement(announcementId: any): any {
    const apiUrl = `${this.apiUrl}/${this.apiAnnouncement}/${this.apiDetail}`;
    const headers = new HttpHeaders({
    });
    const params = new HttpParams({ fromObject: { 'announcementId': announcementId } });
    const options = { headers, params };
    return this.httpClient.get<any>(apiUrl, options);
  }

  // ADD
  insertAnnouncement(body: any): any {
    const apiUrl = `${this.apiUrl}/${this.apiAnnouncement}/${this.apiAdd}`;
    return this.httpClient.post<any>(apiUrl, body);
  }

  // UPDATE
  updateAnnouncement(announcementId:any, body: any): any {
    const apiUrl = `${this.apiUrl}/${this.apiAnnouncement}/${this.apiUpdate}`;
    const params = new HttpParams({ fromObject: { 'announcementId': announcementId } });
    const options = { params };
    return this.httpClient.post<any>(apiUrl, body, options);
  }
}
