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

  tableMerchant: any;
  allDataMerchant: any;
  errorMsgMerchant: string = '';
  pageMerchant: number = 0;
  sizeMerchant: number = 5;
  colMerchant: Column[] = [];
  dataMerchant: Merchant = {};

  @ViewChild('closeModal') modalClose: any;

  constructor(private location: Location, private merchantService: MerchantService, private apps: AppComponent, private appService: AppService){}

  async ngOnInit() {
    this.apps.loadingPage(true);
    this.errorMsgMerchant = '';
    this.errorMsgList = '';
    this.colList = [
      {name: 'name', displayName: 'Name'}, 
      {name: 'category', displayName: 'Category'}, 
      {name: 'isActive', displayName: 'Status'}, 
      {name:"ActionCol", displayName:"Action", align:"center"}];
    if(this.user.role=='Management'){
      this.colMerchant = [{name: 'category', displayName: 'Merchant Category'}, {name: 'name', displayName: 'Merchant Name'}, {name: 'isApproved', displayName: 'Status'}, {name:"ActionCol", displayName:"Action", align:"center"}];
      this.getMerchantApartment(this.user.id, this.sizeMerchant, this.pageMerchant, false);
      this.getMerchantApartment(this.user.id, 5, 0, true);
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
      this.merchantService.getMerchantApartment(null, size, page, true).subscribe({
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

  getMerchantApartment(apartementId:any, size:any, page: any, isApproved:any): Promise<any>{
    return new Promise<any>(resolve => 
      this.merchantService.getMerchantApartment(apartementId, size, page, isApproved).subscribe({
        next: async (response: any) => {
          console.log('Response: ', response);
          if(response.data.length > 0){
            if(isApproved){
              this.tableList = response.data;
            }
            else{
              this.tableMerchant = response.data;
              this.allDataMerchant = response.totalElements;
            }
          }
          else{
            if(isApproved){
              this.errorMsgList = 'No Data Found!'
              this.tableList = [];
            }
            else{
              this.errorMsgMerchant = 'No Data Found!'
              this.tableMerchant = [];
            }
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
    console.log('Search :', key);
    this.keySearch = key;
    this.pageList = 0;
    this.ngOnInit();
  }

  async onListItemClick(e:any){
    console.log('OnList:', e);
    let data = await this.setDataMerchant(e);
    console.log('Data Merchant:', data);
  }

  onLoadData(type:any, e:any){
    console.log("Onload Page Index: ", e);
    if(type == 'admin'){
      this.pageList = e;
    }
    else{
      this.pageMerchant = e;
    }
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
