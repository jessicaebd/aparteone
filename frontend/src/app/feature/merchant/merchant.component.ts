import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { MerchantService } from './service/merchant.service';
import { Merchant } from './merchant.interface';
import { Column } from 'src/app/shared/component/table/table.component';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-merchant',
  templateUrl: './merchant.component.html',
  styleUrls: ['./merchant.component.css']
})
export class MerchantComponent implements OnInit{
  role : string = 'management';
  apartmentId = 1;

  tableList: any;
  errorMsgList: string = '';
  colList: Column[] =[];

  tableMerchant: any;
  allDataMerchant: any;
  errorMsgMerchant: string = '';
  pageMerchant: number = 0;
  sizeMerchant: number = 5;
  colMerchant: Column[] = [];
  dataMerchant: Merchant = {};

  @ViewChild('closeModal') modalClose: any;

  constructor(private location: Location, private merchantService: MerchantService, private apps: AppComponent){}

  ngOnInit(): void {
    this.apps.loadingPage(true);
    this.errorMsgMerchant = '';
    this.errorMsgList = '';
    this.role = this.apps.getUserRole();
    if(this.role=='management'){
      this.colMerchant = [{name: 'category', displayName: 'Merchant Category'}, {name: 'name', displayName: 'Merchant Name'}, {name: 'isApproved', displayName: 'Status'}, {name:"ActionCol", displayName:"Action", align:"center"}];
      this.colList = [{name: 'category', displayName: 'Merchant Category'}, {name: 'name', displayName: 'Merchant Name'}, {name: 'isActive', displayName: 'Status'}, {name:"ActionCol", displayName:"Action", align:"center"}];
      this.getMerchantApartment(this.apartmentId, this.sizeMerchant, this.pageMerchant, false);
      this.getMerchantApartment(this.apartmentId, 5, 0, true);
    }
    else if(this.role=='resident'){
      
    }
    this.apps.loadingPage(false);
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

  async onListItemClick(type:any, e:any){
    console.log('OnList:', e);
    let data = await this.setDataMerchant(e);
    console.log('Data Request:', data);
  }

  onLoadData(e:any){
    console.log("Onload Page Index: ", e);
    this.pageMerchant = e;
    this.ngOnInit();
  }

  onCloseModal(){
    this.modalClose.nativeElement.click();
    this.ngOnInit();
  }

  onAllMerchant(){
    window.location.replace('/merchant/all');
  }

  onHistoryPage(){
    window.location.replace('/merchant/history');
  }

  backButton(){
    this.location.back();
  }
}
