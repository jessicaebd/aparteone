import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Merchant } from '../merchant.interface';
import { MerchantService } from '../service/merchant.service';
import { AppComponent } from 'src/app/app.component';
import { Column } from 'src/app/shared/component/table/table.component';

@Component({
  selector: 'app-merchant-all',
  templateUrl: './merchant-all.component.html',
  styleUrls: ['./merchant-all.component.css']
})
export class MerchantAllComponent implements OnInit{
  role : string = 'resident';
  apartmentId = 1;

  tableMerchant: any;
  allDataMerchant: any;
  pageMerchant: number = 0;
  sizeMerchant: number = 10;
  errorMsgMerchant: string = '';
  keySearch: string = ''
  colMerchant: Column[] = [];
  dataMerchant: Merchant = {};

  @ViewChild('closeModal') modalClose: any;

  constructor(private merchantService: MerchantService, private apps: AppComponent){}

  async ngOnInit() {
    this.apps.loadingPage(true);
    this.errorMsgMerchant = '';
    this.role = this.apps.getUserRole();
    if(this.role=='management'){
      this.colMerchant = [{name: 'category', displayName: 'Merchant Category'}, {name: 'name', displayName: 'Merchant Name'}, {name: 'isActive', displayName: 'Status'}, {name:"ActionCol", displayName:"Action", align:"center"}];
      if(this.keySearch==undefined || this.keySearch==null || this.keySearch==''){
        await this.getMerchantApartment(this.apartmentId, this.sizeMerchant, this.pageMerchant);
      }
      else{
        await this.searchMerchantApartment(this.apartmentId, this.sizeMerchant, this.pageMerchant, this.keySearch);
      }
    }
    this.apps.loadingPage(false);
  }

  searchMerchantApartment(apartementId:any, size:any, page:any, search:any): Promise<any>{
    return new Promise<any>(resolve => 
      this.merchantService.searchMerchantApartment(apartementId, size, page, search).subscribe({
        next: async (response: any) => {
          console.log('Response: ', response);
          if(response.data.length > 0){
            this.tableMerchant = response.data;
            this.allDataMerchant = response.totalElements;
          }
          else{
            this.errorMsgMerchant = 'No Data Found!'
            this.tableMerchant = [];
          }
          resolve(true);
        },
        error: (error: any) => {
          console.log('#error', error);
          this.errorMsgMerchant = 'No Data Found!'
            this.tableMerchant = [];
          resolve(error);
        }
      }))
  }

  getMerchantApartment(apartementId:any, size:any, page: any): Promise<any>{
    return new Promise<any>(resolve => 
      this.merchantService.getMerchantApartment(apartementId, size, page, true).subscribe({
        next: async (response: any) => {
          console.log('Response: ', response);
          if(response.data.length > 0){
            this.tableMerchant = response.data;
            this.allDataMerchant = response.totalElements;
          }
          else{
            this.errorMsgMerchant = 'No Data Found!'
            this.tableMerchant = [];
          }
          resolve(true);
        },
        error: (error: any) => {
          console.log('#error', error);
          this.errorMsgMerchant = 'No Data Found!'
          this.tableMerchant = [];
          resolve(error);
        }
      }))
  }

  onSearchMerchant(key:any){
    console.log('Search :', key);
    this.keySearch = key;
    this.pageMerchant = 0;
    this.ngOnInit();
  }

  async onListItemClick(type:any, e:any){
    console.log('OnList:', e);
    let data = await this.setDataMerchant(e);
    console.log('Data Request:', data);
  }

  setDataMerchant(response: any): Promise<any>{
    return new Promise<any> (resolve => {
      this.dataMerchant['id'] = response.id;
      this.dataMerchant['image'] = response.image;
      this.dataMerchant['name'] = response.name;
      this.dataMerchant['bankAccount'] = response.bankAccount;
      this.dataMerchant['accountNumber'] = response.accountNumber;
      this.dataMerchant['accountName'] = response.accountName;
      this.dataMerchant['category'] = response.category;
      this.dataMerchant['address'] = response.address;
      this.dataMerchant['isActive'] = response.isActive;
      this.dataMerchant['isApproved'] = response.isApproved;
      resolve(this.dataMerchant);
    });
  }

  onLoadData(e:any){
    console.log("Onload Page Index: ", e);
    this.pageMerchant = e;
    this.ngOnInit();
  }

  redirect(){
    this.modalClose.nativeElement.click();
    this.ngOnInit();
  }

  goToMerchantStorePage(id: any){
    window.location.replace('/merchant/store/' + id);
  }

  backButton(){
    window.location.replace('/merchant');
  }
}
