import { AppComponent } from 'src/app/app.component';
import { MerchantService } from './../service/merchant.service';
import { Component, ViewChild } from '@angular/core';
import { Product } from '../merchant.interface';
import { Column } from 'src/app/shared/component/table/table.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-all',
  templateUrl: './product-all.component.html',
  styleUrls: ['./product-all.component.css']
})
export class ProductAllComponent {
  role : string = 'merchant';
  merchantId:number = 9;

  table: any;
  allDataProduct: any;
  page: number = 0;
  size: number = 10;
  keySearch: string = '';
  errorMsg: string = '';
  col: Column[] = [];
  dataProduct: Product = {};

  @ViewChild('closeModalAdd') modalCloseAdd: any;
  @ViewChild('closeModalDetail') modalCloseDetail: any;

  constructor(private location: Location, private merchantService: MerchantService, private apps: AppComponent){}

  async ngOnInit() {
    this.apps.loadingPage(true);
    this.errorMsg = '';
    this.role = this.apps.getUserRole();
    if(this.role=='merchant'){
      this.col = [{name: 'name', displayName: 'Product Name'}, {name: 'price', displayName: 'Product Price'}, {name: 'isActive', displayName: 'Status'}, {name:"ActionCol", displayName:"Action", align:"center"}];
      await this.getProductMerchant(this.merchantId, this.size, this.page);
    }
    this.apps.loadingPage(false);
  }

  searchProductMerchant(merchantId:any, size:any, page:any, search:any): Promise<any>{
    return new Promise<any>(resolve => 
      this.merchantService.searchProductMerchant(merchantId, size, page, search).subscribe({
        next: async (response: any) => {
          console.log('Response: ', response);
          if(response.data.length > 0){
            this.table = response.data;
            this.allDataProduct = response.totalElements;
          }
          else{
            this.errorMsg = 'No Data Found!'
            this.table = [];
          }
          resolve(true);
        },
        error: (error: any) => {
          console.log('#error', error);
          this.errorMsg = 'No Data Found!'
            this.table = [];
          resolve(error);
        }
      }))
  }

  getProductMerchant(apartementId:any, size:any, page: any): Promise<any>{
    return new Promise<any>(resolve => 
      this.merchantService.getProductMerchant(apartementId, size, page).subscribe({
        next: async (response: any) => {
          console.log('Response: ', response);
          if(response.data.length > 0){
            this.table = response.data;
            this.allDataProduct = response.totalElements;
          }
          else{
            this.errorMsg = 'No Data Found!'
            this.table = [];
          }
          resolve(true);
        },
        error: (error: any) => {
          console.log('#error', error);
          this.errorMsg = 'No Data Found!'
          this.table = [];
          resolve(error);
        }
      }))
  }

  async onSearchProduct(){
    this.apps.loadingPage(true);
    this.errorMsg = '';
    console.log('Search :', this.keySearch);
    // this.keySearch = key;
    this.page = 0;
    if(this.keySearch!='' && this.keySearch!=undefined){
      await this.searchProductMerchant(this.merchantId, this.size, this.page, this.keySearch);
    }
    else {
      await this.getProductMerchant(this.merchantId, this.size, this.page);
    }
    this.apps.loadingPage(false);
  }

  async onListItemClick(type:any, e:any){
    console.log('OnList:', e);
    let data = await this.setDataProduct(e);
    console.log('Data Product:', data);
  }

  setDataProduct(response: any): Promise<any>{
    return new Promise<any> (resolve => {
      this.dataProduct['id'] = response.id;
      this.dataProduct['image'] = response.image;
      this.dataProduct['name'] = response.name;
      this.dataProduct['description'] = response.description;
      this.dataProduct['price'] = response.price;
      this.dataProduct['isActive'] = response.isActive;
      this.dataProduct['merchantId'] = response.merchantId;
      resolve(this.dataProduct);
    });
  }

  onLoadData(e:any){
    console.log("Onload Page Index: ", e);
    this.page = e;
    this.ngOnInit();
  }

  redirect(type:any){
    if(type=='add'){
      this.modalCloseAdd.nativeElement.click();
    }
    else if(type=='detail'){
      this.modalCloseDetail.nativeElement.click();
    }
    this.ngOnInit();
  }

  backButton(){
    this.location.back();
  }
}
