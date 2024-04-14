import { Component, OnInit, ViewChild } from '@angular/core';
import { Column } from 'src/app/shared/component/table/table.component';
import { PaymentService } from './service/payment.service';
import { AppComponent } from 'src/app/app.component';
import { Location } from '@angular/common';
import { PaymentCategory } from './payment.interface';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit{
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
  dataCategory: PaymentCategory = {};
  // dataRequest: MaintenanceRequest = {};
  
  @ViewChild('closeModalAdd') modalCloseAdd: any;
  @ViewChild('closeModalUpdate') modalCloseUpdate: any;
  @ViewChild('closeModalAssign') modalCloseAssign: any;

  constructor(private location: Location, private paymentService: PaymentService, private apps: AppComponent){}

  ngOnInit() {
    this.apps.loadingPage(true);
    this.errorListCategory = '';
    this.errorListRequest = '';
    this.errorMsgCategory = '';
    this.errorMsgRequest = '';
    this.role = this.apps.getUserRole();
    if(this.role=='management'){
      this.colRequest = [{name: 'payment_category', displayName: 'Category'}, {name: 'request_date', displayName: 'Request Date'}, {name: 'residentId', displayName:'Requested By'}, {name: 'assigned_to', displayName: 'Assign To'}, {name: 'status', displayName: 'Status'}, {name:"ActionCol", displayName:"Action", align:"center"}];
      this.colCategory = [{name: 'category', displayName: 'Billing Category'}, {name: 'isActive', displayName: 'Status'}, {name:"ActionCol", displayName:"Action", align:"center"}];
      
      this.getPaymentCategory(1, '');
      // this.getMaintenanceAllRequest(1, 10, 0, this.sortReqCol, this.sortReqCol);
    }
    else if (this.role=='resident'){
      // this.getPaymentCategory(1, 1000, 0, this.sortCatCol, this.sortCatDir);
      // this.getMaintenanceResidentRequest(4, 3, 0, this.sortReqCol, this.sortReqDir, null);
    }
    this.apps.loadingPage(false);
  }

  getPaymentCategory(apartementId:any, isActive:any): Promise<any>{
    return new Promise<any>(resolve => 
      this.paymentService.getPaymentCategory(apartementId, isActive).subscribe({
        next: async (response: any) => {
          console.log('Response: ', response);
          if(response.length > 0){
            this.tableCategory = response;
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
      this.dataCategory['Apartment ID'] = response.apartment_id;
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

  backButton(){
    this.location.back();
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
    else if(type=='assign'){
      this.modalCloseAssign.nativeElement.click();
    }
    
    this.ngOnInit();
  }

  onHistoryClick(){
    window.location.replace('/payment/history');
  }

  onAllRequest(){
    window.location.replace('/payment/list');
  }
}
