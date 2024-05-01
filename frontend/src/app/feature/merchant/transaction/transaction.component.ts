import { Component, ViewChild } from '@angular/core';
import { MerchantService } from '../service/merchant.service';
import { AppComponent } from 'src/app/app.component';
import { Location } from '@angular/common';
import { Column } from 'src/app/shared/component/table/table.component';
import { Transaction } from '../merchant.interface';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent {
  user = this.appService.retrieveUser();

  filter: string = '';
  listTransaction!: any;
  errorListTransaction: string = "";
  allListTransaction: any;
  keySearch: string = '';
  pageList = 0;
  sizeList = 5;
  tableTransaction: any;
  allDataTransaction: any;
  errorMsgTransaction: string = '';
  pageTransaction = 0;
  sizeTransaction = 10;
  colTransaction: Column[] = [];
  dataTransaction: Transaction = {};
  
  @ViewChild('closeModalDetail') modalCloseDetail: any;

  constructor(private location: Location, private merchantService: MerchantService, private apps: AppComponent, private appService: AppService){}

  async ngOnInit() {
    this.apps.loadingPage(true);
    this.errorListTransaction = '';
    this.errorMsgTransaction = '';
    if(this.user.role=='Merchant'){
      this.colTransaction = [{name: 'residentUnit', displayName: 'Unit'}, {name: 'residentName', displayName:'Recipient'}, {name: 'transactionDate', displayName: 'Transaction Date'},  {name: 'grandTotal', displayName: 'Grand Total'}, {name: 'status', displayName: 'Status'}, {name:"ActionCol", displayName:"Action", align:"center"}];
      await this.getTransactionMerchant(this.user.id, this.sizeTransaction, this.pageTransaction);
    }
    else if (this.user.role=='Resident'){
      await this.getTransactionResident(this.user.id, this.sizeList, this.pageList, this.filter);
    }
    else {
      window.location.replace('');
    }
    this.apps.loadingPage(false);
  }

  getTransactionMerchant(merchantId: any, size:number, page: number): Promise<any>{
    return new Promise<any>(resolve => 
      this.merchantService.getTransactionMerchant(merchantId, size, page).subscribe({
        next: async (response: any) => {
          console.log('Response: ', response);
          if(response.data.length > 0){
            this.tableTransaction = response.data;
            this.allDataTransaction = response.totalElements;
          }
          else{
            this.errorMsgTransaction = 'No Data Found!'
          }
          resolve(true);
        },
        error: (error: any) => {
          console.log('#error', error);
          this.errorMsgTransaction = 'No Data Found!'
          resolve(error);
        }
      }))
  }

  getTransactionResident(residentId: any, size:number, page: number, status: any): Promise<any>{
    return new Promise<any>(resolve => 
      this.merchantService.getTransactionResident(residentId, size, page, status).subscribe({
        next: async (response: any) => {
          console.log('Response: ', response);
          if(response.data.length > 0){
            this.listTransaction = response.data;
            this.allListTransaction = response.totalElements;
          }
          else{
            this.errorListTransaction = 'No Data Found!'
          }
          resolve(true);
        },
        error: (error: any) => {
          console.log('#error', error);
          this.errorListTransaction = 'No Data Found!'
          resolve(error);
        }
      }))
  }

  redirect(){
    this.modalCloseDetail.nativeElement.click();
    this.ngOnInit();
  }

  onFilterBy(e:any){
    this.filter = e;
    this.pageList = 0;
    this.keySearch = '';
    this.ngOnInit();
  }

  onLoadData(type:any, e:any){
    console.log("Onload Page Index: ", e);
    if(type=='request'){
      this.pageList = e;
    }
    else if(type=='merchant'){
      this.pageTransaction = e;
    }
    this.ngOnInit();
  }

  backButton(){
    if(this.user.role=='Merchant'){
      this.location.back();
    }
    else{
      window.location.replace('/merchant');
    }
  }
}