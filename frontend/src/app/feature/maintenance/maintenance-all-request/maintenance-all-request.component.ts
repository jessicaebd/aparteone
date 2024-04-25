import { Component, ViewChild } from '@angular/core';
import { Column } from 'src/app/shared/component/table/table.component';
import { MaintenanceRequest } from '../maintenance.interface';
import { MaintenanceDetailRequestComponent } from '../maintenance-detail-request/maintenance-detail-request.component';
import { MaintenanceService } from '../service/maintenance.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-maintenance-all-request',
  templateUrl: './maintenance-all-request.component.html',
  styleUrls: ['./maintenance-all-request.component.css']
})
export class MaintenanceAllRequestComponent {
  apartmentId = 1;

  table: any;
  allDataCount: any;
  keySearch: string = ''
  errorMsg?: string;
  page = 0;
  size = 10;
  sortCol?: string = 'created_date';
  sortDir?: string = 'desc';
  col: Column[] = [];
  dataRequest: MaintenanceRequest = {};

  @ViewChild('closeModal') modalClose: any;
  @ViewChild(MaintenanceDetailRequestComponent) detailMaintenance !: MaintenanceDetailRequestComponent;

  constructor(private maintenanceService: MaintenanceService, private apps: AppComponent){}

  async ngOnInit(){
    this.apps.loadingPage(true);
    this.errorMsg = '';
    this.col = [{name: 'receiptId', displayName: 'Receipt ID'}, {name: 'maintenanceCategory', displayName: 'Category'}, {name: 'requestDate', displayName: 'Request Date'}, {name: 'residentName', displayName:'Requested By'}, {name: 'assignedTo', displayName: 'Assign To'}, {name: 'status', displayName: 'Status'}, {name:"ActionCol", displayName:"Action", align:"center"}];
    if(this.keySearch=='' || this.keySearch==null || this.keySearch==undefined){
      await this.getMaintenanceAllRequest(this.apartmentId, this.size, this.page);
    }
    else{
      await this.searchMaintenanceAllRequest(this.apartmentId, this.size, this.page, this.keySearch);
    }
    this.apps.loadingPage(false);
  }

  getMaintenanceAllRequest(apartementId:any, size:any, page:any): Promise<any>{
    return new Promise<any>(resolve => 
      this.maintenanceService.getMaintenanceAllRequest(apartementId, size, page).subscribe({
        next: async (response: any) => {
          console.log('Response: ', response);
          if(response.data.length > 0){
            this.table = response.data;
            this.allDataCount = response.totalElements;
          }
          else{
            this.errorMsg = 'No Data Found!'
          }
          resolve(true);
        },
        error: (error: any) => {
          console.log('#error', error);
          resolve(error);
        }
      }))
  }

  searchMaintenanceAllRequest(apartementId:any, size:any, page:any, search:any): Promise<any>{
    return new Promise<any>(resolve => 
      this.maintenanceService.searchMaintenanceAllRequest(apartementId, size, page, search).subscribe({
        next: async (response: any) => {
          console.log('Response: ', response);
          if(response.data.length > 0){
            this.table = response.data;
            this.allDataCount = response.totalElements;
          }
          else{
            this.errorMsg = 'No Data Found!'
          }
          resolve(true);
        },
        error: (error: any) => {
          console.log('#error', error);
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
    let data = await this.setDataRequest(e);
    console.log('Data Request:', data);
  }

  setDataRequest(response: any): Promise<any>{
    return new Promise<any> (resolve => {
      this.dataRequest['id'] = response.id;
      this.dataRequest['receiptId'] = response.receiptId;
      this.dataRequest['residentId'] = response.resident;
      this.dataRequest['residentName'] = response.residentName;
      this.dataRequest['residentUnit'] = response.residentUnit;
      this.dataRequest['maintenanceId'] = response.maintenanceId;
      this.dataRequest['maintenanceCategory'] = response.maintenanceCategory;
      this.dataRequest['description'] = response.description;
      this.dataRequest['status'] = response.status;
      this.dataRequest['requestDate'] = response.requestDate;
      this.dataRequest['assignedTo'] = response.assignedTo;
      this.dataRequest['assignedDate'] = response.assignedDate;
      this.dataRequest['completedDate'] = response.completedDate;
      this.dataRequest['cancelledDate'] = response.cancelledDate;
      resolve(this.dataRequest);
    });
  }
  
  onLoadData(e:any){
    console.log("Onload Page Index: ", e);
    this.page = e;
    this.ngOnInit();
    // this.getMaintenanceAllRequest(1, 10, e, this.sortCol, this.sortDir);
  }

  // async onSortData(e:any){
  //   console.log("OnSort: ", e);
  //   let arr = await this.onSplitSortEvent(e);
  //   console.log(arr);
  //   // this.getMaintenanceAllRequest(1, 10, 0, this.sortCol, this.sortDir);
  // }

  // onSplitSortEvent(e:any): Promise<any>{
  //   return new Promise<any> (resolve => {
  //     let arr = e.split(";", 2); 
  //     this.sortCol = arr[0];
  //     this.sortDir = arr[1];
  //     resolve(arr);
  //   });
  // }

  redirect(){
    this.modalClose.nativeElement.click();
    this.ngOnInit();
  }

  onBackButton(){
    window.location.replace('/maintenance');
  }
}
