import { Component, ViewChild } from '@angular/core';
import { Column } from 'src/app/shared/component/table/table.component';
import { AdminService } from '../service/admin.service';
import { AppComponent } from 'src/app/app.component';
import { Resident } from '../admin.interface';
import { Location } from '@angular/common';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-resident',
  templateUrl: './resident.component.html',
  styleUrls: ['./resident.component.css']
})
export class ResidentComponent {
  user = this.appService.retrieveUser();

  tableResident: any;
  tableResidentApproval: any;
  allDataResident: any;
  allDataResidentApproval: any;
  errorMsgResident?: string;
  errorMsgResidentApproval?: string;
  keySearch: string = '';
  pageResident = 0;
  pageResidentApproval = 0;
  sizeResident = 10;
  sizeResidentApproval = 5;
  colResident: Column[] = [];
  colResidentApproval: Column[] = [];
  dataResident: Resident = {};

  @ViewChild('closeModalDetail') modalCloseDetail: any;

  constructor(private location: Location, private adminService: AdminService, private apps: AppComponent, private appService: AppService){}

  async ngOnInit() {
    this.apps.loadingPage(true);
    this.errorMsgResident = '';
    this.errorMsgResidentApproval = '';
    if(this.user.role=='Management'){
      this.colResident = [
        {name: 'name', displayName: 'Resident'}, 
        {name: 'unitNumber', displayName: 'Unit Number'}, 
        {name: 'unitType', displayName: 'Unit Type'},
        {name: 'isActive', displayName:'Status'}, 
        {name:"ActionCol", displayName:"Action", align:"center"}];
      this.colResidentApproval = [{name: 'apartmentName', displayName: 'Apartment'}, {name: 'unitNumber', displayName: 'Unit Number'}, {name: 'unitType', displayName: 'Unit Type'}, {name: 'name', displayName: 'Resident'}, {name: 'isApproved', displayName:'Status'}, {name:"ActionCol", displayName:"Action", align:"center"}];
      if(this.keySearch=='' || this.keySearch==null || this.keySearch==undefined){
        await this.getResidentList(this.user.apartmentId, this.sizeResident, this.pageResident);
      }
      else{
        await this.searchResident(this.user.id, this.sizeResident, this.pageResident, this.keySearch);
      }
      await this.getResidentListApproval(this.user.id, this.sizeResidentApproval, this.pageResidentApproval);
    }
    else if(this.user.role=='Admin'){
      this.colResident = [
        {name: 'name', displayName: 'Name'}, 
        {name: 'apartmentName', displayName: 'Apartment'}, 
        {name: 'isActive', displayName:'Status'}, 
        {name:"ActionCol", displayName:"Action", align:"center"}];
      if(this.keySearch=='' || this.keySearch==null || this.keySearch==undefined){
        await this.getAllResidentList(this.sizeResident, this.pageResident);
      }
      else{
        await this.searchAllResident(this.sizeResident, this.pageResident, this.keySearch);
      }
    }
    else {
      window.location.replace('');
    }
    this.apps.loadingPage(false);
  }

  getAllResidentList(size:number, page: number): Promise<any>{
    return new Promise<any>(resolve => 
      this.adminService.getResidentList(null, size, page, null).subscribe({
        next: async (response: any) => {
          console.log('Response: ', response);
          if(response.data.length > 0){
            this.tableResident = response.data;
            this.allDataResident = response.totalElements;
          }
          else{
            this.errorMsgResident = 'No Data Found!'
          }
          resolve(true);
        },
        error: (error: any) => {
          console.log('#error', error);
          this.errorMsgResident = 'No Data Found!'
          this.tableResident = null;
          resolve(error);
        }
      }))
  }

