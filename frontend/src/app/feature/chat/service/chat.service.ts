import { HttpRequest, HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/development';
import { AppService } from 'src/app/app.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = `${environment.baseApiUrl}`;
  private apiChat = `${environment.modules.feature.chat}`;
  private apiSend = `${environment.modules.feature.send}`;
  private apiRooms = `${environment.modules.feature.rooms}`;
  private apiMessages = `${environment.modules.feature.messages}`;

  constructor(private httpClient: HttpClient, private appService: AppService) { }

  sendMessage(body:any): any {
    const apiUrl = `http://localhost:8081/api/sendmsg`;
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.appService.retrieveAccessToken() });
    const options = { headers };
    return this.httpClient.post<any>(apiUrl, body, options);
  }

  getChatRooms(userId:any): any {
    const apiUrl = `${this.apiUrl}/${this.apiChat}/${this.apiRooms}`;
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.appService.retrieveAccessToken() });
    const params = new HttpParams({ fromObject: { 'userId': userId } });
    const options = { headers, params };
    return this.httpClient.get<any>(apiUrl, options);
  }

  getChatMessages(senderId:any, receiverId:any): any {
    const apiUrl = `${this.apiUrl}/${this.apiChat}/${this.apiMessages}`;
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.appService.retrieveAccessToken() });
    const params = new HttpParams({ fromObject: { 'senderId': senderId, 'receiverId': receiverId } });
    const options = { headers, params };
    return this.httpClient.get<any>(apiUrl, options);
  }
}
