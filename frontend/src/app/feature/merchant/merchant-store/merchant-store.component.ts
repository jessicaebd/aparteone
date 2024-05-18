import { Component, Input, ViewChild } from '@angular/core';
import { Merchant, Product } from '../merchant.interface';
import { ActivatedRoute } from '@angular/router';
import { MerchantService } from '../service/merchant.service';
import { AppComponent } from 'src/app/app.component';
import { AppService } from 'src/app/app.service';
import { CartComponent } from '../cart/cart.component';
import { MerchantProductComponent } from '../merchant-product/merchant-product.component';

@Component({
  selector: 'app-merchant-store',
  templateUrl: './merchant-store.component.html',
  styleUrls: ['./merchant-store.component.css']
})
export class MerchantStoreComponent {
  user = this.appService.retrieveUser();

  merchantId!: number;
  store: Merchant = { };
  productList: Product[] = [];
  errorMsgProduct: string = '';

  @ViewChild(CartComponent) cart!: CartComponent;
  @ViewChild(MerchantProductComponent) product!: MerchantProductComponent;

  constructor(private route: ActivatedRoute, private merchantService: MerchantService, private apps: AppComponent, private appService: AppService){}

  async ngOnInit(){
    this.apps.loadingPage(true);
    this.errorMsgProduct = '';
    this.merchantId = this.route.snapshot.params['id'];
    console.log('MerchantID: ', this.merchantId);
    if(this.user.role=='Resident'){
      await this.getMerchantDetail(this.merchantId);    
    }
    else {
      window.location.replace('');
    }
    this.apps.loadingPage(false);
  }

  getMerchantDetail(merchantId:any): Promise<any>{
    return new Promise<any>(resolve => 
      this.merchantService.getMerchantDetail(merchantId).subscribe({
        next: async (response: any) => {
          console.log('Response: ', response);
          this.store = response;
          resolve(true);
        },
        error: (error: any) => {
          console.log('#error', error);
          resolve(error);
        }
      }))
  }

  onCartRefresh(){
    this.cart.ngOnInit();
    this.product.ngOnInit();
  }

  backButton(){
    window.location.replace('/merchant');
  }
  
  goToCartPage(){
    window.location.replace('/cart/' + this.merchantId);
  }
}
