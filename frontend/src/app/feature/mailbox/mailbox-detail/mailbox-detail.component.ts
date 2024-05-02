import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MailboxService } from '../service/mailbox.service';
import { AppComponent } from 'src/app/app.component';
import { Mailbox } from '../mailbox.interface';
import Swal from 'sweetalert2';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-mailbox-detail',
  templateUrl: './mailbox-detail.component.html',
  styleUrls: ['./mailbox-detail.component.css']
})
export class MailboxDetailComponent {
  user = this.appService.retrieveUser();
  @Input() data: Mailbox = {};
  @Output() onSubmitEvent = new EventEmitter<any>;

  constructor(private mailboxService: MailboxService, private apps: AppComponent, private appService: AppService){}

  updateMailboxDetail(id:any, status:any): Promise<any>{
    return new Promise<any>(resolve => 
      this.mailboxService.updateMailboxDetail(id, status).subscribe({
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

  sendMailboxNotification(userId:any, mailboxDetailId:any): Promise<any>{
    return new Promise<any>(resolve => 
      this.appService.sendMailboxNotification(userId, mailboxDetailId).subscribe({
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

  async onRemind(){
    let result = await this.sendMailboxNotification(this.user.id, this.data['id']);
    this.apps.loadingPage(false);
    this.onSubmitEvent.emit();

    if(result==true){
      Swal.fire({
        title: 'Success',
        html: 'Sended Successfuly',
        icon: 'success',
        confirmButtonColor: '#5025FA'
      });
    }
    else {
      Swal.fire({
        title: 'Error',
        html: 'Failed Send Reminder',
        icon: 'error',
        confirmButtonColor: '#5025FA'
      });
    }
  }

  onButtonSubmit(){
    //SUBMIT REQUEST
    Swal.fire({
      title: 'Are you sure?',
      icon: 'question',
      showCancelButton: true,
      cancelButtonColor: "#697988",
      confirmButtonColor: "#5025FA",
      confirmButtonText: 'Sure',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.value) {
        this.apps.loadingPage(true);
        this.submitRequest();
      }
    });
  }
  
  async submitRequest(){
    let result = await this.updateMailboxDetail(this.data['id'], 'Completed');
    this.apps.loadingPage(false);
    this.onSubmitEvent.emit();

    if(result==true){
      Swal.fire({
        title: 'Success',
        html: 'Updated Successfuly',
        icon: 'success',
        confirmButtonColor: '#5025FA'
      });
    }
    else {
      Swal.fire({
        title: 'Error',
        html: 'Failed Update Category',
        icon: 'error',
        confirmButtonColor: '#5025FA'
      });
    }
  }
}
