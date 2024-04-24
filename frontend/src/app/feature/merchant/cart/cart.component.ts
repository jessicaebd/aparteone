import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MerchantService } from '../service/merchant.service';
import { AppComponent } from 'src/app/app.component';
import { Cart } from '../merchant.interface';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  residentId = 4;
  role: string = 'resident';
  merchantId!: number;
  cartList: Cart[] = [];
  errorMsg: string = '';
  subtotal!: any;

  productOpen!: any;
  counterProduct = 1;

  @ViewChild('closeModal') modalClose: any;

  constructor(private route: ActivatedRoute, private merchantService: MerchantService, private apps: AppComponent){}

  async ngOnInit(){
    this.apps.loadingPage(true);
    this.role = this.apps.getUserRole();
    this.errorMsg = '';
    this.merchantId = this.route.snapshot.params['id'];
    console.log('MerchantID: ', this.merchantId);
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

  getCartMerchant(residentId:any, merchantId:any): Promise<any>{
    return new Promise<any>(resolve => 
      this.merchantService.getCartMerchant(residentId, merchantId).subscribe({
        next: async (response: any) => {
          console.log('Response: ', response);
          if(response.length > 0){
            this.cartList = response;
            this.errorMsg = '';
          }
          else{
            this.cartList = [];
            this.errorMsg = 'No Data Found!';  
          }
          resolve(true);
        },
        error: (error: any) => {
          console.log('#error', error);
          this.cartList = [];
          this.errorMsg = 'No Data Found!';  
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

  onCartClick(item:any){
    this.productOpen = item;
    console.log(this.productOpen);
    this.counterProduct = item.quantity;
  }

  async saveOrder(){
    this.apps.loadingPage(true);
    this.productOpen.quantity = this.counterProduct;
    console.log('Open Product:', this.productOpen);
    try {
      let check = this.cartList.find(c => c.productId==this.productOpen.id);
      console.log(check);
      await this.updateCart(check!.id, this.productOpen.quantity, this.productOpen.notes);
    } catch (error) {
      console.log(error);
    }
    this.ngOnInit();
    this.apps.loadingPage(false);
    
    this.modalClose.nativeElement.click();
  }

  async deleteOrder(){
    this.apps.loadingPage(true);
    this.productOpen.quantity = this.counterProduct;
    console.log('Open Product:', this.productOpen);
    try {
      let check = this.cartList.find(c => c.productId==this.productOpen.id);
      console.log(check);
      if(check!=undefined){
        await this.deleteCart(check!.id);
      }
    } catch (error) {
      console.log(error);
    }
    this.ngOnInit();
    this.apps.loadingPage(false);
    
    this.modalClose.nativeElement.click();
  }

  onCloseModal(){
    this.modalClose.nativeElement.click();
  }

  backButton(){
    window.location.replace('merchant/store/' + this.merchantId);
  }
}
