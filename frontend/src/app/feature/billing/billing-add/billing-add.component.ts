import { Component, EventEmitter, Output } from '@angular/core';
import Swal from 'sweetalert2';
import { BillingService } from '../service/billing.service';
import { listItems } from 'src/app/shared/component/dropdown/dropdown.component';
import { AppComponent } from 'src/app/app.component';
import { Billing } from '../billing.interface';
import { AppService } from 'src/app/app.service';
import { AdminService } from '../../admin/service/admin.service';


@Component({
  selector: 'app-billing-add',
  templateUrl: './billing-add.component.html',
  styleUrls: ['./billing-add.component.css']
})
export class BillingAddComponent {
  user = this.appService.retrieveUser();
  flagValidasi?: boolean = false;
  data: Billing = {};
  paymentCategory: listItems[] = [];
  residentList: listItems[] = [];
  @Output() onSubmitEvent = new EventEmitter<any>;

  constructor(private billingService: BillingService, private apps: AppComponent, private appService: AppService, private adminService: AdminService){}

  async ngOnInit() {
    this.data = {};
    this.paymentCategory = [];
    let category = await this.getBillingActiveCategory(this.user.id, true);
    this.setDropdown(category);
    let resident = await this.getResidentList(this.user.id);
    this.setResidentList(resident);
  }

  onButtonSubmit(){
    this.flagValidasi = false;
    let errorMsg = "";
    console.log(this.data);

    if(this.data['residentId']=="" || this.data['residentId']=="Select a value" || this.data['residentId']==undefined){
      errorMsg = "Please choose Resident";
    }
    else if(this.data['billingId']=="" || this.data['billingId']==undefined){
      errorMsg = "Please choose Billing Category";
    } 
    else if(this.data['amount'] < 0 || this.data['amount']==null || this.data['amount']==undefined){
      errorMsg = "Please fill Billing Amount";
    }
    else if(this.data['dueDate']=="" || this.data['dueDate']==undefined){
      errorMsg = "Please choose Due Date";
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
    let result = await this.insertBillingDetail(body);
    this.apps.loadingPage(false);
    this.data = { };
    this.paymentCategory = [];
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
        'billingId': this.data['billingId'],
        'residentId': this.data['residentId'],
        'amount': this.data['amount'],
        'dueDate': this.data['dueDate']
      }
      resolve(body);
    });
  }

  insertBillingDetail(body:any): Promise<any>{
    return new Promise<any>(resolve => 
      this.billingService.insertBillingDetail(body).subscribe({
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
      this.paymentCategory.push({
        'code': data[i].category,
        'value': data[i].id,
        'selected': false
      });
    }
  }

  getBillingActiveCategory(apartementId:any, isActive:any): Promise<any>{
    return new Promise<any>(resolve => 
      this.billingService.getBillingActiveCategory(apartementId, isActive).subscribe({
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