  searchAllResident(size:number, page: number, search: any): Promise<any>{
    return new Promise<any>(resolve => 
      this.adminService.searchResident(null, size, page, search).subscribe({
        next: async (response: any) => {
          console.log('Response: ', response);
          if(response.data.length > 0){
            this.tableResident = response.data;
            this.allDataResident = response.totalElements;
          }
          else{
            this.errorMsgResident = 'No Data Found!'
          }
          resolve(true);
        },
        error: (error: any) => {
          console.log('#error', error);
          this.errorMsgResident = 'No Data Found!'
          this.tableResident = null;
          resolve(error);
        }
      }))
  }

  getResidentList(apartmentId: any, size:number, page: number): Promise<any>{
    return new Promise<any>(resolve => 
      this.adminService.getResidentList(apartmentId, size, page, true).subscribe({
        next: async (response: any) => {
          console.log('Response: ', response);
          if(response.data.length > 0){
            this.tableResident = response.data;
            this.allDataResident = response.totalElements;
          }
          else{
            this.errorMsgResident = 'No Data Found!'
          }
          resolve(true);
        },
        error: (error: any) => {
          console.log('#error', error);
          this.errorMsgResident = 'No Data Found!'
          this.tableResident = null;
          resolve(error);
        }
      }))
  }

  getResidentListApproval(apartmentId: any, size:number, page: number): Promise<any>{
    return new Promise<any>(resolve => 
      this.adminService.getResidentList(apartmentId, size, page, false).subscribe({
        next: async (response: any) => {
          console.log('Response: ', response);
          if(response.data.length > 0){
            this.tableResidentApproval = response.data;
            this.allDataResidentApproval = response.totalElements;
          }
          else{
            this.errorMsgResidentApproval = 'No Data Found!'
          }
          resolve(true);
        },
        error: (error: any) => {
          console.log('#error', error);
          this.errorMsgResidentApproval = 'No Data Found!'
          this.tableResidentApproval = null;
          resolve(error);
        }
      }))
  }

  searchResident(apartmentId: any, size:number, page: number, search:any): Promise<any>{
    return new Promise<any>(resolve => 
      this.adminService.searchResident(apartmentId, size, page, search).subscribe({
        next: async (response: any) => {
          console.log('Response: ', response);
          if(response.data.length > 0){
            this.tableResident = response.data;
            this.allDataResident = response.totalElements;
          }
          else{
            this.errorMsgResident = 'No Data Found!'
          }
          resolve(true);
        },
        error: (error: any) => {
          console.log('#error', error);
          this.errorMsgResident = 'No Data Found!'
          this.tableResident = null;
          resolve(error);
        }
      }))
  }

  async onListItemClick(e:any){
    console.log('OnList:', e);
    this.dataResident = e;
  }

  // setDataRequest(response: any): Promise<any>{
  //   return new Promise<any> (resolve => {
  //     this.dataRequest['id'] = response.id;
  //     this.dataRequest['receiptId'] = response.receiptId;
  //     this.dataRequest['residentId'] = response.residentId;
  //     this.dataRequest['residentName'] = response.residentName;
  //     this.dataRequest['residentUnit'] = response.residentUnit;
  //     this.dataRequest['mailboxId'] = response.mailboxId;
  //     this.dataRequest['mailboxCategory'] = response.mailboxCategory;
  //     this.dataRequest['description'] = response.description;
  //     this.dataRequest['status'] = response.status;
  //     this.dataRequest['receivedDate'] = response.receivedDate;
  //     this.dataRequest['completedDate'] = response.completedDate;
  //     resolve(this.dataRequest);
  //   });
  // }

  onSearchData(key:any){
    this.keySearch = key;
    this.pageResident = 0;
    this.ngOnInit();
  }

  onLoadData(type:any, e:any){
    console.log("Onload Page Index: ", e);
    if(type=='approval'){
      this.pageResidentApproval = e;
    }
    else {
      this.pageResident = e;
    }
    this.ngOnInit();
  }
  
  redirect(){
    this.modalCloseDetail.nativeElement.click();
    this.ngOnInit();
  }

  backButton(){
    this.location.back();
  }
}
