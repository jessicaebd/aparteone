import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MerchantService } from '../service/merchant.service';
import { AppComponent } from 'src/app/app.component';
import { Cart } from '../merchant.interface';
import Swal from 'sweetalert2';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  user = this.appService.retrieveUser();
  
  merchantId!: number;
  cartList: Cart[] = [];
  merchant!: any;
  errorMsg: string = '';
  subtotal!: any;
  productOpen!: any;
  checkout!: any;
  counterProduct = 1;
  paymentProof!: any;
  flagNoCart: boolean = false;
  flagValidasi = false;

  @ViewChild('closeModal') modalClose: any;
  @ViewChild('closeModalCO') modalCloseCO: any;

  constructor(private route: ActivatedRoute, private merchantService: MerchantService, private apps: AppComponent, private appService: AppService){}

  async ngOnInit(){
    this.apps.loadingPage(true);
    this.errorMsg = '';
    this.merchantId = this.route.snapshot.params['id'];
    console.log('MerchantID: ', this.merchantId);
    this.getMerchantDetail(this.merchantId);
    if(this.user.role=='Resident'){
      await this.getCartMerchant(this.user.id, this.merchantId);
      await this.countSubtotal();
    }
    else {
      window.location.replace('');
    }
    this.apps.loadingPage(false);
  }

  countSubtotal(): Promise<any>{
    return new Promise<any>(resolve => {
      this.subtotal = 0;
      for(let item of this.cartList){
        this.subtotal = this.subtotal + item.totalPrice;
      }
      resolve(true);
    })
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

  getCartMerchant(residentId:any, merchantId:any): Promise<any>{
    return new Promise<any>(resolve => 
      this.merchantService.getCartMerchant(residentId, merchantId).subscribe({
        next: async (response: any) => {
          console.log('Response: ', response);
          if(response.length > 0){
            this.cartList = response;
            this.errorMsg = '';
            this.flagNoCart = false;
          }
          else{
            this.cartList = [];
            this.errorMsg = 'No Data Found!';  
            this.flagNoCart = true;
          }
          resolve(true);
        },
        error: (error: any) => {
          console.log('#error', error);
          this.cartList = [];
          this.errorMsg = 'No Data Found!';  
          this.flagNoCart = true;
          resolve(error);
        }
      })
    )
  }

  updateCart(cartId:any, quantity:any, notes:any): Promise<any>{
    return new Promise<any>(resolve => 
      this.merchantService.updateCart(cartId, quantity, notes).subscribe({
        next: async (response: any) => {
          console.log('Response: ', response);
          this.cartList = response;
          resolve(true);
        },
        error: (error: any) => {
          console.log('#error', error);
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
    console.log(body);
    // let result = await this.checkoutPayment(body);
    // if(result==true){
    //   Swal.fire({
    //     title: 'Success',
    //     html: 'Payment Successfuly',
    //     icon: 'success',
    //     confirmButtonColor: '#5025FA'
    //   });
    // }
    // else {
    //   Swal.fire({
    //     title: 'Error',
    //     html: 'Failed Payment',
    //     icon: 'error',
    //     confirmButtonColor: '#5025FA'
    //   });
    // }
    this.modalCloseCO.nativeElement.click();
    this.apps.loadingPage(false);
    this.goToTransactionPage();
  }
  
  goToTransactionPage(){
    window.location.replace('/transaction-list');
  }

  async onCheckoutPay(){
    this.flagValidasi = false;
    let errorMsg = "";

    if(this.paymentProof=="" || this.paymentProof==undefined){
      errorMsg = "Please Upload Payment Proof";
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
      }).then(async (result) => {
        if (result.value) {
          await this.payCheckout();
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

  backButton(){
    window.location.replace('merchant/store/' + this.merchantId);
  }
}