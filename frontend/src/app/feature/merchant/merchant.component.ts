import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { MerchantService } from './service/merchant.service';
import { Merchant } from './merchant.interface';
import { Column } from 'src/app/shared/component/table/table.component';
import { AppComponent } from 'src/app/app.component';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-merchant',
  templateUrl: './merchant.component.html',
  styleUrls: ['./merchant.component.css']
})
export class MerchantComponent implements OnInit{
  user = this.appService.retrieveUser();

  tableList: any;
  keySearch: string = '';
  allMerchantList: any;
  errorMsgList: string = '';
  pageList: number = 0;
  sizeList: number = 10;
  colList: Column[] =[];
  dataMerchant: Merchant = {};

  @ViewChild('closeModal') modalClose: any;

  constructor(private location: Location, private merchantService: MerchantService, private apps: AppComponent, private appService: AppService){}

  async ngOnInit() {
    this.apps.loadingPage(true);
    this.errorMsgList = '';
    this.colList = [
      {name: 'name', displayName: 'Name'}, 
      {name: 'category', displayName: 'Category'}, 
      {name: 'isActive', displayName: 'Status'}, 
      {name:"ActionCol", displayName:"Action", align:"center"}];
    if(this.user.role=='Management'){
      this.getMerchantApartment(this.user.id, this.sizeList, this.pageList);
    }
    else if(this.user.role=='Admin'){
      if(this.keySearch==undefined || this.keySearch==null || this.keySearch==''){
        await this.getAllMerchantApartment(this.sizeList, this.pageList);
      }
      else{
        await this.searchAllMerchantApartment(this.sizeList, this.pageList, this.keySearch);
      }
    }
    this.apps.loadingPage(false);
  }

  getAllMerchantApartment(size:any, page: any): Promise<any>{
    return new Promise<any>(resolve => 
      this.merchantService.getMerchantApartment(null, size, page, 'Approved').subscribe({
        next: async (response: any) => {
          if(response.data.length > 0){
            this.tableList = response.data;
            this.allMerchantList = response.totalElements;
          }
          else{
            this.errorMsgList = 'No Data Found!'
            this.tableList = [];
          }
          resolve(true);
        },
        error: (error: any) => {
          console.log('#error', error);
          this.errorMsgList = 'No Data Found!'
          this.tableList = [];
          resolve(error);
        }
      }))
  }

  searchAllMerchantApartment(size:any, page: any, search:any): Promise<any>{
    return new Promise<any>(resolve => 
      this.merchantService.searchMerchantApartment(null, size, page, search).subscribe({
        next: async (response: any) => {
          console.log('Response: ', response);
          if(response.data.length > 0){
            this.tableList = response.data;
            this.allMerchantList = response.totalElements;
          }
          else{
            this.errorMsgList = 'No Data Found!'
            this.tableList = [];
          }
          resolve(true);
        },
        error: (error: any) => {
          console.log('#error', error);
          this.errorMsgList = 'No Data Found!'
          this.tableList = [];
          resolve(error);
        }
      }))
  }

  getMerchantApartment(apartementId:any, size:any, page: any): Promise<any>{
    return new Promise<any>(resolve => 
      this.merchantService.getMerchantApartment(apartementId, size, page, 'Approved').subscribe({
        next: async (response: any) => {
          if(response.data.length > 0){
            this.tableList = response.data;
            this.allMerchantList = response.totalElements;
          }
          else{
            this.errorMsgList = 'No Data Found!'
            this.tableList = [];
          }
          resolve(true);
        },
        error: (error: any) => {
          console.log('#error', error);
          this.errorMsgList = 'No Data Found!'
          this.tableList = [];
          resolve(error);
        }
      }))
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

  onSearchMerchant(key:any){
    this.keySearch = key;
    this.pageList = 0;
    this.ngOnInit();
  }

  async onListItemClick(e:any){
    await this.setDataMerchant(e);
  }

  onLoadData(e:any){
    this.pageList = e;
    this.ngOnInit();
  }

  redirect(){
    this.modalClose.nativeElement.click();
    this.ngOnInit();
  }

  goToAllMerchantPage(){
    window.location.replace('/merchant/all');
  }

  goToHistoryTransactionPage(){
    window.location.replace('/transaction');
  }

  backButton(){
    this.location.back();
  }
}
