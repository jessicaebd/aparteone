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
  dataCategory: PaymentCategory = {};
  
  listRequest!: any;
  errorListRequest: string = "";
  allListRequest: any;
  pageList = 0;
  tableRequest: any;
  allDataRequest: any;
  errorMsgRequest: string = '';
  pageRequest = 0;
  sortReqCol?: string = 'id';
  sortReqDir?: string = 'DESC';
  colRequest: Column[] = [];
  // dataRequest: Payment = {};
  
  @ViewChild('closeModalAdd') modalCloseAdd: any;
  @ViewChild('closeModalUpdate') modalCloseUpdate: any;
  @ViewChild('closeModalNew') modalCloseNew: any;
  @ViewChild('closeModalDetail') modalCloseDetail: any;

  constructor(private location: Location, private paymentService: PaymentService, private apps: AppComponent){}

  ngOnInit() {
    this.apps.loadingPage(true);
    this.errorListRequest = '';
    this.errorMsgCategory = '';
    this.errorMsgRequest = '';
    this.role = this.apps.getUserRole();
    if(this.role=='management'){
      this.colRequest = [{name: 'payment_category', displayName: 'Category'}, {name: 'request_date', displayName: 'Request Date'}, {name: 'residentId', displayName:'Requested By'}, {name: 'assigned_to', displayName: 'Assign To'}, {name: 'status', displayName: 'Status'}, {name:"ActionCol", displayName:"Action", align:"center"}];
      this.colCategory = [{name: 'category', displayName: 'Billing Category'}, {name: 'isActive', displayName: 'Status'}, {name:"ActionCol", displayName:"Action", align:"center"}];
      
      this.getPaymentCategory(this.apartmentId, this.sizeCategory, this.pageCategory, this.sortCatCol, this.sortCatDir);
      // this.getMaintenanceAllRequest(1, 10, 0, this.sortReqCol, this.sortReqCol);
    }
    else if (this.role=='resident'){
      // this.getPaymentCategory(1, 1000, 0, this.sortCatCol, this.sortCatDir);
      // this.getMaintenanceResidentRequest(4, 3, 0, this.sortReqCol, this.sortReqDir, null);
    }
    this.apps.loadingPage(false);
  }

  getPaymentCategory(apartementId:any, size:any, page:any, sortBy: any, sortDir:any): Promise<any>{
    return new Promise<any>(resolve => 
      this.paymentService.getPaymentCategory(apartementId, size, page, sortBy, sortDir).subscribe({
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
      this.dataCategory['Status'] = response.isActive;
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
      this.pageCategory = e;
      // this.getMaintenanceAllCategory(1, 10, e, this.sortCatCol, this.sortCatDir);
    }
    else if(type=='request'){
      // this.getMaintenanceAllRequest(1, 10, e, this.sortReqCol, this.sortReqDir);
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

  onHistoryClick(){
    window.location.replace('/payment/history');
  }

  onAllRequest(){
    window.location.replace('/payment/list');
  }
}
