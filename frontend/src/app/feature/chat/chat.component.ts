import { Component } from '@angular/core';
import { BubbleChat, ChatList } from './chat.interface';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from './service/chat.service';
import { AppComponent } from 'src/app/app.component';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  listChat: ChatList[] = [];
  bubbleChat: BubbleChat[] = [];
  errorMsgRoom: string = '';
  roomName: string = '';
  roomImage!: any;
  activeChat!: any;
  merchantID!: number;
  chatMessage: number = 0;

  user = this.appService.retrieveUser();

  constructor(private route: ActivatedRoute, private chatService: ChatService, private apps: AppComponent, private appService: AppService){}

  async ngOnInit(){
    this.apps.loadingPage(true);
    await this.getChatRooms(this.user.id);
    this.merchantID = this.route.snapshot.params['id'];
    if(this.merchantID){
      console.log('MerchantID: ', this.merchantID);
      this.setDetailChatPage(this.merchantID);
    }
    this.apps.loadingPage(false);
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

  onSendChat(){

  }

  async goToDetailChatPage(e:any){
    this.apps.loadingPage(true);
    this.roomName = e.userName;
    this.activeChat = e.id;
    await this.getChatMessages(this.user.id, e.userId);
    this.apps.loadingPage(false);
  }
  
  async setDetailChatPage(id:any){
    console.log('SET DETAIL!');
    this.apps.loadingPage(true);
    let result = this.listChat.find(chat => chat.userId = id);
    console.log(result);
    if(result){
      await this.goToDetailChatPage(result);
    }
    else {
      this.roomName = 'Name';
      this.roomImage = 'Image';
      this.listChat.unshift({
        'id': 9999999,
        'userId': 4,
        'userImage': 'Image',
        'userName': 'Name',
      })
    }
    this.activeChat = 9999999;
    this.chatMessage = 1;
    this.apps.loadingPage(false);
  }

  backButton(){
    window.location.replace('/merchant/');
  }
}
