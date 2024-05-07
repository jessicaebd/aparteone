import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BillingService } from '../service/billing.service';
import { AppComponent } from 'src/app/app.component';
import { Billing } from '../billing.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-billing-pay',
  templateUrl: './billing-pay.component.html',
  styleUrls: ['./billing-pay.component.css']
})
export class BillingPayComponent {
  @Input() data: Billing = {};
  @Output() onSubmitEvent = new EventEmitter<any>;

  image!:any;
  flagValidasi: boolean = false;

  constructor(private billingService: BillingService, private apps: AppComponent){}

  insertPaymentProof(body:any): Promise<any>{
    return new Promise<any>(resolve => 
      this.billingService.insertPaymentProof(body).subscribe({
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

  setBodyInsert(): Promise<any>{
    return new Promise<any>(resolve =>{
      let body = {
        'id': this.data['id'],
        'paymentProofImage': this.image
      }
      resolve(body);
    });
  }

  onButtonSubmit(){
    this.flagValidasi = false;
    let errorMsg = "";
    console.log(this.data);

    if(this.image=="" || this.image==null || this.image==undefined){
      errorMsg = "Please Upload Payment Proff";
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
    let result = await this.insertPaymentProof(body);
    this.apps.loadingPage(false);
    this.onSubmitEvent.emit();

    if(result==true){
      Swal.fire({
        title: 'Success',
        html: 'Uploaded Successfuly',
        icon: 'success',
        confirmButtonColor: '#5025FA'
      });
    }
    else {
      Swal.fire({
        title: 'Error',
        html: 'Failed Upload Payment Proof',
        icon: 'error',
        confirmButtonColor: '#5025FA'
      });
    }
  }
}
