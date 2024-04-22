import { Component, Input } from '@angular/core';
import { Merchant, Product } from '../merchant.interface';
import { ActivatedRoute } from '@angular/router';
import { MerchantService } from '../service/merchant.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-merchant-store',
  templateUrl: './merchant-store.component.html',
  styleUrls: ['./merchant-store.component.css']
})
export class MerchantStoreComponent {
  merchantId!: number;

  role: string = 'resident';
  store: Merchant = { };
  productList: Product[] = [];
  errorMsgProduct: string = '';

  constructor(private route: ActivatedRoute, private merchantService: MerchantService, private apps: AppComponent){}

  async ngOnInit(){
    this.apps.loadingPage(true);
    this.role = this.apps.getUserRole();
    this.errorMsgProduct = '';
    this.merchantId = this.route.snapshot.params['id'];
    console.log('MerchantID: ', this.merchantId);
    await this.getMerchantDetail(this.merchantId);
    await this.getProductResident(this.merchantId);
    
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

  backButton(){
    window.location.replace('/merchant');
  }
}
