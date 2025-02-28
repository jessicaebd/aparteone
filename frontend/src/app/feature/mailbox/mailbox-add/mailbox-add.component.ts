import { MailboxService } from './../service/mailbox.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import Swal from 'sweetalert2';
import { Mailbox } from '../mailbox.interface';
import { listItems } from 'src/app/shared/component/dropdown/dropdown.component';
import { AppService } from 'src/app/app.service';
import { AdminService } from '../../admin/service/admin.service';

@Component({
  selector: 'app-mailbox-add',
  templateUrl: './mailbox-add.component.html',
  styleUrls: ['./mailbox-add.component.css']
})
export class MailboxAddComponent implements OnInit{
  user = this.appService.retrieveUser();
  flagValidasi?: boolean = false;
  data: Mailbox = {};
  mailboxCategory: listItems[] = [];
  residentList: listItems[] = [];
  @Output() onSubmitEvent = new EventEmitter<any>;

  constructor(private mailboxService: MailboxService, private apps: AppComponent, private appService: AppService, private adminService: AdminService){}

  async ngOnInit() {
    this.data = {};
    this.mailboxCategory = [];
    let category = await this.getMailboxActiveCategory(this.user.id, true);
    this.setDropdown(category);
    let resident = await this.getResidentList(this.user.id);
    this.setResidentList(resident);
  }

  onButtonSubmit(){
    this.flagValidasi = false;
    let errorMsg = "";
    console.log(this.data);

    if(this.data['residentId']=="" || this.data['residentId']=="Select a value" || this.data['residentId']==undefined){
      errorMsg = "Please choose Mailbox Recipient";
    }
    else if(this.data['mailboxId']=="" || this.data['mailboxId']==undefined){
      errorMsg = "Please choose Mailbox Category";
    } 
    else if(this.data['description']=="" || this.data['description']=="Select a value" || this.data['description']==undefined){
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
        'mailboxId': this.data['mailboxId'],
        'residentId': this.data['residentId'],
        'description': this.data['description']
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

  setResidentList(data: any){
    for(let i=0; i<data.length; i++){
      this.residentList.push({
        'code': data[i].name,
        'value': data[i].id,
        'selected': false
      });
    }
  }

  getResidentList(apartementId:any): Promise<any>{
    return new Promise<any>(resolve => 
      this.adminService.getResidentList(apartementId, 9999, 0, 'Approved').subscribe({
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
