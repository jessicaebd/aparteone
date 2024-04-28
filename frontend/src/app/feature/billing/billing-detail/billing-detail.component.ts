import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BillingService } from '../service/billing.service';
import { AppComponent } from 'src/app/app.component';
import { Billing } from '../billing.interface';
import Swal from 'sweetalert2';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-billing-detail',
  templateUrl: './billing-detail.component.html',
  styleUrls: ['./billing-detail.component.css']
})
export class BillingDetailComponent {
  residentId = 4;
  @Input() data: Billing = {};
  @Output() onSubmitEvent = new EventEmitter<any>;

  constructor(private billingService: BillingService, private apps: AppComponent, private appService: AppService){}

  updateBillingDetail(id:any, status:any): Promise<any>{
    return new Promise<any>(resolve => 
      this.billingService.updateBillingDetail(id, status).subscribe({
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

  verifyPayment(id:any, isValid:any): Promise<any>{
    return new Promise<any>(resolve => 
      this.billingService.verifyPayment(id, isValid).subscribe({
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

  sendBillingNotification(userId:any, billingDetailId:any): Promise<any>{
    return new Promise<any>(resolve => 
      this.appService.sendBillingNotification(userId, billingDetailId).subscribe({
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
    let result = await this.sendBillingNotification(this.residentId, this.data['id']);
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

  onButtonSubmit(type:any){
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
        this.submitRequest(type);
      }
    });
  }
  
  async submitRequest(type:any){
    let result;
    if(type=='Verify'){
      result = await this.verifyPayment(this.data['id'], true);
    }
    else{
      result = await this.updateBillingDetail(this.data['id'], type);
    }
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
        html: 'Failed Update Payment',
        icon: 'error',
        confirmButtonColor: '#5025FA'
      });
    }
  }
}
