import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MerchantService } from '../service/merchant.service';
import { AppComponent } from 'src/app/app.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent {
  @Input() role!: any;
  @Input() listTransaction!: any;
  @Input() errorMsg!: string;
  @Input() pagination: boolean = true;

  @Input() length!: number;
  @Input() pageSize: number = 10;
  @Input() pageIndex: number = 0;
  @Input() showPageSizeOptions?: boolean = true;
  @Input() pageSizeOptions?: any = [5, 10, 25];
  @Input() disabled?: any = false;
  @Input() hidePageSize?: boolean = true;
  @Output() onPageIndexEvent = new EventEmitter<number>;
  @Output() onSubmitEvent = new EventEmitter<number>;

  merchant!: any;
  checkout!: any;
  counterProduct = 1;
  paymentProof!: any;
  
  @ViewChild('closeModalCO') modalCloseCO: any;

  constructor(private merchantService: MerchantService, private apps: AppComponent){}

  onClickPageIndex(e:any){
    this.onPageIndexEvent.emit(e.pageIndex);
  }

  onSetCheckout(item:any){
    this.checkout = item;
    this.getMerchantDetail(item.merchantId)
  }

  getMerchantDetail(merchantId:any): Promise<any>{
    return new Promise<any>(resolve => 
      this.merchantService.getMerchantDetail(merchantId).subscribe({
        next: async (response: any) => {
          console.log('Response: ', response);
          this.merchant = response;
          resolve(true);
        },
        error: (error: any) => {
          console.log('#error', error);
          this.merchant = {};
          resolve(error);
        }
      })
    )
  }

  checkoutPayment(body:any): Promise<any>{
    return new Promise<any>(resolve => 
      this.merchantService.payment(body).subscribe({
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

  setBodyCheckoutPay(): Promise<any>{
    return new Promise<any>(resolve =>{
      let body = {
        id: this.checkout.id,
        paymentProofImage: this.paymentProof
      }
      resolve(body);
    });
  }

  async payCheckout(){
    this.apps.loadingPage(true);
    let body = await this.setBodyCheckoutPay();
    let result = await this.checkoutPayment(body);
    if(result==true){
      Swal.fire({
        title: 'Success',
        html: 'Payment Successfuly',
        icon: 'success',
        confirmButtonColor: '#5025FA'
      });
    }
    else {
      Swal.fire({
        title: 'Error',
        html: 'Failed Payment',
        icon: 'error',
        confirmButtonColor: '#5025FA'
      });
    }
    this.redirect();
    this.apps.loadingPage(false);
    this.onSubmitEvent.emit();
  }

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
  
  onButtonClick(value:any, id:any){
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
        this.submitRequest(value, id);
      }
    });
  }

  onButtonVerify(id:any){
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
        let result = await this.verifyPayment(id, true);
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

  async submitRequest(value:any, id:any){
    let result = await this.updateTransactionStatus(id, value);
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

  redirect(){
    this.modalCloseCO.nativeElement.click();
  }
}
