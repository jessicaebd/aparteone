import { Component, EventEmitter, Input, Output } from '@angular/core';
import Swal from 'sweetalert2';
import { MerchantService } from '../service/merchant.service';
import { AppComponent } from 'src/app/app.component';
import { Transaction } from '../merchant.interface';

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.css']
})
export class TransactionDetailComponent {
  @Input() data: Transaction = {};
  @Output() onSubmitEvent = new EventEmitter<any>;

  constructor(private merchantService: MerchantService, private apps: AppComponent){}

  updateTransactionStatus(id:any, status:any): Promise<any>{
    return new Promise<any>(resolve => 
      this.merchantService.updateTransactionStatus(id, status).subscribe({
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
      this.merchantService.verifyPayment(id, isValid).subscribe({
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
  
  onButtonClick(value:any){
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
        this.submitRequest(value);
      }
    });
  }

  onButtonVerify(){
    Swal.fire({
      title: 'Are you sure?',
      icon: 'question',
      showCancelButton: true,
      cancelButtonColor: "#697988",
      confirmButtonColor: "#5025FA",
      confirmButtonText: 'Sure',
      cancelButtonText: 'Cancel',
    }).then(async (result) => {
      if (result.value) {
        this.apps.loadingPage(true);
        let result = await this.verifyPayment(this.data['id'], true);
        if(result==true){
          Swal.fire({
            title: 'Success',
            html: 'Verify Successfuly',
            icon: 'success',
            confirmButtonColor: '#5025FA'
          });
        }
        else {
          Swal.fire({
            title: 'Error',
            html: 'Failed Verify Payment',
            icon: 'error',
            confirmButtonColor: '#5025FA'
          });
        }
        this.apps.loadingPage(false);
        this.onSubmitEvent.emit();
      }
    });
  }

  async submitRequest(value:any){
    let result = await this.updateTransactionStatus(this.data['id'], value);
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
        html: 'Failed Update Transaction',
        icon: 'error',
        confirmButtonColor: '#5025FA'
      });
    }
  }
}
