import { Component, ViewChild } from '@angular/core';
import { AdminService } from '../service/admin.service';
import { AppComponent } from 'src/app/app.component';
import { Column } from 'src/app/shared/component/table/table.component';
import { Location } from '@angular/common';
import { Apartment, Unit } from '../admin.interface';

@Component({
  selector: 'app-apartment-need-approval',
  templateUrl: './apartment-need-approval.component.html',
  styleUrls: ['./apartment-need-approval.component.css']
})
export class ApartmentNeedApprovalComponent {
  role: string = 'admin';
  apartmentId = 1;

  tableApartment: any;
  tableApartmentApproval: any;
  tableUnit: any;
  allDataApartment: any;
  allDataApartmentApproval: any;
  allDataUnit: any;
  errorMsgApartment?: string;
  errorMsgApartmentApproval?: string;
  errorMsgUnit?: string;
  keySearch: string = '';
  keySearchUnit: string = '';
  pageApartment = 0;
  pageApartmentApproval = 0;
  pageUnit = 0;
  sizeApartment = 10;
  sizeApartmentApproval = 5;
  sizeUnit = 10;
  colApartment: Column[] = [];
  colApartmentApproval: Column[] = [];
  colUnit: Column[] = [];
  dataApartment: Apartment = {};
  dataUnit: Unit = {};

  @ViewChild('closeModalApartment') modalCloseApartment: any;
  @ViewChild('closeModalUnit') modalCloseUnit: any;
  @ViewChild('closeModalUnitAdd') modalCloseAdd: any;

  constructor(private location: Location, private adminService: AdminService, private apps: AppComponent){}

  async ngOnInit() {
    this.apps.loadingPage(true);
    this.errorMsgApartment = '';
    this.errorMsgApartmentApproval = '';
    this.role = this.apps.getUserRole();
    this.colApartment = [{name: 'name', displayName: 'Apartment'}, {name: 'province', displayName: 'Province'}, {name: 'city', displayName: 'City'}, {name: 'isActive', displayName:'Status'}, {name:"ActionCol", displayName:"Action", align:"center"}];
    if(this.role=='admin'){
      this.colApartmentApproval = [{name: 'name', displayName: 'Apartment'}, {name: 'province', displayName: 'Province'}, {name: 'city', displayName: 'City'}, {name: 'isApproved', displayName:'Status'}, {name:"ActionCol", displayName:"Action", align:"center"}];
      if(this.keySearch=='' || this.keySearch==null || this.keySearch==undefined){
        await this.getApartmentList(this.sizeApartment, this.pageApartment);
      }
      else{
        await this.searchApartment(this.sizeApartment, this.pageApartment, this.keySearch);
      }
      await this.getApartmentListApproval(this.sizeApartmentApproval, this.pageApartmentApproval);
    }
    else if(this.role=='management'){
      this.colUnit = [{name: 'apartmentName', displayName: 'Apartment'}, {name: 'type', displayName: 'Type'}, {name: 'unitNumber', displayName: 'Unit Number'}, {name:"ActionCol", displayName:"Action", align:"center"}];
      if(this.keySearchUnit=='' || this.keySearchUnit==null || this.keySearchUnit==undefined){
        await this.getApartmentUnitList(this.apartmentId, this.sizeUnit, this.pageUnit);
      }
      else{
        await this.searchApartmentUnit(this.apartmentId, this.sizeApartment, this.pageApartment, this.keySearchUnit);
      }
    }
    else {
      window.location.replace('');
    }
    this.apps.loadingPage(false);
  }

  getApartmentList(size:number, page: number): Promise<any>{
    return new Promise<any>(resolve => 
      this.adminService.getApartmentList(size, page, true).subscribe({
        next: async (response: any) => {
          console.log('Response: ', response);
          if(response.data.length > 0){
            this.tableApartment = response.data;
            this.allDataApartment = response.totalElements;
          }
          else{
            this.tableApartment = null;
            this.errorMsgApartment = 'No Data Found!'
          }
          resolve(true);
        },
        error: (error: any) => {
          console.log('#error', error);
          this.errorMsgApartment = 'No Data Found!'
          this.tableApartment = null;
          resolve(error);
        }
      }))
  }

