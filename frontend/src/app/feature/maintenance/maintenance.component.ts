import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { Column } from 'src/app/shared/component/table/table.component';
import { MaintenanceService } from './service/maintenance.service';
import { MaintenanceDetailRequestComponent } from './maintenance-detail-request/maintenance-detail-request.component';
import { MaintenanceCategory, MaintenanceRequest } from './maintenance.interface';
import { AppComponent } from 'src/app/app.component';
import Swal from 'sweetalert2';
import { AppService } from 'src/app/app.service';


@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.css']
})
export class MaintenanceComponent implements OnInit{
  user = this.appService.retrieveUser();

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

  constructor(private location: Location, private maintenanceService: MaintenanceService, private apps: AppComponent, private appService: AppService){}
  
  ngOnInit() {
    this.apps.loadingPage(true);
    this.errorListCategory = '';
    this.errorListRequest = '';
    this.errorMsgCategory = '';
    this.errorMsgRequest = '';
    if(this.user.role=='Management'){
      this.colRequest = [
        {name: 'receiptId', displayName: 'Receipt ID'}, 
        {name: 'maintenanceCategory', displayName: 'Category'}, 
        {name: 'requestDate', displayName: 'Request Date'}, 
        {name: 'residentName', displayName:'Requested By'}, 
        {name: 'status', displayName: 'Status'}, 
        {name:"ActionCol", displayName:"Action", align:"center"}];
      this.colCategory = [
        {name: 'category', displayName: 'Category Name'}, 
        {name: 'isActive', displayName: 'Status'}, 
        {name:"ActionCol", displayName:"Action", align:"center"}];
      
      this.getMaintenanceCategoryApartment(this.user.id, this.sizeCategory, this.pageCategory);
      this.getMaintenanceAllRequest(this.user.id, 5, 0);
    }
    else if (this.user.role=='Resident'){
      this.getMaintenanceCategoryResident(this.user.apartmentId);
      this.getMaintenanceResidentRequest(this.user.id, 3, 0, '');
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
      this.dataCategory['id'] = response.id;
      this.dataCategory['apartmentId'] = response.apartment_id;
      this.dataCategory['category'] = response.category;
      this.dataCategory['description'] = response.description;
      this.dataCategory['image'] = response.image;
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

  onLoadData(type:any, e:any){
    console.log("Onload Page Index: ", e);
    if(type=='category'){
      this.pageCategory = e;
    }
    else if(type=='request'){
      // this.getMaintenanceAllRequest(1, 10, e);
    }
    this.ngOnInit();
  }
  
  backButton(){
    this.location.back();
  }
  
  redirect(type: string){
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

  goToHistoryMaintenancePage(){
    window.location.replace('/maintenance/history');
  }

  goToAllMaintenancePage(){
    window.location.replace('/maintenance/all');
  }
}
