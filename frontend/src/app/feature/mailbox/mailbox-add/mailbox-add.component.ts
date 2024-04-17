import { MailboxService } from './../service/mailbox.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import Swal from 'sweetalert2';
import { Mailbox } from '../mailbox.interface';
import { listItems } from 'src/app/shared/component/dropdown/dropdown.component';

@Component({
  selector: 'app-mailbox-add',
  templateUrl: './mailbox-add.component.html',
  styleUrls: ['./mailbox-add.component.css']
})
export class MailboxAddComponent implements OnInit{
  apartmentId = 1;
  flagValidasi?: boolean = false;
  data: Mailbox = {};
  mailboxCategory: listItems[] = [];
  @Output() onSubmitEvent = new EventEmitter<any>;

  constructor(private mailboxService: MailboxService, private apps: AppComponent){}

  async ngOnInit() {
    this.data = {};
    this.mailboxCategory = [];
    let category = await this.getMailboxActiveCategory(this.apartmentId, true);
    this.setDropdown(category);
  }

  onButtonSubmit(){
    this.flagValidasi = false;
    let errorMsg = "";
    console.log(this.data);

    if(this.data['Resident ID']=="" || this.data['Resident ID']=="Select a value" || this.data['Resident ID']==undefined){
      errorMsg = "Please choose Mailbox Recipient";
    }
    else if(this.data['Mailbox ID']=="" || this.data['Mailbox ID']==undefined){
      errorMsg = "Please choose Mailbox Category";
    } 
    else if(this.data['Mailbox Desc']=="" || this.data['Mailbox Desc']=="Select a value" || this.data['Mailbox Desc']==undefined){
      errorMsg = "Please fill Mailbox Description";
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
        confirmButtonText: 'Sure',
        cancelButtonText: 'Cancel',
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
    let body = await this.setBodyInsert();
    let result = await this.insertMailboxDetail(body);
    this.apps.loadingPage(false);
    this.data = { };
    this.mailboxCategory = [];
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

  setBodyInsert(): Promise<any>{
    return new Promise<any>(resolve =>{
      let body = {
        'mailboxId': this.data['Mailbox ID'],
        'residentId': this.data['Resident ID'],
        'description': this.data['Mailbox Desc']
      }
      resolve(body);
    });
  }

  insertMailboxDetail(body:any): Promise<any>{
    return new Promise<any>(resolve => 
      this.mailboxService.insertMailboxDetail(body).subscribe({
        next: async (response: any) => {
          console.log('Response: ', response);
          resolve(true);
        },
        error: (error: any) => {
          console.log('#error', error);
          resolve(error);
        }
      })
    )
  }

  setDropdown(data: any){
    for(let i=0; i<data.length; i++){
      this.mailboxCategory.push({
        'code': data[i].category,
        'value': data[i].id,
        'selected': false
      });
    }
  }

  getMailboxActiveCategory(apartementId:any, isActive:any): Promise<any>{
    return new Promise<any>(resolve => 
      this.mailboxService.getMailboxActiveCategory(apartementId, isActive).subscribe({
        next: async (response: any) => {
          console.log('Response: ', response);
          resolve(response.data);
        },
        error: (error: any) => {
          console.log('#error', error);
          resolve(error);
        }
      })
    )
  }
}
