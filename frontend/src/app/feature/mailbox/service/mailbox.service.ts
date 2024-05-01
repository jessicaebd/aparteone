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
  private apiAdd = `${environment.modules.general.add}`;
  private apiUpdate = `${environment.modules.general.update}`;
  private apiDetail = `${environment.modules.general.detail}`;
  private apiApartment = `${environment.modules.feature.apartment}`;
  private apiResident = `${environment.modules.feature.resident}`;

  constructor(private httpClient: HttpClient, private appService: AppService) { }

  // CATEGORY
  getMailboxCategory(apartmentId: any, size:number, page: number): any {
    const apiUrl = `${this.apiUrl}/${this.apiMailbox}`;
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.appService.retrieveAccessToken() });
    const params = new HttpParams({ fromObject: { 'apartmentId': apartmentId, 'size': size, 'page': page } });
    const options = { headers, params };
    return this.httpClient.get<any>(apiUrl, options);
  }

  getMailboxActiveCategory(apartmentId: any, isActive:any): any {
    const apiUrl = `${this.apiUrl}/${this.apiMailbox}`;
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.appService.retrieveAccessToken() });
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

  insertMailboxCategory(body:any): any {
    const apiUrl = `${this.apiUrl}/${this.apiMailbox}/${this.apiAdd}`;
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.appService.retrieveAccessToken() });
    const options = { headers }
    return this.httpClient.post<any>(apiUrl, body, options);
  }
  
  updateMailboxCategory(mailboxId:any, isActive:any): any {
    const apiUrl = `${this.apiUrl}/${this.apiMailbox}/${this.apiUpdate}`;
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.appService.retrieveAccessToken() });
    const params = new HttpParams({ fromObject: { 'mailboxId': mailboxId, 'isActive': isActive } });
    const options = { headers, params };
    const body = { };
    return this.httpClient.post<any>(apiUrl, body, options);
  }

  // DETAIL
  getMailboxDetailApartment(apartmentId: any, size:number, page: number): any {
    const apiUrl = `${this.apiUrl}/${this.apiMailbox}/${this.apiDetail}/${this.apiApartment}`;
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.appService.retrieveAccessToken() });
    const params = new HttpParams({ fromObject: { 'apartmentId': apartmentId, 'size': size, 'page': page } });
    const options = { headers, params };
    return this.httpClient.get<any>(apiUrl, options);
  }

  searchMailboxDetailApartment(apartmentId: any, size:number, page: number, search:any): any {
    const apiUrl = `${this.apiUrl}/${this.apiMailbox}/${this.apiDetail}/${this.apiApartment}`;
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.appService.retrieveAccessToken() });
    const params = new HttpParams({ fromObject: { 'apartmentId': apartmentId, 'size': size, 'page': page, 'search': search } });
    const options = { headers, params };
    return this.httpClient.get<any>(apiUrl, options);
  }
  
  getMailboxDetailResident(residentId: any, size:number, page: number, status: any): any {
    const apiUrl = `${this.apiUrl}/${this.apiMailbox}/${this.apiDetail}/${this.apiResident}`;
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.appService.retrieveAccessToken() });
    let params;
    if(status=='' || status == null){
      params = new HttpParams({ fromObject: { 'residentId': residentId, 'size': size, 'page': page } });
    }
    else{
      params = new HttpParams({ fromObject: { 'residentId': residentId, 'size': size, 'page': page, 'status': status } });
    }
    const options = { headers, params };
    return this.httpClient.get<any>(apiUrl, options);
  }
  
  searchMailboxDetailResident(residentId: any, size:number, page: number, search:any): any {
    const apiUrl = `${this.apiUrl}/${this.apiMailbox}/${this.apiDetail}/${this.apiResident}`;
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.appService.retrieveAccessToken() });
    const params = new HttpParams({ fromObject: { 'residentId': residentId, 'size': size, 'page': page, 'search': search } });
    const options = { headers, params };
    return this.httpClient.get<any>(apiUrl, options);
  }

  insertMailboxDetail(body:any): any {
    const apiUrl = `${this.apiUrl}/${this.apiMailbox}/${this.apiDetail}/${this.apiAdd}`;
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.appService.retrieveAccessToken() });
    const options = { headers };
    return this.httpClient.post<any>(apiUrl, body, options);
  }

  updateMailboxDetail(mailboxRequestId:any, status:any): any {
    const apiUrl = `${this.apiUrl}/${this.apiMailbox}/${this.apiDetail}/${this.apiUpdate}`;
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.appService.retrieveAccessToken() });
    const params = new HttpParams({ fromObject: { 'mailboxRequestId': mailboxRequestId, 'status': status } });
    const options = { headers, params };
    const body = { };
    return this.httpClient.post<any>(apiUrl, body, options);
  }
}
