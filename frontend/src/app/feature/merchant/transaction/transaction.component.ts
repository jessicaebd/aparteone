import { Component, ViewChild } from '@angular/core';
import { MerchantService } from '../service/merchant.service';
import { AppComponent } from 'src/app/app.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent {
  residentId = 4;
  merchantId = 9;
  role: string = 'resident';
  filter: string = '';
  
  listTransaction!: any;
  errorListRequest: string = "";
  allListRequest: any;
  keySearch: string = '';
  pageList = 0;
  sizeRequest = 5;
  tableRequest: any;
  allDataRequest: any;
  errorMsgRequest: string = '';
  pageRequest = 0;
  // colRequest: Column[] = [];
  // dataRequest: Mailbox = {};
  
  @ViewChild('closeModalDetail') modalCloseDetail: any;

  constructor(private location: Location, private merchantService: MerchantService, private apps: AppComponent){}

  async ngOnInit() {
    this.apps.loadingPage(true);
    this.errorListRequest = '';
    this.errorMsgRequest = '';
    this.role = this.apps.getUserRole();
    if(this.role=='management'){
      // this.colRequest = [{name: 'receiptId', displayName: 'Receipt ID'}, {name: 'mailboxCategory', displayName: 'Category'}, {name: 'residentUnit', displayName: 'Unit'}, {name: 'residentName', displayName:'Recipient'}, {name: 'receivedDate', displayName: 'Received Date'}, {name: 'status', displayName: 'Status'}, {name:"ActionCol", displayName:"Action", align:"center"}];
      
      // await this.getMailboxCategory(this.apartmentId, this.sizeCategory, this.pageCategory);
      // await this.getMailboxDetailApartment(this.apartmentId, 5, this.pageRequest);
    }
    else if (this.role=='resident'){
      if(this.keySearch=='' || this.keySearch==null || this.keySearch==undefined){
        await this.getTransactionResident(this.residentId, this.sizeRequest, this.pageList, this.filter);
      }
      else{
        // await this.searchMailboxDetailResident(this.residentId, this.sizeRequest, this.pageList, this.keySearch);
      }
    }
    this.apps.loadingPage(false);
  }

  getTransactionResident(residentId: any, size:number, page: number, status: any): Promise<any>{
    return new Promise<any>(resolve => 
      this.merchantService.getTransactionResident(residentId, size, page, status).subscribe({
        next: async (response: any) => {
          console.log('Response: ', response);
          if(response.data.length > 0){
            this.listTransaction = response.data;
            this.allListRequest = response.totalElements;
          }
          else{
            this.errorListRequest = 'No Data Found!'
          }
          resolve(true);
        },
        error: (error: any) => {
          console.log('#error', error);
          this.errorListRequest = 'No Data Found!'
          resolve(error);
        }
      }))
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
      this.pageRequest = e;
      // this.getMailboxDetailApartment(this.apartmentId, 5, this.pageRequest, this.sortReqCol, this.sortReqDir);
    }
    else if(type=='listRequest'){
      this.pageList = e;
      // this.getMailboxDetailResident(this.residentId, this.sizeRequest, this.pageList, this.filter);
    }
    this.ngOnInit();
  }

  onSearchData(){
    this.pageList = 0;
    this.ngOnInit();
  }

  backButton(){
    if(this.role=='merchant'){
      this.location.back();
    }
    else{
      window.location.replace('/merchant');
    }
  }
}
