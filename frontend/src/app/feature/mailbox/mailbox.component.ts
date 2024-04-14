import { MailboxCategory } from './mailbox.interface';
import { Component, ViewChild } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { MailboxService } from './service/mailbox.service';
import { Location } from '@angular/common';
import { Column } from 'src/app/shared/component/table/table.component';

@Component({
  selector: 'app-mailbox',
  templateUrl: './mailbox.component.html',
  styleUrls: ['./mailbox.component.css']
})
export class MailboxComponent {
  role: string = 'resident';
  filter: any = "";
  listCategory!: any;
  listRequest!: any;
  errorListCategory: string = "";
  errorListRequest: string = "";
  tableCategory: any;
  tableRequest: any;
  allDataCategory: any;
  allDataRequest: any;
  errorMsgCategory?: string;
  errorMsgRequest?: string;
  sortReqCol?: string = 'created_date';
  sortReqDir?: string = 'DESC';
  sortCatCol?: string = 'id';
  sortCatDir?: string = 'ASC';
  colCategory: Column[] = [];
  colRequest: Column[] = [];
  dataCategory: MailboxCategory = {};
  // dataRequest: MaintenanceRequest = {};
  
  @ViewChild('closeModalAdd') modalCloseAdd: any;
  @ViewChild('closeModalUpdate') modalCloseUpdate: any;
  @ViewChild('closeModalDetail') modalCloseDetail: any;

  constructor(private location: Location, private mailboxService: MailboxService, private apps: AppComponent){}

  ngOnInit() {
    this.apps.loadingPage(true);
    this.errorListCategory = '';
    this.errorListRequest = '';
    this.errorMsgCategory = '';
    this.errorMsgRequest = '';
    this.role = this.apps.getUserRole();
    if(this.role=='management'){
      this.colRequest = [{name: 'payment_category', displayName: 'Category'}, {name: 'request_date', displayName: 'Request Date'}, {name: 'residentId', displayName:'Requested By'}, {name: 'assigned_to', displayName: 'Assign To'}, {name: 'status', displayName: 'Status'}, {name:"ActionCol", displayName:"Action", align:"center"}];
      this.colCategory = [{name: 'category', displayName: 'Mailbox Category'}, {name: 'isActive', displayName: 'Status'}, {name:"ActionCol", displayName:"Action", align:"center"}];
      
      this.getMailboxCategory(1, 0, 10, '');
      // this.getMaintenanceAllRequest(1, 10, 0, this.sortReqCol, this.sortReqCol);
    }
    else if (this.role=='resident'){
      // this.getMaintenanceResidentCategory(1, 1000, 0, this.sortCatCol, this.sortCatDir);
      // this.getMaintenanceResidentRequest(4, 3, 0, this.sortReqCol, this.sortReqDir, null);
    }
    this.apps.loadingPage(false);
  }

  getMailboxCategory(apartementId:any, page:any, size:any, isActive:any): Promise<any>{
    return new Promise<any>(resolve => 
      this.mailboxService.getMailboxCategory(apartementId, page, size, isActive).subscribe({
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
      // this.dataRequest['ID'] = response.id;
      // this.dataRequest['Resident Name'] = response.resident;
      // this.dataRequest['Maintenance ID'] = response.maintenance_id;
      // this.dataRequest['Maintenance Category'] = response.maintenance_category;
      // this.dataRequest['Maintenance Detail'] = response.maintenanceDetail;
      // this.dataRequest['Status'] = response.status;
      // this.dataRequest['Request Date'] = response.request_date;
      // this.dataRequest['Assigned Name'] = response.assigned_to;
      // this.dataRequest['Assigned Date'] = response.assigned_date;
      // this.dataRequest['Completed Date'] = response.completed_date;
      // this.dataRequest['Canceled Date'] = response.cancelled_date;
      // resolve(this.dataRequest);
    });
  }

  onLoadData(type:any, e:any){
    console.log("Onload Page Index: ", e);
    if(type=='category'){
      // this.getMaintenanceAllCategory(1, 10, e, this.sortCatCol, this.sortCatDir);
    }
    else if(type=='request'){
      // this.getMaintenanceAllRequest(1, 10, e, this.sortReqCol, this.sortReqDir);
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
      // this.getMaintenanceAllRequest(1, 10, 0, this.sortReqCol, this.sortReqDir);
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
    console.log('Filter :', this.filter);
  }
  
  onCloseModal(type: string){
    if(type=='add'){
      this.modalCloseAdd.nativeElement.click();
    }
    else if(type=='update'){
      this.modalCloseUpdate.nativeElement.click();
    }
    else if(type=='request'){
      this.modalCloseDetail.nativeElement.click();
    }
    
    this.ngOnInit();
  }

  onHistoryClick(){
    window.location.replace('/mailbox/history');
  }

  onAllRequest(){
    window.location.replace('/mailbox/list');
  }

  backButton(){
    this.location.back();
  }
}
