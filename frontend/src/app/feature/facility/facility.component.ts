import { Location } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { Column } from 'src/app/shared/component/table/table.component';
import { FacilityCategory, FacilityCategoryTime, FacilityRequest } from './facility.interface';
import { FacilityService } from './service/facility.service';
import { AppComponent } from 'src/app/app.component';
import { FacilityUpdateCategoryComponent } from './facility-update-category/facility-update-category.component';

@Component({
  selector: 'app-facility',
  templateUrl: './facility.component.html',
  styleUrls: ['./facility.component.css']
})
export class FacilityComponent {
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
  dataCategory: FacilityCategory = {};
  
  listRequest!: any;
  errorListRequest: string = "";
  tableRequest: any;
  allDataRequest: any;
  errorMsgRequest: string = '';
  pageRequest: number = 0;
  sizeRequest: number = 5;
  colRequest: Column[] = [];
  dataRequest: FacilityRequest = {};  

  @ViewChild('closeModalAdd') modalCloseAdd: any;
  @ViewChild('closeModalUpdate') modalCloseUpdate: any;
  @ViewChild('closeModalRequest') modalCloseRequest: any;
  @ViewChild(FacilityUpdateCategoryComponent) facilityUpdateCategory!: FacilityUpdateCategoryComponent;

  constructor(private location: Location, private facilityService: FacilityService, private apps: AppComponent){}
  
  ngOnInit(): void {
    this.apps.loadingPage(true);
    this.errorListCategory = '';
    this.errorListRequest = '';
    this.errorMsgCategory = '';
    this.errorMsgRequest = '';
    this.role = this.apps.getUserRole();
    if(this.role == 'management'){
      this.colRequest = [{name: 'receiptId', displayName: 'Receipt ID'}, {name: 'facilityCategory', displayName: 'Category'}, {name: 'residentUnit', displayName:'Unit'}, {name: 'residentName', displayName:'Resident'}, {name: 'reserveDate', displayName: 'Book Date'}, {name: 'startTime', displayName: 'Start Time'}, {name: 'endTime', displayName: 'End Time'}, {name: 'facilityRequeststatus', displayName: 'Status'}, {name:"ActionCol", displayName:"Action", align:"center"}];
      this.colCategory = [{name: 'category', displayName: 'Category Name'}, {name: 'description', displayName: 'Description'}, {name: 'isActive', displayName: 'Status'}, {name:"ActionCol", displayName:"Action", align:"center"}];
      
      this.getFacilityCategory(this.apartmentId, this.sizeCategory, this.pageCategory);
      this.getFacilityApartmentRequest(this.apartmentId, 5, 0);
    }
    else if (this.role == 'resident'){
      this.getFacilityActiveCategory(this.apartmentId);
      this.getFacilityResidentRequest(this.residentId, 3, 0, '');
    }
    this.apps.loadingPage(false);
  }

  getFacilityCategory(apartementId:any, size:any, page:any): Promise<any>{
    return new Promise<any>(resolve => 
      this.facilityService.getFacilityCategory(apartementId, size, page).subscribe({
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

  getFacilityActiveCategory(apartementId:any): Promise<any>{
    return new Promise<any>(resolve => 
      this.facilityService.getFacilityActiveCategory(apartementId, true).subscribe({
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
          this.errorMsgCategory = 'No Data Found!'
          this.errorListCategory = 'No Data Found!'
          resolve(error);
        }
      }))
  }

  getFacilityApartmentRequest(apartementId:any, size:any, page:any): Promise<any>{
    return new Promise<any>(resolve => 
      this.facilityService.getFacilityApartmentRequest(apartementId, size, page).subscribe({
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

  getFacilityResidentRequest(residentId:any, size:any, page:any, status: any): Promise<any>{
    return new Promise<any>(resolve => 
      this.facilityService.getFacilityResidentRequest(residentId, size, page, status).subscribe({
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
    if(type=='request'){
      let data = await this.setDataRequest(e);
      console.log('Data Request:', data);
    }
    else if(type=='category'){
      let data = await this.setDetailCategory(e);
      await this.facilityUpdateCategory.getFacilityTime(e.id);
      console.log('Category:', data);
    }
  }

  setDetailCategory (response: any): Promise<any>{
    return new Promise<any> (resolve => {
      this.dataCategory['id'] = response.id;
      this.dataCategory['apartmentId'] = response.apartmentId;
      this.dataCategory['category'] = response.category;
      this.dataCategory['description'] = response.description;
      this.dataCategory['image'] = response.image;
      this.dataCategory['isActive'] = response.isActive;
      this.dataCategory['createdDate'] = response.createdDate;
      this.dataCategory['modifiedDate'] = response.modifiedDate;
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
      this.dataRequest['facilityId'] = response.facilityId;
      this.dataRequest['facilityCategory'] = response.facilityCategory;
      this.dataRequest['facilityTimeId'] = response.facilityTimeId;
      this.dataRequest['reserveDate'] = response.reserveDate;
      this.dataRequest['startTime'] = response.startTime;
      this.dataRequest['endTime'] = response.endTime;
      this.dataRequest['facilityRequeststatus'] = response.facilityRequeststatus;
      this.dataRequest['createdDate'] = response.createdDate;
      this.dataRequest['completedDate'] = response.completedDate;
      this.dataRequest['cancelledDate'] = response.cancelledDate;
      resolve(this.dataRequest);
    });
  }

  onLoadData(type:any, e:any){
    console.log("Onload Page Index: ", e);
    if(type=='category'){
      this.pageCategory = e;
      // this.getFacilityCategory(this.apartmentId, this.sizeCategory, this.pageCategory, this.sortCatCol, this.sortCatDir);
    }
    else if(type=='request'){
      // this.pageRequest = e;
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
    else if(type=='request'){
      this.modalCloseRequest.nativeElement.click();
    }
    this.ngOnInit();
  }

  goToHistoryFacilityPage(){
    window.location.replace('/facility/history');
  }

  goToAllFacilityPage(){
    window.location.replace('/facility/all');
  }

  
  // setFacilityCategory(response:any): Promise<any>{
  //   return new Promise<any> (resolve => {
  //     let arrObj: FacilityCategory[] = [];
  //     for(let x of response){
  //       let time = x.facility_times;
  //       let arrTimes: FacilityCategoryTime[] = [];
  //       for(let y of time){
  //         let objTime: FacilityCategoryTime = {
  //           'ID': y.id,
  //           'Start Time': y.startTime,
  //           'End Time': y.endTime,
  //           'Is Active': y.isActive
  //         }
  //         arrTimes.push(objTime);
  //       }

  //       let obj: FacilityCategory = {
  //         'ID': x.facility.id,
  //         'Apartment ID': x.facility.apartmentId,
  //         'Category Name' : x.facility.category,
  //         'Category Desc' : x.facility.description,
  //         'Category Image' : x.facility.image,
  //         'Created Date': x.facility.createdDate,
  //         'Modified Date': x.facility.modifiedDate,
  //         'Category Time' : arrTimes,
  //         'Status' : x.facility.isActive
  //       }
  //       arrObj.push(obj);
  //     }
  //     resolve(arrObj);
  //   });
  // }
}
