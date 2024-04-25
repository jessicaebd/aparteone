import { Mailbox, MailboxCategory } from './mailbox.interface';
import { Component, ViewChild } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { MailboxService } from './service/mailbox.service';
import { Location } from '@angular/common';
import { Column } from 'src/app/shared/component/table/table.component';
import { MailboxAddComponent } from './mailbox-add/mailbox-add.component';

@Component({
  selector: 'app-mailbox',
  templateUrl: './mailbox.component.html',
  styleUrls: ['./mailbox.component.css']
})
export class MailboxComponent {
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
  colCategory: Column[] = [];
  dataCategory: MailboxCategory = {};
  
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
  colRequest: Column[] = [];
  dataRequest: Mailbox = {};
  
  @ViewChild('closeModalAdd') modalCloseAdd: any;
  @ViewChild('closeModalUpdate') modalCloseUpdate: any;
  @ViewChild('closeModalNew') modalCloseNew: any;
  @ViewChild('closeModalDetail') modalCloseDetail: any;
  @ViewChild(MailboxAddComponent) mailboxAdd!: MailboxAddComponent;

  constructor(private location: Location, private mailboxService: MailboxService, private apps: AppComponent){}

  async ngOnInit() {
    this.apps.loadingPage(true);
    this.errorListRequest = '';
    this.errorMsgCategory = '';
    this.errorMsgRequest = '';
    this.role = this.apps.getUserRole();
    if(this.role=='management'){
      this.colRequest = [{name: 'receiptId', displayName: 'Receipt ID'}, {name: 'mailboxCategory', displayName: 'Category'}, {name: 'residentUnit', displayName: 'Unit'}, {name: 'residentName', displayName:'Recipient'}, {name: 'receivedDate', displayName: 'Received Date'}, {name: 'status', displayName: 'Status'}, {name:"ActionCol", displayName:"Action", align:"center"}];
      this.colCategory = [{name: 'category', displayName: 'Mailbox Category'}, {name: 'isActive', displayName: 'Status'}, {name:"ActionCol", displayName:"Action", align:"center"}];
      
      await this.getMailboxCategory(this.apartmentId, this.sizeCategory, this.pageCategory);
      await this.getMailboxDetailApartment(this.apartmentId, 5, this.pageRequest);
    }
    else if (this.role=='resident'){
      if(this.keySearch=='' || this.keySearch==null || this.keySearch==undefined){
        await this.getMailboxDetailResident(this.residentId, this.sizeRequest, this.pageList, this.filter);
      }
      else{
        await this.searchMailboxDetailResident(this.residentId, this.sizeRequest, this.pageList, this.keySearch);
      }
    }
    this.apps.loadingPage(false);
  }

  getMailboxCategory(apartementId:any, size:any, page:any): Promise<any>{
    return new Promise<any>(resolve => 
      this.mailboxService.getMailboxCategory(apartementId, size, page).subscribe({
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
          this.tableCategory = null;
          resolve(error);
        }
      }))
  }

  getMailboxDetailApartment(apartmentId: any, size:number, page: number): Promise<any>{
    return new Promise<any>(resolve => 
      this.mailboxService.getMailboxDetailApartment(apartmentId, size, page).subscribe({
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

  getMailboxDetailResident(residentId: any, size:number, page: number, status: any): Promise<any>{
    return new Promise<any>(resolve => 
      this.mailboxService.getMailboxDetailResident(residentId, size, page, status).subscribe({
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
          resolve(error);
        }
      }))
  }

  searchMailboxDetailResident(residentId: any, size:number, page: number, search: any): Promise<any>{
    return new Promise<any>(resolve => 
      this.mailboxService.searchMailboxDetailResident(residentId, size, page, search).subscribe({
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
          resolve(error);
        }
      }))
  }

  onSearchData(){
    this.pageList = 0;
    this.ngOnInit();
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
      this.dataRequest['residentName'] = response.residentName;
      this.dataRequest['residentUnit'] = response.residentUnit;
      this.dataRequest['mailboxId'] = response.mailboxId;
      this.dataRequest['mailboxCategory'] = response.mailboxCategory;
      this.dataRequest['description'] = response.description;
      this.dataRequest['status'] = response.status;
      this.dataRequest['receivedDate'] = response.receivedDate;
      this.dataRequest['completedDate'] = response.completedDate;
      resolve(this.dataRequest);
    });
  }

  onLoadData(type:any, e:any){
    console.log("Onload Page Index: ", e);
    if(type=='category'){
      this.pageCategory = e;
      // this.getMailboxCategory(this.apartmentId, this.sizeCategory, this.pageCategory, this.sortCatCol, this.sortCatDir);
    }
    else if(type=='request'){
      this.pageRequest = e;
      // this.getMailboxDetailApartment(this.apartmentId, 5, this.pageRequest, this.sortReqCol, this.sortReqDir);
    }
    else if(type=='listRequest'){
      this.pageList = e;
      // this.getMailboxDetailResident(this.residentId, this.sizeRequest, this.pageList, this.filter);
    }
    this.ngOnInit();
  }

  // async onSortData(type:any, e:any){
  //   console.log("OnSort: ", e);
  //   let arr = await this.onSplitSortEvent(type, e);
  //   console.log(arr);
  //   if(type=='category'){
  //     this.pageCategory = 0;
  //   }
  //   else if(type=='request'){
  //     this.pageRequest = 0;
  //     // this.getMailboxDetailApartment(this.apartmentId, 10, this.pageRequest, this.sortReqCol, this.sortReqDir);
  //   }
  //   this.ngOnInit();
  // }

  // onSplitSortEvent(type:any, e:any): Promise<any>{
  //   return new Promise<any> (resolve => {
  //     let arr = e.split(";", 2); 
  //     if(type=='category'){
  //       this.sortCatCol = arr[0];
  //       this.sortCatDir = arr[1];
  //     }
  //     else if(type=='request'){
  //       this.sortReqCol = arr[0];
  //       this.sortReqDir = arr[1];
  //     }
  //     resolve(arr);
  //   });
  // }

  onFilterBy(e:any){
    this.filter = e;
    this.pageList = 0;
    this.keySearch = '';
    this.ngOnInit();
  }
  
  redirect(type: string){
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

  onAddMailbox(){
    this.mailboxAdd.ngOnInit();
  }

  goToAllMailboxPage(){
    window.location.replace('/mailbox/all');
  }

  backButton(){
    this.location.back();
  }
}
