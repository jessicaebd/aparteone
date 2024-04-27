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

  redirect(){
    this.modalCloseCO.nativeElement.click();
  }
}
