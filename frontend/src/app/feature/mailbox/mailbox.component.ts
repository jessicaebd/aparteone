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
  role: string = 'resident';
  apartmentId = 1;
  residentId = 4;

  filter: string = '';
  listRequest!: any;
  allListRequest: any;
  pageList = 0;
  errorListRequest: string = "";
  tableCategory: any;
  tableRequest: any;
  allDataCategory: any;
  allDataRequest: any;
  pageRequest = 0;
  errorMsgCategory?: string;
  errorMsgRequest?: string;
  sortReqCol?: string = 'id';
  sortReqDir?: string = 'DESC';
  sortCatCol?: string = 'id';
  sortCatDir?: string = 'ASC';
  colCategory: Column[] = [];
  colRequest: Column[] = [];
  dataCategory: MailboxCategory = {};
  dataRequest: Mailbox = {};
  
  @ViewChild('closeModalAdd') modalCloseAdd: any;
  @ViewChild('closeModalUpdate') modalCloseUpdate: any;
  @ViewChild('closeModalNew') modalCloseNew: any;
  @ViewChild('closeModalDetail') modalCloseDetail: any;
  @ViewChild(MailboxAddComponent) mailboxAdd!: MailboxAddComponent;

  constructor(private location: Location, private mailboxService: MailboxService, private apps: AppComponent){}

  ngOnInit() {
    this.apps.loadingPage(true);
    this.errorListRequest = '';
    this.errorMsgCategory = '';
    this.errorMsgRequest = '';
    this.role = this.apps.getUserRole();
    if(this.role=='management'){
      this.colRequest = [{name: 'mailbox_category', displayName: 'Category'}, {name: 'resident_unit', displayName: 'Unit'}, {name: 'resident_name', displayName:'Recipient'}, {name: 'received_date', displayName: 'Received Date'}, {name: 'status', displayName: 'Status'}, {name:"ActionCol", displayName:"Action", align:"center"}];
      this.colCategory = [{name: 'category', displayName: 'Mailbox Category'}, {name: 'isActive', displayName: 'Status'}, {name:"ActionCol", displayName:"Action", align:"center"}];
      
      this.getMailboxCategory(1, '');
      this.getMailboxDetailApartment(this.apartmentId, 5, this.pageRequest, this.sortReqCol, this.sortReqCol);
    }
    else if (this.role=='resident'){
      this.getMailboxDetailResident(this.residentId, 3, this.pageList, this.filter);
    }
    this.apps.loadingPage(false);
  }

  getMailboxCategory(apartementId:any, isActive:any): Promise<any>{
    return new Promise<any>(resolve => 
      this.mailboxService.getMailboxCategory(apartementId, isActive).subscribe({
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

  getMailboxDetailApartment(apartmentId: any, size:number, page: number, sortBy: any, sortDir: any): Promise<any>{
    return new Promise<any>(resolve => 
      this.mailboxService.getMailboxDetailApartment(apartmentId, size, page, sortBy, sortDir).subscribe({
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
      this.dataCategory['ID'] = response.id;
      this.dataCategory['Apartment ID'] = response.apartmentId;
      this.dataCategory['Category Name'] = response.category;
      this.dataCategory['Status'] = response.isActive==true? 'Active': 'In-Active';
      resolve(this.dataCategory);
    });
  }

  setDataRequest(response: any): Promise<any>{
    return new Promise<any> (resolve => {
      this.dataRequest['ID'] = response.id;
      this.dataRequest['Resident Name'] = response.resident_name;
      this.dataRequest['Resident ID'] = response.resident_id;
      this.dataRequest['Resident Unit'] = response.resident_unit;
      this.dataRequest['Mailbox ID'] = response.mailbox_id;
      this.dataRequest['Mailbox Category'] = response.mailbox_category;
      this.dataRequest['Mailbox Desc'] = response.description;
      this.dataRequest['Status'] = response.status;
      this.dataRequest['Received Date'] = response.received_date;
      this.dataRequest['Completed Date'] = response.completed_date;
      resolve(this.dataRequest);
    });
  }

  onLoadData(type:any, e:any){
    console.log("Onload Page Index: ", e);
    if(type=='request'){
      this.pageRequest = e;
      this.getMailboxDetailApartment(this.apartmentId, 5, this.pageRequest, this.sortReqCol, this.sortReqDir);
    }
    else if(type=='listRequest'){
      this.pageList = 0;
      this.getMailboxDetailResident(this.residentId, 10, this.pageList, this.filter);
    }
  }

  async onSortData(type:any, e:any){
    console.log("OnSort: ", e);
    let arr = await this.onSplitSortEvent(type, e);
    console.log(arr);
    if(type=='category'){
      // this.getMaintenanceAllCategory(1, 10, 0, this.sortCatCol, this.sortCatDir);
    }
    else if(type=='request'){
      this.pageRequest = 0;
      this.getMailboxDetailApartment(this.apartmentId, 10, this.pageRequest, this.sortReqCol, this.sortReqDir);
    }
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

  onFilterBy(e:any){
    this.filter = e;
    this.pageList = 0;
    this.ngOnInit();
  }
  
  onCloseModal(type: string){
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

  onHistoryClick(){
    window.location.replace('/mailbox/history');
  }

  onAllMailbox(){
    window.location.replace('/mailbox/all');
  }

  backButton(){
    this.location.back();
  }
}
