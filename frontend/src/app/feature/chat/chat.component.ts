import { Component } from '@angular/core';
import { BubbleChat, ChatList } from './chat.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  listChat: ChatList[] = [];
  bubbleChat: BubbleChat[] = [];
  activeChat!: any;
  merchantID!: number;
  index: number = -1;

  constructor(private route: ActivatedRoute){}

  ngOnInit(){
    this.listChat = [
      {
        'id': 1,
        'merchantId': 1,
        'profile': 'null',
        'name': 'Warung Kito',
        'message': 'Nasi Goreng pedas ?',
        'time': '01:08',
        'status': 'received',
        'notification': 2,
      },
      {
        'id': 2,
        'merchantId': 2,
        'profile': 'null',
        'name': 'Bakmi Gading Permai',
        'message': 'Sedang di antar yaa kak',
        'time': '00:58',
        'status': 'received',
        'notification': 8,
      },
      {
        'id': 3,
        'profile': 'null',
        'name': 'Ada Greer',
        'message': 'http://nagucli.ro/wud',
        'time': '17/03/2024',
        'status': 'send',
      },
      {
        'id': 4,
        'profile': 'null',
        'name': 'Jack Logan',
        'message': 'http://dobec.gr/cu',
        'time': '31/01/2024',
        'status': 'received',
      },
      {
        'id': 5,
        'profile': 'null',
        'name': 'Calvin Guerrero',
        'message': 'http://ko.im/dopato',
        'time': '01:08',
        'status': 'received',
        'notification': 2,
      },
      {
        'id': 6,
        'profile': 'null',
        'name': 'Elmer Fletcher',
        'message': 'http://ho.ve/wujomeja',
        'time': '00:58',
        'status': 'received',
        'notification': 8,
      },
      {
        'id': 7,
        'profile': 'null',
        'name': 'Ada Greer',
        'message': 'http://nagucli.ro/wud',
        'time': '17/03/2024',
        'status': 'send',
      },
      {
        'id': 8,
        'profile': 'null',
        'name': 'Jack Logan',
        'message': 'http://dobec.gr/cu',
        'time': '31/01/2024',
        'status': 'received',
      },
      {
        'id': 9,
        'profile': 'null',
        'name': 'Jack Logan',
        'message': 'http://dobec.gr/cu',
        'time': '31/01/2024',
        'status': 'received',
      },
      {
        'id': 10,
        'profile': 'null',
        'name': 'Calvin Guerrero',
        'message': 'http://ko.im/dopato',
        'time': '01:08',
        'status': 'received',
        'notification': 2,
      },
      {
        'id': 11,
        'profile': 'null',
        'name': 'Elmer Fletcher',
        'message': 'http://ho.ve/wujomeja',
        'time': '00:58',
        'status': 'received',
        'notification': 8,
      },
      {
        'id': 12,
        'profile': 'null',
        'name': 'Ada Greer',
        'message': 'http://nagucli.ro/wud',
        'time': '17/03/2024',
        'status': 'send',
      },
      {
        'id': 13,
        'profile': 'null',
        'name': 'Jack Logan',
        'message': 'http://dobec.gr/cu',
        'time': '31/01/2024',
        'status': 'received',
      },
    ];

    this.bubbleChat = [
      {
        'message': 'nasi aascnasklca clascnasknca',
        'time': '18.01',
        'status': 'send',
      },
      {
        'message': 'acascnas ajiojehiocnam cnaalsncioa',
        'time': '18.02',
        'status': 'receive',
      },
    ];

    this.merchantID = this.route.snapshot.params['id'];
    console.log('MerchantID: ', this.merchantID);

    this.index = this.listChat.findIndex(x => x.merchantId == this.merchantID);
    console.log('Index:', this.index);
  }

  goToDetailChatPage(e:any){
    this.activeChat = e.merchantId;
    console.log(e);
    window.location.replace('/chat/' + e.merchantId);

    if(e.notification){
      let index = this.listChat.findIndex(item => item.id == e.id);
      this.listChat[index].notification = null;
    }
  }

  backButton(){
    window.location.replace('/merchant/');
  }
}
