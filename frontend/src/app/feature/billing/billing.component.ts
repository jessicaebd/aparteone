import { Component, OnInit, ViewChild } from '@angular/core';
import { Column } from 'src/app/shared/component/table/table.component';
import { BillingService } from './service/billing.service';
import { AppComponent } from 'src/app/app.component';
import { Location } from '@angular/common';
import { Billing, BillingCategory, PaymentProof } from './billing.interface';
import { BillingAddComponent } from './billing-add/billing-add.component';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent implements OnInit{
  apartmentId = 1;
  residentId = 4;
  role: string = 'resident';
  filter: string = '';

  listCategory!: any;
  errorListCategory: string = '';
  tableCategory: any;
  allDataCategory: any;
  errorMsgCategory: string = '';
  pageCategory: number = 0;
  sizeCategory: number = 5;
  sortCatCol?: string = 'id';
  sortCatDir?: string = 'ASC';
  colCategory: Column[] = [];
  dataCategory: BillingCategory = {};
  
  listRequest!: any;
  errorListRequest: string = "";
  allListRequest: any;
  keySearch: string = '';
  pageList = 0;
  sizeRequest = 5;
  tableRequest: any;
  allDataRequest: any;
  errorMsgRequest: string = '';
  pageRequest = 0;
  sortReqCol?: string = 'id';
  sortReqDir?: string = 'DESC';
  colRequest: Column[] = [];
  dataRequest: Billing = {};
  
  @ViewChild('closeModalAdd') modalCloseAdd: any;
  @ViewChild('closeModalUpdate') modalCloseUpdate: any;
  @ViewChild('closeModalNew') modalCloseNew: any;
  @ViewChild('closeModalDetail') modalCloseDetail: any;
  @ViewChild(BillingAddComponent) billingAdd!: BillingAddComponent;

  constructor(private location: Location, private billingService: BillingService, private apps: AppComponent){}

  async ngOnInit() {
    this.apps.loadingPage(true);
    this.errorListRequest = '';
    this.errorMsgCategory = '';
    this.errorMsgRequest = '';
    this.role = this.apps.getUserRole();
    if(this.role=='management'){
      this.colRequest = [{name: 'receiptId', displayName: 'Receipt ID'}, {name: 'billingCategory', displayName: 'Category'}, {name: 'billingDate', displayName: 'Billing Date'}, {name: 'residentUnit', displayName:'Unit'}, {name: 'residentName', displayName: 'Resident'}, {name: 'dueDate', displayName: 'Due Date'}, {name: 'status', displayName: 'Status'}, {name:"ActionCol", displayName:"Action", align:"center"}];
      this.colCategory = [{name: 'category', displayName: 'Billing Category'}, {name: 'isActive', displayName: 'Status'}, {name:"ActionCol", displayName:"Action", align:"center"}];
      
      await this.getBillingCategory(this.apartmentId, this.sizeCategory, this.pageCategory, this.sortCatCol, this.sortCatDir);
      await this.getBillingDetailApartment(this.apartmentId, 3, 0);
    }
    else if (this.role=='resident'){
      if(this.keySearch=='' || this.keySearch==null || this.keySearch==undefined){
        await this.getBillingDetailResident(this.residentId, this.sizeRequest, this.pageList, this.filter);
      }
      else{
        await this.searchBillingDetailResident(this.residentId, this.sizeRequest, this.pageList, this.keySearch);
      }
    }
    this.apps.loadingPage(false);
  }

  getBillingCategory(apartementId:any, size:any, page:any, sortBy: any, sortDir:any): Promise<any>{
    return new Promise<any>(resolve => 
      this.billingService.getBillingCategory(apartementId, size, page, sortBy, sortDir).subscribe({
        next: async (response: any) => {
          console.log('Response: ', response);
          if(response.data.length > 0){
            this.tableCategory = response.data;
            this.allDataCategory = response.totalElements;
          }
          else{
            this.errorMsgCategory = 'No Data Found!'
          }
          resolve(true);
        },
        error: (error: any) => {
          console.log('#error', error);
          this.errorMsgCategory = 'No Data Found!'
          resolve(error);
        }
      }))
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

  getBillingDetailResident(apartmentId: any, size:number, page: number, status: any): Promise<any>{
    return new Promise<any>(resolve => 
      this.billingService.getBillingDetailResident(apartmentId, size, page, status).subscribe({
        next: async (response: any) => {
          console.log('Response: ', response);
          if(response.data.length > 0){
            this.listRequest = response.data;
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
          this.listRequest = null;
          resolve(error);
        }
      }))
  }

  searchBillingDetailResident(apartmentId: any, size:number, page: number, search: any): Promise<any>{
    return new Promise<any>(resolve => 
      this.billingService.searchBillingDetailResident(apartmentId, size, page, search).subscribe({
        next: async (response: any) => {
          console.log('Response: ', response);
          if(response.data.length > 0){
            this.listRequest = response.data;
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
          this.listRequest = null;
          resolve(error);
        }
      }))
  }

  async onListItemClick(type: string, e:any){
    console.log('OnList:', e);
    if(type=='request'){
      let data = await this.setDataRequest(e);
      console.log('Data Request:', data);
    }
    else if(type=='category'){
      let data = await this.setDetailCategory(e);
      console.log('Category:', data);
    }
  }

  onSearchData(){
    this.pageList = 0;
    this.ngOnInit();
  }

  onAddPayment(){
    this.billingAdd.ngOnInit();
  }

  setDetailCategory (response: any): Promise<any>{
    return new Promise<any> (resolve => {
      this.dataCategory['id'] = response.id;
      this.dataCategory['apartmentId'] = response.apartmentId;
      this.dataCategory['category'] = response.category;
      this.dataCategory['isActive'] = response.isActive;
      resolve(this.dataCategory);
    });
  }

  setDataRequest(response: any): Promise<any>{
    return new Promise<any> (resolve => {
      this.dataRequest['id'] = response.id;
      this.dataRequest['receiptId'] = response.receiptId;
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

  onListSubmitEvent(){
    this.filter = '';
    this.keySearch = '';
    this.pageList = 0;
    this.ngOnInit();
  }

  onLoadData(type:any, e:any){
    console.log("Onload Page Index: ", e);
    if(type=='category'){
      this.pageCategory = e;
      // this.getMaintenanceAllCategory(1, 10, e, this.sortCatCol, this.sortCatDir);
    }
    else if(type=='request'){
      // this.getMaintenanceAllRequest(1, 10, e, this.sortReqCol, this.sortReqDir);
    }
    else if(type=='listRequest'){
      this.pageList = e;
    }
    this.ngOnInit();
  }

  async onSortData(type:any, e:any){
    console.log("OnSort: ", e);
    let arr = await this.onSplitSortEvent(type, e);
    console.log(arr);
    if(type=='category'){
      this.pageCategory = 0;
      // this.getMaintenanceAllCategory(1, 10, 0, this.sortCatCol, this.sortCatDir);
    }
    else if(type=='request'){
      // this.getMaintenanceAllRequest(1, 10, 0, this.sortReqCol, this.sortReqDir);
    }
    this.ngOnInit();
  }

  onSplitSortEvent(type:any, e:any): Promise<any>{
    return new Promise<any> (resolve => {
      let arr = e.split(";", 2); 
      if(type=='category'){
        this.sortCatCol = arr[0];
        this.sortCatDir = arr[1];
      }
      else if(type=='request'){
        this.sortReqCol = arr[0];
        this.sortReqDir = arr[1];
      }
      resolve(arr);
    });
  }

  backButton(){
    this.location.back();
  }

  onFilterBy(e:any){
    this.filter = e;
    this.pageList = 0;
    this.keySearch = '';
    this.ngOnInit();
  }
  
  redirect(type: string){
    console.log(type);
    if(type=='add'){
      this.modalCloseAdd.nativeElement.click();
    }
    else if(type=='update'){
      this.modalCloseUpdate.nativeElement.click();
    }
    else if(type=='detail'){
      this.modalCloseDetail.nativeElement.click();
    }
    else if(type=='new'){
      this.modalCloseNew.nativeElement.click();
    }
    
    this.ngOnInit();
  }

  goToAllPaymentPage(){
    window.location.replace('/payment/all');
  }
}
