import { Component, EventEmitter, Output } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { PaymentService } from '../service/payment.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-payment-add-category',
  templateUrl: './payment-add-category.component.html',
  styleUrls: ['./payment-add-category.component.css']
})
export class PaymentAddCategoryComponent {
  apartmentId = 1;
  flagValidasi?: boolean = false;
  category!: string
  @Output() onSubmitEvent = new EventEmitter<any>;

  constructor(private paymentService: PaymentService, private apps: AppComponent){}

  onButtonSubmit(){
    this.flagValidasi = false;
    let errorMsg = "";

    if(this.category=="" || this.category=="Select a value" || this.category==undefined){
      errorMsg = "Please fill Billing Category";
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
    let body = await this.setBodyInsertCategory();
    let result = await this.insertPaymentCategory(body);
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
        'apartmentId': this.apartmentId,
        'category': this.category,
        'isActive': true
      }
      resolve(body);
    });
  }

  insertPaymentCategory(body:any): Promise<any>{
    return new Promise<any>(resolve => 
      this.paymentService.insertPaymentCategory(body).subscribe({
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