  getApartmentListApproval(size:number, page: number): Promise<any>{
    return new Promise<any>(resolve => 
      this.adminService.getApartmentList(size, page, false).subscribe({
        next: async (response: any) => {
          console.log('Response: ', response);
          if(response.data.length > 0){
            this.tableApartmentApproval = response.data;
            this.allDataApartmentApproval = response.totalElements;
          }
          else{
            this.tableApartmentApproval = null;
            this.errorMsgApartmentApproval = 'No Data Found!'
          }
          resolve(true);
        },
        error: (error: any) => {
          console.log('#error', error);
          this.errorMsgApartmentApproval = 'No Data Found!'
          this.tableApartmentApproval = null;
          resolve(error);
        }
      }))
  }

  searchApartment(size:number, page: number, search:any): Promise<any>{
    return new Promise<any>(resolve => 
      this.adminService.searchApartment(size, page, search).subscribe({
        next: async (response: any) => {
          console.log('Response: ', response);
          if(response.data.length > 0){
            this.tableApartment = response.data;
            this.allDataApartment = response.totalElements;
          }
          else{
            this.tableApartment = [];
            this.errorMsgApartment = 'No Data Found!'
          }
          resolve(true);
        },
        error: (error: any) => {
          console.log('#error', error);
          this.errorMsgApartment = 'No Data Found!'
          this.tableApartment = null;
          resolve(error);
        }
      }))
  }

  getApartmentUnitList(apartmentId:any, size:number, page: number): Promise<any>{
    return new Promise<any>(resolve => 
      this.adminService.getApartmentUnitList(apartmentId, size, page).subscribe({
        next: async (response: any) => {
          console.log('Response: ', response);
          if(response.data.length > 0){
            this.tableUnit = response.data;
            this.allDataUnit = response.totalElements;
          }
          else{
            this.tableUnit = null;
            this.errorMsgUnit = 'No Data Found!'
          }
          resolve(true);
        },
        error: (error: any) => {
          console.log('#error', error);
          this.errorMsgUnit = 'No Data Found!'
          this.tableUnit = null;
          resolve(error);
        }
      }))
  }

  searchApartmentUnit(apartmentId:any, size:number, page: number, search:any): Promise<any>{
    return new Promise<any>(resolve => 
      this.adminService.searchApartmentUnit(apartmentId, size, page, search).subscribe({
        next: async (response: any) => {
          console.log('Response: ', response);
          if(response.data.length > 0){
            this.tableUnit = response.data;
            this.allDataUnit = response.totalElements;
          }
          else{
            this.tableUnit = [];
            this.errorMsgUnit = 'No Data Found!'
          }
          resolve(true);
        },
        error: (error: any) => {
          console.log('#error', error);
          this.errorMsgUnit = 'No Data Found!'
          this.tableUnit = null;
          resolve(error);
        }
      }))
  }

  onAddUnit(){

  }

  async onListItemClick(type:any, e:any){
    console.log('OnList:', e);
    if(type=='apartment'){
      this.dataApartment = e;
    }
    else{
      this.dataUnit = e;
    }
  }
  
  onSearchData(type: any, key:any){
    console.log('Search:', key);
    if(type=='apartment'){
      this.keySearch = key;
      this.pageApartment = 0;
    }
    else{
      this.keySearchUnit = key;
      this.pageUnit = 0;
    }
    this.ngOnInit();
  }

  onLoadData(type:any, e:any){
    console.log("Onload Page Index: ", e);
    if(type=='approval'){
      this.pageApartmentApproval = e;
    }
    else if (type=='list'){
      this.pageApartment = e;
    }
    else if (type=='unit'){
      this.pageUnit = e;
    }
    this.ngOnInit();
  }
  
  redirect(type:any){
    if(type=='apartment'){
      this.modalCloseApartment.nativeElement.click();
    }
    else if (type=='unit'){
      this.modalCloseUnit.nativeElement.click();
    }
    else {
      this.modalCloseAdd.nativeElement.click();
    }
    this.ngOnInit();
  }

  backButton(){
    this.location.back();
  }
}
