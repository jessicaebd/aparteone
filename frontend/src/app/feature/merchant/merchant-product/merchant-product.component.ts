import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Cart, Product } from '../merchant.interface';
import Swal from 'sweetalert2';
import { MerchantService } from '../service/merchant.service';
import { AppComponent } from 'src/app/app.component';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-merchant-product',
  templateUrl: './merchant-product.component.html',
  styleUrls: ['./merchant-product.component.css']
})
export class MerchantProductComponent {
  @Input() merchantId!: number;
  @Output() onSubmitEvent = new EventEmitter<any>;
  
  user = this.appService.retrieveUser();

  productList: Product[] = [];
  cartList: Cart[] = [];
  productNote: string = '';
  keySearch?: string;
  filter: any = "";
  productOpen!: any;
  counterProduct = 1;

  flagCart?: boolean = false;
  errorMsgProduct: string = '';
  flagValidasi?: boolean = false;

  @ViewChild('closeModal') modalClose: any;

  constructor(private merchantService: MerchantService, private apps: AppComponent, private appService: AppService){}

  async ngOnInit() {
    this.apps.loadingPage(true);
    this.errorMsgProduct = '';
    await this.getProductResident(this.merchantId);
    await this.getCartMerchant(this.user.id, this.merchantId);
    this.productList = await this.updateProductQuantity(this.productList, this.cartList);
    this.productList = await this.updateProductNotes(this.productList, this.cartList);
    console.log(this.productList);
    this.apps.loadingPage(false);
  }
  
  updateProductQuantity(product:Product[], cart:Cart[]): Promise<any>{
    return new Promise<any> (resolve => {
      let result = product.map(p => (p.quantity = cart.find(c => c.productId == p.id)?.quantity || p.quantity, p));
      resolve(result)
    });
  }

  updateProductNotes(product:Product[], cart:Cart[]): Promise<any>{
    return new Promise<any> (resolve => {
      let result = product.map(p => (p.notes = cart.find(c => c.productId == p.id)?.notes || p.notes, p));
      resolve(result)
    });
  }

  setBodyAddToCart(): Promise<any>{
    return new Promise<any>(resolve =>{
      let body = {
        residentId: this.user.id,
        merchantId: this.merchantId,
        productId: this.productOpen.id,
        quantity: this.counterProduct,
        notes: this.productOpen.notes
      }
      resolve(body);
    });
  }

  getProductResident(merchantId:any): Promise<any>{
    return new Promise<any>(resolve => 
      this.merchantService.getProductResident(merchantId).subscribe({
        next: async (response: any) => {
          console.log('Response: ', response);
          if(response.data.length > 0){
            this.productList = response.data;
          }
          else{
            this.errorMsgProduct = 'No Data Found!'
            this.productList = [];
          }
          resolve(true);
        },
        error: (error: any) => {
          console.log('#error', error);
          this.errorMsgProduct = 'No Data Found!'
          this.productList = [];
          resolve(error);
        }
      }))
  }

  getCartMerchant(residentId:any, merchantId:any): Promise<any>{
    return new Promise<any>(resolve => 
      this.merchantService.getCartMerchant(residentId, merchantId).subscribe({
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

  addToCart(body:any): Promise<any>{
    return new Promise<any>(resolve => 
      this.merchantService.addToCart(body).subscribe({
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

  async saveOrder(){
    this.apps.loadingPage(true);
    this.productOpen.quantity = this.counterProduct;
    console.log('Open Product:', this.productOpen);
    try {
      let check = this.cartList.find(c => c.productId==this.productOpen.id);
      console.log(check);
      if(check!=undefined){
        await this.updateCart(check!.id, this.productOpen.quantity, this.productOpen.notes);
      }
      else {
        let body = await this.setBodyAddToCart();
        await this.addToCart(body);
      }
    } catch (error) {
      console.log(error);
    }
    this.ngOnInit();
    this.apps.loadingPage(false);
    
    this.onSubmitEvent.emit();
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
    
    this.onSubmitEvent.emit();
    this.modalClose.nativeElement.click();
  }

  onFilterBy(e:any){
    this.filter = e;
    console.log('Filter :', this.filter);
  }

  onSearchData(){
    console.log(this.keySearch);
  }

  onProductClick(item: any){
    this.productOpen = item;
    if(item.quantity == null || item.quantity == undefined){
      this.counterProduct = 1;
      this.flagCart = false;
    }
    else{
      this.counterProduct = item.quantity;
      this.flagCart = true;
    }
  }

  redirect(){
    this.modalClose.nativeElement.click();
  }

  // onButtonSubmit(){
  //   console.log(this.dataCart);
  //   //SUBMIT REQUEST
  //   Swal.fire({
  //     title: 'Are you sure?',
  //     icon: 'question',
  //     showCancelButton: true,
  //     cancelButtonColor: "#697988",
  //     confirmButtonColor: "#5025FA",
  //     confirmButtonText: 'Sure',
  //     cancelButtonText: 'Cancel',
  //   }).then((result) => {
  //     if (result.value) {
  //       this.apps.loadingPage(true);
  //       this.submitRequest();
  //     }
  //   });
  // }

  // async submitRequest(){
  //   this.onSubmitEvent.emit();

  //   if(result==true){
  //     Swal.fire({
  //       title: 'Success',
  //       html: 'Inserted Successfuly',
  //       icon: 'success',
  //       confirmButtonColor: '#5025FA'
  //     });
  //   }
  //   else {
  //     Swal.fire({
  //       title: 'Error',
  //       html: 'Failed Insert Category',
  //       icon: 'error',
  //       confirmButtonColor: '#5025FA'
  //     });
  //   }
  // }
}
