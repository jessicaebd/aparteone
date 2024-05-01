import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MerchantService } from '../service/merchant.service';
import { AppComponent } from 'src/app/app.component';
import { Cart } from '../merchant.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  residentId = 4;
  role: string = 'resident';
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

  constructor(private route: ActivatedRoute, private merchantService: MerchantService, private apps: AppComponent){}

  async ngOnInit(){
    this.apps.loadingPage(true);
    this.role = this.apps.getUserRole();
    this.errorMsg = '';
    this.merchantId = this.route.snapshot.params['id'];
    console.log('MerchantID: ', this.merchantId);
    this.getMerchantDetail(this.merchantId)
    await this.getCartMerchant(this.residentId, this.merchantId);
    await this.countSubtotal();
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

  deleteCart(cartId:any): Promise<any>{
    return new Promise<any>(resolve => 
      this.merchantService.deleteCart(cartId).subscribe({
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

  checkoutCart(body:any): Promise<any>{
    return new Promise<any>(resolve => 
      this.merchantService.checkout(body).subscribe({
        next: async (response: any) => {
          console.log('Response: ', response);
          this.checkout = response;
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

  setBodyCheckoutCart(): Promise<any>{
    return new Promise<any>(resolve =>{
      let listId = [];
      for(let item of this.cartList){
        listId.push(item.id);
      }
      let body = {
        residentId: this.residentId,
        merchantId: this.merchantId,
        carts: listId
      }
      resolve(body);
    });
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

  onCartClick(item:any){
    this.productOpen = item;
    console.log(this.productOpen);
    this.counterProduct = item.quantity;
  }

  async saveOrder(){
    this.apps.loadingPage(true);
    this.productOpen.quantity = this.counterProduct;
    console.log('Open Product:', this.productOpen);
    await this.updateCart(this.productOpen.id, this.productOpen.quantity, this.productOpen.notes);
    this.ngOnInit();
    this.apps.loadingPage(false);
    
    this.modalClose.nativeElement.click();
  }

  async deleteOrder(){
    this.apps.loadingPage(true);
    this.productOpen.quantity = this.counterProduct;
    console.log('Open Product:', this.productOpen);
    await this.deleteCart(this.productOpen.id);
    this.ngOnInit();
    this.apps.loadingPage(false);
    
    this.modalClose.nativeElement.click();
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
    this.modalCloseCO.nativeElement.click();
    this.apps.loadingPage(false);
    this.goToTransactionPage();
  }
  
  goToTransactionPage(){
    window.location.replace('/transaction-list');
  }

  async onCheckoutCart(){
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
          this.apps.loadingPage(true);
          let body = await this.setBodyCheckoutCart();
          await this.checkoutCart(body);
          this.apps.loadingPage(false);
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