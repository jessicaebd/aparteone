import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { BubbleChat } from '../chat/chat.interface';
import { ChatService } from '../chat/service/chat.service';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent {
  bubbleReport: BubbleChat[] = [];
  errorMsgRoom: string = '';
  message: string = '';
  roomName: string = '';
  roomImage!: any;
  stompClient: any;

  user = this.appService.retrieveUser();

  constructor(private location: Location, private route: ActivatedRoute,private chatService: ChatService, private apps: AppComponent, private appService: AppService){}

  async ngOnInit(){
    this.apps.loadingPage(true);
    this.connectWebSocket();
    if(this.user.role=='Resident' || this.user.role=='Merchant'){
      await this.getUserDetail(this.user.apartmentId);
      await this.getChatMessages(this.user.id, this.user.apartmentId);
    }
    this.apps.loadingPage(false);
  }

  getUserDetail(userId: any): Promise<any>{
    return new Promise<any>(resolve => 
      this.appService.getUserDetail(userId).subscribe({
        next: async (response: any) => {
          console.log('Response: ', response);
          this.roomName = response.profile.name;
          this.roomImage = response.profile.image;
          resolve(response);
        },
        error: (error: any) => {
          console.log('#error', error);
          resolve(error);
        }
      }))
  }

  getChatMessages(senderId: any, receiverId:any): Promise<any>{
    return new Promise<any>(resolve => 
      this.chatService.getChatMessages(senderId, receiverId).subscribe({
        next: async (response: any) => {
          console.log('Response: ', response);
          if(response.length > 0){
            this.bubbleReport = response;
          }
          else{
            this.bubbleReport = [];
          }
          resolve(true);
        },
        error: (error: any) => {
          console.log('#error', error);
          this.bubbleReport = [];
          resolve(error);
        }
      }))
  }

  sendMessage(body: any): Promise<any>{
    return new Promise<any>(resolve => 
      this.chatService.sendMessage(body).subscribe({
        next: async (response: any) => {
          console.log('Response: ', response);
          resolve(true);
        },
        error: (error: any) => {
          console.log('#error', error);
          resolve(error);
        }
      }))
  }

  setBodySendMessage(): Promise<any>{
    return new Promise<any>(resolve =>{
      let body = {
        'senderId': this.user.id,
        // 'receiverId': this.user.apartmentId,
        'receiverId': 12,
        'message': this.message
      }
      resolve(body);
    });
  }

  connectWebSocket(){
    const url = 'http://localhost:8081/chat-websocket';
    const socket = new SockJS(url);
    this.stompClient = Stomp.over(socket);
    this.stompClient.connect({}, (frame:any) => {
      console.log('Connected: ' + frame);
      this.stompClient.subscribe('/chat/messages', (message: {body: string }) => {
        if (message.body) {
          let obj   = JSON.parse(message.body);
          console.log(obj);
          // this.getChatRooms(this.user.id);
          this.getChatMessages(this.user.id, this.user.apartmentId);
        }
      })
    });
  }

  async onSendChat(){
    if(this.message!=''){
      // let body = await this.setBodySendMessage();
      // console.log("done set body");
      // await this.sendMessage(body);
      let payload: any = {
        senderId: this.user.id,
        receiverId: this.user.apartmentId,
        message: this.message
      };
      console.log(JSON.stringify(payload))
      this.stompClient.send('/api/sendmsg', {}, JSON.stringify(payload));
      this.message = '';
      
      let obj = {
        'userId': this.user.apartmentId,
        'userName': this.roomName,
        'userImage': this.roomImage,
      }
      console.log("done set obj");
      await this.goToDetailChatPage(obj);
    }
  }

  async goToDetailChatPage(e:any){
    this.roomName = e.userName;
    this.roomImage = e.userImage;
    await this.getChatMessages(this.user.id, e.userId);
  }

  backButton(){
    this.location.back();
  }
}
