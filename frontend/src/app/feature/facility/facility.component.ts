import { Location } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { Column } from 'src/app/shared/component/table/table.component';
import { FacilityCategory, FacilityCategoryTime, FacilityRequest } from './facility.interface';
import { FacilityService } from './service/facility.service';
import { AppComponent } from 'src/app/app.component';

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
  sortCatCol?: string = 'id';
  sortCatDir?: string = 'ASC';
  colCategory: Column[] = [];
  dataCategory: FacilityCategory = {};
  
  listRequest!: any;
  errorListRequest: string = "";
  tableRequest: any;
  allDataRequest: any;
  errorMsgRequest: string = '';
  sortReqCol?: string = 'id';
  sortReqDir?: string = 'DESC';
  colRequest: Column[] = [];
  dataRequest: FacilityRequest = {};  

  @ViewChild('closeModal') modalClose: any;

  constructor(private location: Location, private facilityService: FacilityService, private apps: AppComponent){}
  
  ngOnInit(): void {
    this.apps.loadingPage(true);
    this.errorListCategory = '';
    this.errorListRequest = '';
    this.errorMsgCategory = '';
    this.errorMsgRequest = '';
    this.role = this.apps.getUserRole();
    if(this.role == 'management'){
      this.colRequest = [{name: 'facility_category', displayName: 'Category'}, {name: 'request_date', displayName: 'Request Date'}, {name: 'residentId', displayName:'Requested By'}, {name: 'assigned_to', displayName: 'Assign To'}, {name: 'status', displayName: 'Status'}, {name:"ActionCol", displayName:"Action", align:"center"}];
      this.colCategory = [{name: 'category', displayName: 'Category Name'}, {name: 'description', displayName: 'Description'}, {name: 'isActive', displayName: 'Status'}, {name:"ActionCol", displayName:"Action", align:"center"}];
      
      this.getFacilityCategory(this.apartmentId, this.sizeCategory, this.pageCategory, this.sortCatCol, this.sortCatDir);
      // this.getFacilityAllRequest(1, 10, 0, this.sortReqCol, this.sortReqCol);
    }
    else if (this.role == 'resident'){
      this.getFacilityActiveCategory(this.apartmentId);
      // this.getFacilityResidentRequest(4, 3, 0, this.sortReqCol, this.sortReqDir);
    }
    this.apps.loadingPage(false);
  }

  getFacilityCategory(apartementId:any, size:any, page:any, sortBy: any, sortDir:any): Promise<any>{
    return new Promise<any>(resolve => 
      this.facilityService.getFacilityCategory(apartementId, size, page, sortBy, sortDir).subscribe({
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

  getFacilityAllRequest(apartementId:any, size:any, page:any, sortBy: any, sortDir:any): Promise<any>{
    return new Promise<any>(resolve => 
      this.facilityService.getFacilityAllRequest(apartementId, size, page, sortBy, sortDir).subscribe({
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

  getFacilityResidentRequest(residentId:any, size:any, page:any, sortBy: any, sortReqDir:any): Promise<any>{
    return new Promise<any>(resolve => 
      this.facilityService.getFacilityResidentRequest(residentId, size, page, sortBy, sortReqDir).subscribe({
        next: async (response: any) => {
          console.log('Response: ', response);
          if(response.data.length > 0){
            this.tableRequest = response.data;
            this.allDataRequest = response.totalElements;
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
    console.log(e);
    if(type=='request'){
      let data = await this.setDataRequest(e);
      console.log('Data Request:', data);
    }
    else if(type=='category'){
      // let data = await this.setDetailCategory(e);
      console.log('Category:', e);
    }
  }

  setDetailCategory (response: any): Promise<any>{
    return new Promise<any> (resolve => {
      // this.dataCategory['ID'] = response.id;
      // this.dataCategory['Apartment ID'] = response.apartmentId;
      // this.dataCategory['Category Name'] = response.category;
      // this.dataCategory['Category Desc'] = response.description;
      // this.dataCategory['Category Image'] = response.image;
      // this.dataCategory['Status'] = response.isActive? 'Active': 'In-Active';
      // this.dataCategory['Created Date'] = response.createdDate;
      // this.dataCategory['Modified Date'] = response.modifiedDate;
      resolve(this.dataCategory);
    });
  }

  setDataRequest(response: any): Promise<any>{
    return new Promise<any> (resolve => {
      // this.dataRequest['ID'] = response.id;
      // this.dataRequest['Resident Name'] = response.resident;
      // this.dataRequest['Facility ID'] = response.Facility_id;
      // this.dataRequest['Facility Category'] = response.Facility_category;
      // this.dataRequest['Book Date'] = response.FacilityDetail;
      // this.dataRequest['Book Time'] = response.FacilityDetail;
      // this.dataRequest['Status'] = response.status;
      // this.dataRequest['Request Date'] = response.request_date;
      // this.dataRequest['Assigned Name'] = response.assigned_to;
      // this.dataRequest['Assigned Date'] = response.assigned_date;
      // this.dataRequest['Completed Date'] = response.completed_date;
      // this.dataRequest['Canceled Date'] = response.cancelled_date;
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
      this.getFacilityAllRequest(1, 10, e, this.sortReqCol, this.sortReqDir);
    }
    this.ngOnInit();
  }

  async onSortData(type:any, e:any){
    console.log("OnSort: ", e);
    let arr = await this.onSplitSortEvent(e);
    console.log(arr);
    if(type=='category'){
      this.pageCategory = 0;
      // this.getFacilityAllCategory(1, 10, 0, this.sortCatCol, this.sortCatDir);
    }
    else if(type=='request'){
      this.getFacilityAllRequest(1, 10, 0, this.sortReqCol, this.sortReqDir);
    }
    this.ngOnInit();
  }

  onSplitSortEvent(e:any): Promise<any>{
    return new Promise<any> (resolve => {
      let arr = e.split(";", 2); 
      this.sortReqCol = arr[0];
      this.sortReqDir = arr[1];
      resolve(arr);
    });
  }
  
  backButton(){
    this.location.back();
  }
  
  onCloseModal(){
    this.modalClose.nativeElement.click();
  }

  onHistoryClick(){
    window.location.replace('/facility/history');
  }

  onAllRequest(){
    window.location.replace('/facility/list');
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
