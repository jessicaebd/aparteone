import { Component, ViewChild } from '@angular/core';
import { AdminService } from '../service/admin.service';
import { AppComponent } from 'src/app/app.component';
import { Column } from 'src/app/shared/component/table/table.component';
import { Location } from '@angular/common';
import { Apartment, Unit } from '../admin.interface';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-apartment',
  templateUrl: './apartment.component.html',
  styleUrls: ['./apartment.component.css']
})
export class ApartmentComponent {
  user = this.appService.retrieveUser();

  tableApartment: any;
  tableUnit: any;
  allDataApartment: any;
  allDataUnit: any;
  errorMsgApartment?: string;
  errorMsgUnit?: string;
  keySearch: string = '';
  keySearchUnit: string = '';
  pageApartment = 0;
  pageUnit = 0;
  sizeApartment = 10;
  sizeUnit = 10;
  colApartment: Column[] = [];
  colUnit: Column[] = [];
  dataApartment: Apartment = {};
  dataUnit: Unit = {};

  @ViewChild('closeModalApartment') modalCloseApartment: any;
  @ViewChild('closeModalUnit') modalCloseUnit: any;
  @ViewChild('closeModalUnitAdd') modalCloseAdd: any;

  constructor(private location: Location, private adminService: AdminService, private apps: AppComponent, private appService: AppService){}

  async ngOnInit() {
    this.apps.loadingPage(true);
    this.errorMsgApartment = '';
    this.tableApartment = null;
    this.tableUnit = null;
    this.colApartment = [
      {name: 'name', displayName: 'Name'}, 
      {name: 'province', displayName: 'Province'}, 
      {name: 'city', displayName: 'City'}, 
      {name: 'isActive', displayName:'Status'}, 
      {name:"ActionCol", displayName:"Action", align:"center"}];
    if(this.user.role=='Admin'){
      if(this.keySearch=='' || this.keySearch==null || this.keySearch==undefined){
        await this.getApartmentList(this.sizeApartment, this.pageApartment);
      }
      else{
        await this.searchApartment(this.sizeApartment, this.pageApartment, this.keySearch);
      }
    }
    else if(this.user.role=='Management'){
      this.colUnit = [{name: 'apartmentName', displayName: 'Apartment'}, {name: 'type', displayName: 'Type'}, {name: 'unitNumber', displayName: 'Unit Number'}, {name:"ActionCol", displayName:"Action", align:"center"}];
      if(this.keySearchUnit=='' || this.keySearchUnit==null || this.keySearchUnit==undefined){
        await this.getApartmentUnitList(this.user.id, this.sizeUnit, this.pageUnit);
      }
      else{
        await this.searchApartmentUnit(this.user.id, this.sizeApartment, this.pageApartment, this.keySearchUnit);
      }
    }
    else {
      window.location.replace('');
    }
    this.apps.loadingPage(false);
  }

  getApartmentList(size:number, page: number): Promise<any>{
    return new Promise<any>(resolve => 
      this.adminService.getApartmentList(size, page, 'Approved').subscribe({
        next: async (response: any) => {
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

  searchApartment(size:number, page: number, search:any): Promise<any>{
    return new Promise<any>(resolve => 
      this.adminService.searchApartment(size, page, search).subscribe({
        next: async (response: any) => {
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

  async onListItemClick(type:any, e:any){
    if(type=='apartment'){
      this.dataApartment = e;
    }
    else{
      this.dataUnit = e;
    }
  }
  
  onSearchData(type: any, key:any){
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
    if (type=='list'){
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
