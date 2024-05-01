import { Component, ViewChild } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { BillingAddComponent } from '../billing-add/billing-add.component';
import { Billing } from '../billing.interface';
import { Column } from 'src/app/shared/component/table/table.component';
import { BillingService } from '../service/billing.service';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-billing-all',
  templateUrl: './billing-all.component.html',
  styleUrls: ['./billing-all.component.css']
})
export class BillingAllComponent {
  user = this.appService.retrieveUser();

  tableRequest: any;
  allDataRequest: any;
  errorMsgRequest?: string;
  keySearch: string = '';
  page = 0;
  colRequest: Column[] = [];
  dataRequest: Billing = {};

  @ViewChild('closeModalNew') modalCloseNew: any;
  @ViewChild('closeModalDetail') modalCloseDetail: any;
  @ViewChild(BillingAddComponent) paymentAdd!: BillingAddComponent;

  constructor(private billingService: BillingService, private apps: AppComponent, private appService: AppService){}

  async ngOnInit() {
    this.apps.loadingPage(true);
    this.errorMsgRequest = '';
    if(this.user.role=='Management'){
      this.colRequest = [{name: 'receiptId', displayName: 'Receipt ID'}, {name: 'billingCategory', displayName: 'Category'}, {name: 'billingDate', displayName: 'Billing Date'}, {name: 'residentUnit', displayName:'Unit'}, {name: 'residentName', displayName: 'Resident'}, {name: 'dueDate', displayName: 'Due Date'}, {name: 'status', displayName: 'Status'}, {name:"ActionCol", displayName:"Action", align:"center"}];
      if(this.keySearch=='' || this.keySearch==null || this.keySearch==undefined){
        await this.getBillingDetailApartment(this.user.id, 10, this.page);
      }
      else{
        await this.searchBillingDetailApartment(this.user.id, 10, this.page, this.keySearch);
      }
    }
    else {
      window.location.replace('');
    }
    this.apps.loadingPage(false);
  }

  getBillingDetailApartment(apartmentId: any, size:number, page: number): Promise<any>{
    return new Promise<any>(resolve => 
      this.billingService.getBillingDetailApartment(apartmentId, size, page).subscribe({
        next: async (response: any) => {
          console.log('Response: ', response);
          if(response.data.length > 0){
            this.tableRequest = response.data;
            this.allDataRequest = response.totalElements;
          }
          else{
            this.tableRequest = null;
            this.errorMsgRequest = 'No Data Found!'
          }
          resolve(true);
        },
        error: (error: any) => {
          console.log('#error', error);
          this.errorMsgRequest = 'No Data Found!'
          this.tableRequest = null;
          resolve(error);
        }
      }))
    }
    
    searchBillingDetailApartment(apartmentId: any, size:number, page: number, search:any): Promise<any>{
      return new Promise<any>(resolve => 
        this.billingService.searchBillingDetailApartment(apartmentId, size, page, search).subscribe({
          next: async (response: any) => {
            console.log('Response: ', response);
            if(response.data.length > 0){
              this.tableRequest = response.data;
              this.allDataRequest = response.totalElements;
            }
            else{
              this.tableRequest = null;
              this.errorMsgRequest = 'No Data Found!'
            }
            resolve(true);
          },
          error: (error: any) => {
            console.log('#error', error);
            this.errorMsgRequest = 'No Data Found!'
            this.tableRequest = null;
            resolve(error);
          }
      }))
  }

  onSearchData(key:any){
    this.keySearch = key;
    this.page = 0;
    this.ngOnInit();
  }

  async onListItemClick(e:any){
    console.log('OnList:', e);
    let data = await this.setDataRequest(e);
    console.log('Data Request:', data);
  }

  setDataRequest(response: any): Promise<any>{
    return new Promise<any> (resolve => {
      this.dataRequest['id'] = response.id;
      this.dataRequest['residentId'] = response.residentId;
      this.dataRequest['residentUnit'] = response.residentUnit;
      this.dataRequest['residentName'] = response.residentName;
      this.dataRequest['billingId'] = response.billingId;
      this.dataRequest['billingCategory'] = response.billingCategory;
      this.dataRequest['status'] = response.status;
      this.dataRequest['amount'] = response.amount;
      this.dataRequest['billingDate'] = response.billingDate;
      this.dataRequest['dueDate'] = response.dueDate;
      this.dataRequest['completedDate'] = response.completedDate;
      this.dataRequest['cancelledDate'] = response.cancelledDate;
      this.dataRequest['payment'] = response.payment;
      resolve(this.dataRequest);
    });
  }

  onLoadData(e:any){
    console.log("Onload Page Index: ", e);
    this.page = e;
    this.getBillingDetailApartment(this.user.id, 10, this.page);
  }
  
  redirect(type: string){
    if(type=='detail'){
      this.modalCloseDetail.nativeElement.click();
    }
    else if(type=='new'){
      this.modalCloseNew.nativeElement.click();
    }
    
    this.ngOnInit();
  }

  onAddPayment(){
    this.paymentAdd.ngOnInit();
  }

  backButton(){
    window.location.replace('payment');
  }
}
