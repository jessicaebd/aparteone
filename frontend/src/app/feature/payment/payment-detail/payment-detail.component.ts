import { Component, EventEmitter, Input, Output } from '@angular/core';
import Swal from 'sweetalert2';
import { PaymentService } from '../service/payment.service';
import { AppComponent } from 'src/app/app.component';
import { Payment } from '../payment.interface';

@Component({
  selector: 'app-payment-detail',
  templateUrl: './payment-detail.component.html',
  styleUrls: ['./payment-detail.component.css']
})
export class PaymentDetailComponent {
  @Input() data: Payment = {};
  @Output() onSubmitEvent = new EventEmitter<any>;

  constructor(private paymentService: PaymentService, private apps: AppComponent){}

  updateMailboxDetail(id:any, status:any): Promise<any>{
    return new Promise<any>(resolve => 
      this.paymentService.updatePaymentDetail(id, status).subscribe({
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
      this.paymentService.verifyPayment(id, isValid).subscribe({
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
      result = await this.updateMailboxDetail(this.data['id'], type);
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
