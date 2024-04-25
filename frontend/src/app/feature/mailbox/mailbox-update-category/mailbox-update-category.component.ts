import { MailboxService } from './../service/mailbox.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import Swal from 'sweetalert2';
import { MailboxCategory } from '../mailbox.interface';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-mailbox-update-category',
  templateUrl: './mailbox-update-category.component.html',
  styleUrls: ['./mailbox-update-category.component.css']
})
export class MailboxUpdateCategoryComponent {
  @Input() data: MailboxCategory = {};
  @Output() onSubmitEvent = new EventEmitter<any>;

  constructor(private mailboxService: MailboxService, private apps: AppComponent){}

  updateMailboxCategory(id:any, isActive:any): Promise<any>{
    return new Promise<any>(resolve => 
      this.mailboxService.updateMailboxCategory(id, isActive).subscribe({
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

  onButtonSubmit(isActive: boolean){
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
        this.submitRequest(isActive);
      }
    });
  }
  
  async submitRequest(isActive: boolean){
    let result = await this.updateMailboxCategory(this.data['id'], isActive);
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
