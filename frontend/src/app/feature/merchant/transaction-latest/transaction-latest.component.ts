import { Component, ViewChild } from '@angular/core';
import { MerchantService } from '../service/merchant.service';
import { AppComponent } from 'src/app/app.component';
import { AppService } from 'src/app/app.service';
import { Transaction } from '../merchant.interface';

@Component({
  selector: 'app-transaction-latest',
  templateUrl: './transaction-latest.component.html',
  styleUrls: ['./transaction-latest.component.css']
})
export class TransactionLatestComponent {
  user = this.appService.retrieveUser();

  listTransaction: any;
  allDataCount: any;
  errorMsg: string = '';
  pageSize: number = 3;
  pageIndex: number = 0;
  dataTransaction: Transaction = {};  
  
  @ViewChild('closeModalTransaction') modalCloseTransaction: any;

  constructor(private merchantService: MerchantService, private apps: AppComponent, private appService: AppService){}

  async ngOnInit() {
    this.apps.loadingPage(true);
    this.errorMsg = '';
    if(this.user.role=='Merchant'){
      await this.getTransactionMerchant(this.user.id, this.pageSize, this.pageIndex);
    }
    else {
      window.location.replace('');
    }
    this.apps.loadingPage(false);
  }

  onClickPageIndex(e:any){
    this.pageIndex = e.pageIndex;
    this.ngOnInit();
  }

  getTransactionMerchant(merchantId:any, size:any, page:any): Promise<any>{
    return new Promise<any>(resolve => 
      this.merchantService.getTransactionMerchant(merchantId, size, page, 'Waiting for Confirmation').subscribe({
        next: async (response: any) => {
          console.log('Response: ', response);
          if(response.data.length > 0){
            this.listTransaction = response.data;
            this.allDataCount = response.totalElements;
          }
          else{
            this.errorMsg = 'No Data Found!'
          }
          resolve(true);
        },
        error: (error: any) => {
          console.log('#error', error);
          this.listTransaction = null;
          this.errorMsg = 'No Data Found!';
          resolve(error);
        }
      }))
  }

  setdataTransaction(response: any): Promise<any>{
    return new Promise<any> (resolve => {
      this.dataTransaction['id'] = response.id;
      this.dataTransaction['residentId'] = response.residentId;
      this.dataTransaction['residentName'] = response.residentName;
      this.dataTransaction['residentUnit'] = response.residentUnit;
      this.dataTransaction['merchantId'] = response.merchantId;
      this.dataTransaction['merchantName'] = response.merchantName;
      this.dataTransaction['merchantCategory'] = response.merchantCategory;
      this.dataTransaction['grandTotal'] = response.grandTotal;
      this.dataTransaction['status'] = response.status;
      this.dataTransaction['transactionDate'] = response.transactionDate;
      this.dataTransaction['deliveredDate'] = response.deliveredDate;
      this.dataTransaction['completedDate'] = response.completedDate;
      this.dataTransaction['cancelledDate'] = response.cancelledDate;
      this.dataTransaction['details'] = response.details;
      this.dataTransaction['payment'] = response.payment;
      resolve(this.dataTransaction);
    });
  }
  
  async onListItemClick(e:any){
    await this.setdataTransaction(e);
  }

  redirect(){
    this.modalCloseTransaction.nativeElement.click();
    this.ngOnInit();
  }
}
