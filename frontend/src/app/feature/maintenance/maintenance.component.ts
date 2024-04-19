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
  apartmentId = 1;
  residentId = 4;
  role: string = 'resident';

  listCategory!: any;
  errorListCategory: string = '';
  tableCategory: any;
  allDataCategory: any;
  errorMsgCategory: string = '';
  pageCategory: number = 0;
  sizeCategory: number = 5;
  colCategory: Column[] = [];
  dataCategory: MaintenanceCategory = {};
  
  listRequest!: any;
  errorListRequest: string = "";
  tableRequest: any;
  allDataRequest: any;
  errorMsgRequest: string = '';
  colRequest: Column[] = [];
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
      this.colRequest = [{name: 'maintenanceCategory', displayName: 'Category'}, {name: 'requestDate', displayName: 'Request Date'}, {name: 'residentName', displayName:'Requested By'}, {name: 'assignedTo', displayName: 'Assign To'}, {name: 'status', displayName: 'Status'}, {name:"ActionCol", displayName:"Action", align:"center"}];
      this.colCategory = [{name: 'category', displayName: 'Category Name'}, {name: 'description', displayName: 'Description'}, {name: 'isActive', displayName: 'Status'}, {name:"ActionCol", displayName:"Action", align:"center"}];
      
      this.getMaintenanceCategoryApartment(this.apartmentId, this.sizeCategory, this.pageCategory);
      this.getMaintenanceAllRequest(this.apartmentId, 5, 0);
    }
    else if (this.role=='resident'){
      this.getMaintenanceCategoryResident(this.apartmentId);
      this.getMaintenanceResidentRequest(this.residentId, 3, 0, '');
    }
    this.apps.loadingPage(false);
  }

  getMaintenanceCategoryApartment(apartementId:any, size:any, page:any): Promise<any>{
    return new Promise<any>(resolve => 
      this.maintenanceService.getMaintenanceCategoryApartment(apartementId, size, page).subscribe({
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

  getMaintenanceCategoryResident(apartementId:any): Promise<any>{
    return new Promise<any>(resolve => 
      this.maintenanceService.getMaintenanceCategoryResident(apartementId, true).subscribe({
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

  getMaintenanceAllRequest(apartementId:any, size:any, page:any): Promise<any>{
    return new Promise<any>(resolve => 
      this.maintenanceService.getMaintenanceAllRequest(apartementId, size, page).subscribe({
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

  getMaintenanceResidentRequest(residentId:any, size:any, page:any, status: any): Promise<any>{
    return new Promise<any>(resolve => 
      this.maintenanceService.getMaintenanceResidentRequest(residentId, size, page, status).subscribe({
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
      this.dataCategory['Status'] = response.isActive;
      resolve(this.dataCategory);
    });
  }

  setDataRequest(response: any): Promise<any>{
    return new Promise<any> (resolve => {
      this.dataRequest['ID'] = response.id;
      this.dataRequest['Resident Name'] = response.resident;
      this.dataRequest['Maintenance ID'] = response.maintenanceId;
      this.dataRequest['Maintenance Category'] = response.maintenanceCategory;
      this.dataRequest['Maintenance Detail'] = response.maintenanceDetail;
      this.dataRequest['Status'] = response.status;
      this.dataRequest['Request Date'] = response.requestDate;
      this.dataRequest['Assigned Name'] = response.assignedTo;
      this.dataRequest['Assigned Date'] = response.assignedDate;
      this.dataRequest['Completed Date'] = response.completedDate;
      this.dataRequest['Cancelled Date'] = response.cancelledDate;
      resolve(this.dataRequest);
    });
  }

  onLoadData(type:any, e:any){
    console.log("Onload Page Index: ", e);
    if(type=='category'){
      this.pageCategory = e;
      // this.getMaintenanceCategoryApartment(this.apartmentId, this.sizeCategory, this.pageCategory, this.sortCatCol, this.sortCatDir);
    }
    else if(type=='request'){
      // this.getMaintenanceAllRequest(1, 10, e);
    }
    this.ngOnInit();
  }

  // async onSortData(type:any, e:any){
  //   console.log("OnSort: ", e);
  //   let arr = await this.onSplitSortEvent(type, e);
  //   console.log(arr);
  //   if(type=='category'){
  //     this.pageCategory = 0;
  //     // this.getMaintenanceCategoryApartment(this.apartmentId, this.sizeCategory, this.pageCategory, this.sortCatCol, this.sortCatDir);
  //   }
  //   else if(type=='request'){
  //     // this.getMaintenanceAllRequest(1, 10, 0);
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
    window.location.replace('/maintenance/all');
  }
}
