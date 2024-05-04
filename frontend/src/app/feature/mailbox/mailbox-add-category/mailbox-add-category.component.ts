import { Component, EventEmitter, Output } from '@angular/core';
import Swal from 'sweetalert2';
import { MailboxService } from '../service/mailbox.service';
import { AppComponent } from 'src/app/app.component';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-mailbox-add-category',
  templateUrl: './mailbox-add-category.component.html',
  styleUrls: ['./mailbox-add-category.component.css']
})
export class MailboxAddCategoryComponent {
  user = this.appService.retrieveUser();
  flagValidasi?: boolean = false;
  category!: string
  @Output() onSubmitEvent = new EventEmitter<any>;

  constructor(private mailboxService: MailboxService, private apps: AppComponent, private appService: AppService){}

  onButtonSubmit(){
    this.flagValidasi = false;
    let errorMsg = "";

    if(this.category=="" || this.category=="Select a value" || this.category==undefined){
      errorMsg = "Please fill Mailbox Category";
    }
    else{
      this.flagValidasi = true
    }

    if(this.flagValidasi){
      //SUBMIT REQUEST
      Swal.fire({
        title: 'Are you sure?',
        icon: 'question',
        showCancelButton: true,
        cancelButtonColor: "#697988",
        confirmButtonColor: "#5025FA",
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
      }).then((result) => {
        if (result.value) {
          this.apps.loadingPage(true);
          this.submitRequest();
        }
      });
    }
    else{
      Swal.fire({
        title: 'Validasi',
        html: errorMsg,
        icon: 'warning',
        confirmButtonColor: '#5025FA'
      });
    }
  }
  
  async submitRequest(){
    let body = await this.setBodyInsertCategory();
    let result = await this.insertMailboxCategory(body);
    this.apps.loadingPage(false);
    this.onSubmitEvent.emit();

    if(result==true){
      Swal.fire({
        title: 'Success',
        html: 'Inserted Successfuly',
        icon: 'success',
        confirmButtonColor: '#5025FA'
      });
    }
    else {
      Swal.fire({
        title: 'Error',
        html: 'Failed Insert Category',
        icon: 'error',
        confirmButtonColor: '#5025FA'
      });
    }
  }

  setBodyInsertCategory(): Promise<any>{
    return new Promise<any>(resolve =>{
      let body = {
        'apartmentId': this.user.id,
        'category': this.category
      }
      resolve(body);
    });
  }

  insertMailboxCategory(body:any): Promise<any>{
    return new Promise<any>(resolve => 
      this.mailboxService.insertMailboxCategory(body).subscribe({
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
}
