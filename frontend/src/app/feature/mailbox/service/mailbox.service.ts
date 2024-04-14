import { HttpRequest, HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable,  } from '@angular/core';
import { environment } from 'src/environments/development';
import { AppService } from 'src/app/app.service';

@Injectable({
  providedIn: 'root'
})
export class MailboxService {
  private apiUrl = `${environment.baseApiUrl}`;
  private apiMailbox = `${environment.modules.feature.mailbox}`;
  private apiUpdate = `${environment.modules.general.update}`;
  private apiDetail = `${environment.modules.general.detail}`;
  private apiApartment = `${environment.modules.feature.apartment}`;
  private apiResident = `${environment.modules.feature.resident}`;

  constructor(private httpClient: HttpClient, private appService: AppService) { }

  // CATEGORY
  getMailboxCategory(apartmentId: any, page: any, size: any, isActive:any): any {
    const apiUrl = `${this.apiUrl}/${this.apiMailbox}`;
    const headers = new HttpHeaders({
    });
    const params = new HttpParams({ fromObject: { 'apartmentId': apartmentId, 'page': page, 'size': size, 'isActive': isActive } });
    const options = { headers, params };
    return this.httpClient.get<any>(apiUrl, options);
  }

  insertMailboxCategory(body:any): any {
    const apiUrl = `${this.apiUrl}/${this.apiMailbox}`;
    return this.httpClient.post<any>(apiUrl, body);
  }

  updateMailboxCategory(billingId:any, isActive:any): any {
    const apiUrl = `${this.apiUrl}/${this.apiMailbox}/${this.apiUpdate}-status`;
    const params = new HttpParams({ fromObject: { 'mailboxId': billingId, 'isActive': isActive } });
    const options = { params };
    const body = { };
    return this.httpClient.post<any>(apiUrl, body, options);
  }
}
