import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { Column } from 'src/app/shared/component/table/table.component';
import { MaintenanceService } from './service/maintenance.service';
import { MaintenanceDetailRequestComponent } from './maintenance-detail-request/maintenance-detail-request.component';
import { MaintenanceCategory, MaintenanceRequest } from './maintenance.interface';
import { AppComponent } from 'src/app/app.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.css']
})
export class MaintenanceComponent implements OnInit{
  role: string = 'resident';
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
  sortReqCol?: string = 'id';
  sortReqDir?: string = 'DESC';
  sortCatCol?: string = 'id';
  sortCatDir?: string = 'ASC';
  colCategory: Column[] = [];
  colRequest: Column[] = [];
  dataCategory: MaintenanceCategory = {};
  dataRequest: MaintenanceRequest = {};
  
  @ViewChild('closeModalAdd') modalCloseAdd: any;
  @ViewChild('closeModalUpdate') modalCloseUpdate: any;
  @ViewChild('closeModalAssign') modalCloseAssign: any;

  constructor(private location: Location, private maintenanceService: MaintenanceService, private apps: AppComponent){}
  
  ngOnInit() {
    this.apps.loadingPage(true);
    this.errorListCategory = '';
    this.errorListRequest = '';
    this.errorMsgCategory = '';
    this.errorMsgRequest = '';
    this.role = this.apps.getUserRole();
    if(this.role=='management'){
      this.colRequest = [{name: 'maintenance_category', displayName: 'Category'}, {name: 'request_date', displayName: 'Request Date'}, {name: 'residentId', displayName:'Requested By'}, {name: 'assigned_to', displayName: 'Assign To'}, {name: 'status', displayName: 'Status'}, {name:"ActionCol", displayName:"Action", align:"center"}];
      this.colCategory = [{name: 'category', displayName: 'Category Name'}, {name: 'description', displayName: 'Description'}, {name: 'is_active', displayName: 'Status'}, {name:"ActionCol", displayName:"Action", align:"center"}];
      
      this.getMaintenanceAllCategory(1, 10, 0, this.sortCatCol, this.sortCatDir);
      this.getMaintenanceAllRequest(1, 10, 0, this.sortReqCol, this.sortReqCol);
    }
    else if (this.role=='resident'){
      this.getMaintenanceResidentCategory(1, 1000, 0, this.sortCatCol, this.sortCatDir);
      this.getMaintenanceResidentRequest(4, 3, 0, this.sortReqCol, this.sortReqDir, '');
    }
    this.apps.loadingPage(false);
  }

  getMaintenanceAllCategory(apartementId:any, size:any, page:any, sortBy: any, sortDir:any): Promise<any>{
    return new Promise<any>(resolve => 
      this.maintenanceService.getMaintenanceAllCategory(apartementId, size, page, sortBy, sortDir, null).subscribe({
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

  getMaintenanceResidentCategory(apartementId:any, size:any, page:any, sortBy: any, sortDir:any): Promise<any>{
    return new Promise<any>(resolve => 
      this.maintenanceService.getMaintenanceAllCategory(apartementId, size, page, sortBy, sortDir, 'Active').subscribe({
        next: async (response: any) => {
          console.log('Response: ', response);
          if(response.data.length > 0){
            this.listCategory = response.data;
          }
          else{
            this.errorListCategory = 'No Data Found!'
          }
          resolve(true);
        },
        error: (error: any) => {
          console.log('#error', error);
          this.errorListCategory = 'No Data Found!'
          resolve(error);
        }
      }))
  }

  getMaintenanceAllRequest(apartementId:any, size:any, page:any, sortBy: any, sortDir:any): Promise<any>{
    return new Promise<any>(resolve => 
      this.maintenanceService.getMaintenanceAllRequest(apartementId, size, page, sortBy, sortDir).subscribe({
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
          resolve(error);
        }
      }))
  }

  getMaintenanceResidentRequest(residentId:any, size:any, page:any, sortBy: any, sortReqDir:any, status: any): Promise<any>{
    return new Promise<any>(resolve => 
      this.maintenanceService.getMaintenanceResidentRequest(residentId, size, page, sortBy, sortReqDir, status).subscribe({
        next: async (response: any) => {
          console.log('Response: ', response);
          if(response.data.length > 0){
            this.listRequest = response.data;
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
      this.dataCategory['Apartment ID'] = response.apartment_id;
      this.dataCategory['Category Name'] = response.category;
      this.dataCategory['Category Desc'] = response.description;
      this.dataCategory['Category Image'] = response.image;
      this.dataCategory['Status'] = response.is_active==true? 'Active': 'In-Active';
      resolve(this.dataCategory);
    });
  }

  setDataRequest(response: any): Promise<any>{
    return new Promise<any> (resolve => {
      this.dataRequest['ID'] = response.id;
      this.dataRequest['Resident Name'] = response.resident;
      this.dataRequest['Maintenance ID'] = response.maintenance_id;
      this.dataRequest['Maintenance Category'] = response.maintenance_category;
      this.dataRequest['Maintenance Detail'] = response.maintenanceDetail;
      this.dataRequest['Status'] = response.status;
      this.dataRequest['Request Date'] = response.request_date;
      this.dataRequest['Assigned Name'] = response.assigned_to;
      this.dataRequest['Assigned Date'] = response.assigned_date;
      this.dataRequest['Completed Date'] = response.completed_date;
      this.dataRequest['Canceled Date'] = response.cancelled_date;
      resolve(this.dataRequest);
    });
  }

  onLoadData(type:any, e:any){
    console.log("Onload Page Index: ", e);
    if(type=='category'){
      this.getMaintenanceAllCategory(1, 10, e, this.sortCatCol, this.sortCatDir);
    }
    else if(type=='request'){
      this.getMaintenanceAllRequest(1, 10, e, this.sortReqCol, this.sortReqDir);
    }
  }

  async onSortData(type:any, e:any){
    console.log("OnSort: ", e);
    let arr = await this.onSplitSortEvent(type, e);
    console.log(arr);
    if(type=='category'){
      this.getMaintenanceAllCategory(1, 10, 0, this.sortCatCol, this.sortCatDir);
    }
    else if(type=='request'){
      this.getMaintenanceAllRequest(1, 10, 0, this.sortReqCol, this.sortReqDir);
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
    window.location.replace('/maintenance/history');
  }

  onAllRequest(){
    window.location.replace('/maintenance/list');
  }
}
