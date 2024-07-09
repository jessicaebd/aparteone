import { Component, Input } from '@angular/core';
import { BubbleChat, ChatList } from './chat.interface';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from './service/chat.service';
import { AppComponent } from 'src/app/app.component';
import { AppService } from 'src/app/app.service';
import { Location } from '@angular/common';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  listChat: ChatList[] = [];
  bubbleChat: BubbleChat[] = [];
  errorMsgRoom: string = '';
  message: string = '';
  roomName: string = '';
  roomImage!: any;
  activeChat!: any;
  receiverId!: number;
  chatMessage: number = 0;
  stompClient: any;

  user = this.appService.retrieveUser();

  constructor(private location: Location, private route: ActivatedRoute, private chatService: ChatService, private apps: AppComponent, private appService: AppService){}

  async ngOnInit(){
    this.apps.loadingPage(true);
    this.connectWebSocket();
    if(this.user.role!='Admin'){
      await this.getChatRooms(this.user.id);
      this.receiverId = this.route.snapshot.params['id'];
      if(this.receiverId){
        console.log('ReceiverID: ', this.receiverId);
        let user = await this.getUserDetail(this.receiverId);
        this.setDetailChatPage(user.profile);
      }
    }
    else{
      window.location.replace('');
    }
    this.apps.loadingPage(false);
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
          this.getChatRooms(this.user.id);
          this.getChatMessages(this.user.id, this.receiverId);
        }
      })
    });
  }

  getUserDetail(userId: any): Promise<any>{
    return new Promise<any>(resolve => 
      this.appService.getUserDetail(userId).subscribe({
        next: async (response: any) => {
          console.log('Response: ', response);
          resolve(response);
        },
        error: (error: any) => {
          console.log('#error', error);
          resolve(error);
        }
      }))
  }

  getChatRooms(userId: any): Promise<any>{
    return new Promise<any>(resolve => 
      this.chatService.getChatRooms(userId).subscribe({
        next: async (response: any) => {
          console.log('Response: ', response);
          if(response.length > 0){
            this.listChat = response;
          }
          else{
            this.errorMsgRoom = 'No Chat Found!'
            this.listChat = [];
          }
          resolve(true);
        },
        error: (error: any) => {
          console.log('#error', error);
          this.errorMsgRoom = 'No Chat Found!'
          this.listChat = [];
          resolve(error);
        }
      }))
  }

  getChatMessages(senderId: any, receiverId:any): Promise<any>{
    return new Promise<any>(resolve => 
      this.chatService.getChatMessages(senderId, receiverId).subscribe({
        next: async (response: any) => {
          console.log('Response: ', response);
          this.chatMessage = response.length;
          if(response.length > 0){
            this.bubbleChat = response;
          }
          else{
            this.bubbleChat = [];
          }
          resolve(true);
        },
        error: (error: any) => {
          console.log('#error', error);
          this.bubbleChat = [];
          this.chatMessage = 0;
          resolve(error);
        }
      }))
  }

  sendMessage(body: any): Promise<any>{
    return new Promise<any>(resolve => {
      console.log(body);
      this.stompClient.send('/api/sendmsg', JSON.stringify(body));
      console.log("done send");
      resolve(true);
    }
      // this.chatService.sendMessage(body).subscribe({
      //   next: async (response: any) => {
      //     console.log('Response: ', response);
      //     resolve(true);
      //   },
      //   error: (error: any) => {
      //     console.log('#error', error);
      //     resolve(error);
      //   }
      // })
    )
  }

  setBodySendMessage(): Promise<any>{
    return new Promise<any>(resolve =>{
      let body = {
        senderId: this.user.id,
        receiverId: this.receiverId,
        message: this.message
      }
      resolve(body);
    });
  }

  async onSendChat(){
    if(this.message!=''){
      // let body = await this.setBodySendMessage();
      // console.log("done set body");
      // await this.sendMessage(body);
      let payload: any = {
        senderId: this.user.id,
        receiverId: this.receiverId,
        message: this.message
      };
      console.log(JSON.stringify(payload))
      this.stompClient.send('/api/sendmsg', {}, JSON.stringify(payload));
      this.message = '';
      
      let obj = {
        'userId': this.receiverId,
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
    this.activeChat = e.id;
    this.receiverId = e.userId;
    await this.getChatMessages(this.user.id, e.userId);
  }
  
  async setDetailChatPage(e:any){
    let result = this.listChat.find(chat => chat.userId == e.id);
    console.log(result);
    if(result){
      await this.goToDetailChatPage(result);
      this.activeChat = result.id;
    }
    else {
      this.roomName = e.name;
      this.roomImage = e.image;
      this.listChat.unshift({
        'id': 999999,
        'userId': e.id,
        'userImage': e.image,
        'userName': e.name,
      })
    }
    this.activeChat = 999999;
    this.chatMessage = 1;
  }

  backButton(){
    this.location.back();
  }
}
